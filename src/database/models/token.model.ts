import { DataTypes, Model } from "sequelize";
import { tokenSchema } from "../../validators/token.validators";
import { sequelize } from "../connnection";
import z from "zod";

// const { sequelize } = require("../src/database/index");
export type TokenAttributes = z.infer<typeof tokenSchema>;

class TokenModel extends Model<TokenAttributes> implements TokenAttributes {
  declare id: string;
  declare token_name: string;
  declare token_symbol: string;
  declare project_id: string;
  declare amount_available: number;
  declare total: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TokenModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    token_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TokenModel",
    tableName: "tokens",
  }
);

export default TokenModel;
