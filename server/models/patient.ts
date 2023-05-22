import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/connectToDb";
import { PatientAttributes } from "../types";

class Patient extends Model<PatientAttributes> {}

Patient.init(
  {
    patientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    specialistId: {
      type: DataTypes.INTEGER,
    },
    patientName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "patient",
  }
);

export default Patient;
