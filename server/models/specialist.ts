import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/connectToDb";

interface SpecialistAttributes {
  specialistId: number;
  specialistName: string;
  specialty: string;
}

class Specialist extends Model<SpecialistAttributes> {}

Specialist.init(
  {
    specialistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    specialistName: {
      type: DataTypes.STRING,
    },
    specialty: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "specialist",
  }
);

export default Specialist;
