import { DataTypes, Model } from "sequelize";
import { userSchema } from "../../validators/user.validators";
import { sequelize } from "../connnection";
import z from "zod";

// const { sequelize } = require("../src/database/index");
export type UserAttributes = z.infer<typeof userSchema>;

class UserModel extends Model<UserAttributes> implements UserAttributes {
  declare id: string;
  declare username: string;
  declare password: string;
  declare role: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
  }
);

export default UserModel;
