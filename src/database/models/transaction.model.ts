import { DataTypes, Model } from "sequelize";
import { trasactionSchema } from "../../validators/transaction.validators";
import { sequelize } from "../connnection";
import z from "zod";

// const { sequelize } = require("../src/database/index");
export type TransactionAttributes = z.infer<typeof trasactionSchema>;

class TransactionModel
  extends Model<TransactionAttributes>
  implements TransactionAttributes
{
  declare id: string;
  declare type: string;
  declare amount: number;
  declare user_id: string;
  declare token_id: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TransactionModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TransactionModel",
    tableName: "transactions",
  }
);

export default TransactionModel;
