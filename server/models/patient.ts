import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from "sequelize";
import { sequelize } from "../utils/connectToDb";

class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
  declare patientId: CreationOptional<number>;
  declare specialistId: ForeignKey<number>;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare dateOfBirth: string;
  declare gender: string;
  declare address: string;
}

Patient.init(
  {
    patientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "nonbinary", "other"),
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: "patients",
    modelName: "patient",
  }
);

export default Patient;
