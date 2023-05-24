import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../utils/connectToDb";

class Specialist extends Model<InferAttributes<Specialist>, InferCreationAttributes<Specialist>> {
  declare specialistId: CreationOptional<number>;
  declare name: string;
  declare speciality: string;
}

Specialist.init(
  {
    specialistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    speciality: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: "specialists",
    modelName: "specialist",
  }
);

export default Specialist;
