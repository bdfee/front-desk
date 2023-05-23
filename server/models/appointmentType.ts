import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/connectToDb";

interface AppointmentAttributes {
  appointmentId: number;
  appointmentType: string;
}

class AppointmentType extends Model<AppointmentAttributes> {}

AppointmentType.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointmentType: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "appointmentType",
  }
);

export default AppointmentType;
