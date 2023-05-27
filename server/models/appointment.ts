import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey } from "sequelize";
import { sequelize } from "../utils/connectToDb";

class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
  declare appointmentId: CreationOptional<number>;
  declare patientId: ForeignKey<number>;
  declare specialistId: ForeignKey<number>;
  declare date: string;
  declare start: string;
  declare end: string;
  declare type: string;
  declare description: string;
}

Appointment.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
    start: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
      },
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
      },
    },
    type: {
      type: DataTypes.ENUM("intake", "physicalTherapy", "nutrition"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: "appointments",
    modelName: "appointment",
  }
);

export default Appointment;
