import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/connectToDb";

interface CalendarAttributes {
  calendarId: number;
  appointmentId: number;
}

class Calendar extends Model<CalendarAttributes> {}

Calendar.init(
  {
    calendarId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointmentId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "calendar",
    tableName: "calendar",
  }
);

export default Calendar;
