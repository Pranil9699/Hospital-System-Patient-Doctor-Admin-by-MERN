import Appointment from "../models/appointmentModel.js";

// Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const {
      userId,
      userName,
      email,
      doctorId,
      doctorName,
      speciality,
      date,
      time,
    } = req.body;

    // validation
    if (!userId || !doctorId || !date || !time) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const newAppt = new Appointment({
      userId,
      userName,
      email,
      doctorId,
      doctorName,
      speciality,
      date,
      time,
    });

    await newAppt.save();
    res.json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppt,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res
      .status(500)
      .json({ success: false, message: "Error booking appointment" });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching appointments" });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error cancelling appointment" });
  }
};