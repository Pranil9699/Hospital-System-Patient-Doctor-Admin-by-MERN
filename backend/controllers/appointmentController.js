import Appointment from "../models/appointmentModel.js";

// Book Appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;
    const newAppt = new Appointment({ userId, doctorId, date, time });
    await newAppt.save();
    res.json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment" });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};
