import { DataTypes, Model } from "sequelize";
import { userTokenSchema } from "../../validators/user-token.validators";
import { sequelize } from "../connnection";
import z from "zod";

// const { sequelize } = require("../src/database/index");
export type UserTokenAttributes = z.infer<typeof userTokenSchema>;

class UserTokenModel extends Model<UserTokenAttributes> implements UserTokenAttributes {
  declare id: string;
  declare token_id: string;
  declare user_id: string;
  declare amount: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserTokenModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // worth: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserTokenModel",
    tableName: "usertokens",
  }
);

export default UserTokenModel;
