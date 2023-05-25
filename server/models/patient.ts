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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "nonbinary", "other"),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
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
