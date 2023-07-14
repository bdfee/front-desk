import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../utils/connectToDb";

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare taskId: CreationOptional<number>;
  declare dueDate: string;
  declare description: string;
  declare userId: ForeignKey<number>;
  declare patientId: ForeignKey<number> | null;
  declare specialistId?: ForeignKey<number> | null;
}

Task.init(
  {
    taskId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    specialistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: "tasks",
    modelName: "task",
  }
);

export default Task;
