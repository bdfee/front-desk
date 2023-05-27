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
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 10],
          msg: "phone number must be 10 characters long",
        },
      },
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true,
      },
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "nonbinary", "other"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
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
    tableName: "patients",
    modelName: "patient",
  }
);

export default Patient;
