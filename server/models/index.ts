import Patient from "./patient";
import Appointment from "./appointment";
import Specialist from "./specialist";

const isDev = process.env.NODE_ENV === "dev";

Appointment.belongsTo(Patient, {
  foreignKey: "patientId",
});
Appointment.belongsTo(Specialist, {
  foreignKey: "specialistId",
});
Patient.belongsTo(Specialist, {
  foreignKey: "specialistId",
});

Patient.sync({ alter: isDev }).catch((error) => console.log("error syncing Patient: " + error));
Specialist.sync({ alter: isDev }).catch((error) => console.log("error syncing Specialist: " + error));
Appointment.sync({ alter: isDev }).catch((error) => console.log("error syncing Appointment: " + error));

export { Patient, Appointment, Specialist };
