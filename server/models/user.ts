import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../utils/connectToDb";
import bcrypt from "bcrypt";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: CreationOptional<number>;
  declare password: string;
  declare username: string;
  declare name: string;

  public static async hashPassword(user: User): Promise<void> {
    if (user.password.length < 9 || user.password.length > 20 || typeof user.password !== "string") {
      throw new Error("Validation error: password must be 9 to 20 characters long");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        name: "unique",
        msg: "Validation error: username must be unique",
      },
      allowNull: false,
      validate: {
        len: {
          args: [5, 30],
          msg: "username must be between 5 and 30 characters",
        },
        noSpaces(username: string) {
          if (/\s/.test(username)) {
            throw new Error("Validation error: username cannot contain spaces");
          }
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: "name must be between 3 and 30 characters",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user: User) => User.hashPassword(user),
    },
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: "users",
    modelName: "user",
  }
);

export default User;
