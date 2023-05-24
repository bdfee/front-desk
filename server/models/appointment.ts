import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { sequelize } from "../utils/connectToDb";

class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
  declare appointmentId: CreationOptional<number>;
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
    },
    start: {
      type: DataTypes.STRING,
    },
    end: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("intake", "physicalTherapy", "nutrition"),
    },
    description: {
      type: DataTypes.TEXT,
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
