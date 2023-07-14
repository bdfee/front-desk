import Patient from "./patient";
import Appointment from "./appointment";
import Specialist from "./specialist";
import User from "./user";
import Task from "./task";

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

Task.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

Task.belongsTo(Patient, {
  foreignKey: {
    name: "patientId",
    allowNull: true,
  },
});

Task.belongsTo(Specialist, {
  foreignKey: {
    name: "specialistId",
    allowNull: true,
  },
});

Task.belongsTo(Appointment, {
  foreignKey: {
    name: "appointmentId",
    allowNull: true,
  },
});

User.sync({ alter: isDev }).catch((error) => console.log("error syncing Users: " + error));
Patient.sync({ alter: isDev }).catch((error) => console.log("error syncing Patient: " + error));
Specialist.sync({ alter: isDev }).catch((error) => console.log("error syncing Specialist: " + error));
Appointment.sync({ alter: isDev }).catch((error) => console.log("error syncing Appointment: " + error));
Task.sync({ alter: isDev }).catch((error) => console.log("error syncing Tasks: " + error));

export { Patient, Appointment, Specialist, User, Task };
