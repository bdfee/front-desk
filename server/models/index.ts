import Patient from "./patient";
import Calendar from "./calendar";
import Appointment from "./appointment";
import Specialist from "./specialist";
import AppointmentType from "./appointmentType";

Patient.sync().catch((error) => console.log("error syncing Patient: " + error));
Specialist.sync().catch((error) => console.log("error syncing Specialist: " + error));
Calendar.sync().catch((error) => console.log("error syncing Calendar: " + error));
Appointment.sync().catch((error) => console.log("error syncing Appointment: " + error));
AppointmentType.sync().catch((error) => console.log("error syncing AppointmentType: " + error));

export { Patient, Calendar, Appointment, Specialist, AppointmentType };
