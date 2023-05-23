import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/connectToDb";

interface AppointmentAttributes {
  appointmentId: number;
  patientId: number;
  specialistId: number;
  appointmentDate: Date;
  appointmentDuration: string;
  appointmentType: string;
  description: string;
}

class Appointment extends Model<AppointmentAttributes> {}

Appointment.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
    },
    specialistId: {
      type: DataTypes.INTEGER,
    },
    appointmentDate: {
      type: DataTypes.DATE,
    },
    appointmentDuration: {
      type: DataTypes.STRING,
    },
    appointmentType: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "appointment",
  }
);

export default Appointment;
