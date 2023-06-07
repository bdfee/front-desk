import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../utils/connectToDb";
import bcrypt from "bcrypt";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare password: string;
  declare username: string;
  declare name: string;

  public static async hashPassword(user: User): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }

  public static async comparePassword(user: User): Promise<void> {
    if (user.password && user.changed("password")) {
      const storedUser = await User.findByPk(user.id);

      if (storedUser) {
        const passwordMatch = await bcrypt.compare(user.password, storedUser.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }
      }
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      field: "user_password",
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user: User) => User.hashPassword(user),
      beforeValidate: (user: User) => User.comparePassword(user),
    },
    sequelize,
    underscored: true,
    timestamps: false,
    tableName: "users",
    modelName: "user",
  }
);

export default User;
