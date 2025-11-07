import React, { createContext, useState, useEffect } from "react";
import { getDoctors } from "../api"; // ✅ Import API function

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]); // ✅ Dynamic state
  const [loading, setLoading] = useState(true);

  const currencySymbol = "₹";

  // ✅ Fetch doctors from backend when app loads
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors(); // calls GET /api/doctors
        if (response.success && response.data) {
          setDoctors(response.data);
        } else if (Array.isArray(response)) {
          // In case backend just returns an array directly
          setDoctors(response);
        //   console.log(doctors);
        } else {
          console.error("Unexpected response:", response);
        }
        console.log(response)
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const value = {
    doctors,
    setDoctors,
    loading,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
