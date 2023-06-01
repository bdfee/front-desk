import Patient from "./patient";
import Appointment from "./appointment";
import Specialist from "./specialist";

const isDev = process.env.NODE_ENV === "dev";

Patient.belongsTo(Specialist, {
  foreignKey: {
    name: "specialistId",
    allowNull: false,
  },
});

Appointment.belongsTo(Patient, {
  foreignKey: {
    name: "patientId",
    allowNull: false,
  },
});
Appointment.belongsTo(Specialist, {
  foreignKey: {
    name: "specialistId",
    allowNull: false,
  },
});

Patient.sync({ alter: isDev }).catch((error) => console.log("error syncing Patient: " + error));
Specialist.sync({ alter: isDev }).catch((error) => console.log("error syncing Specialist: " + error));
Appointment.sync({ alter: isDev }).catch((error) => console.log("error syncing Appointment: " + error));

export { Patient, Appointment, Specialist };
