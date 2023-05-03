import { Request, Response, NextFunction } from "express";
import TransactionModel from "../database/models/transaction.model";
import {
  buyProjectTokenSchema,
  sellProjectTokenSchema,
} from "../validators/transaction.validators";
import { BUY_TYPES } from "../utils/constants";
import TokenModel from "../database/models/token.model";
import UserTokenModel from "../database/models/user-token.model";
import UserModel from "../database/models/user.model";

export default class Transactions {
  buyProjectTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = buyProjectTokenSchema.parse(req.body);
      if (result.type === BUY_TYPES["BUY_FROM_PROJECT"]) {
        const token = await TokenModel.findOne({
          where: { id: result.token_id },
        });
        if (!token) {
          return res.status(400).json({ message: "Token not found." });
        }
        if (token.amount_available < result.amount) {
          return res
            .status(400)
            .json({ message: "Not enough tokens available." });
        }
        await TokenModel.update(
          {
            amount_available: token.amount_available - result.amount,
          },
          {
            where: { id: result.token_id },
          }
        );
        const checkUserToken = await UserTokenModel.findOne({
          where: { user_id: result.user_id, token_id: result.token_id },
        });
        if (checkUserToken) {
          await UserTokenModel.update(
            {
              amount: checkUserToken.amount + result.amount,
            },
            {
              where: { user_id: result.user_id, token_id: result.token_id },
            }
          );
        } else {
          await UserTokenModel.create({
            user_id: result.user_id,
            token_id: result.token_id,
            amount: result.amount,
          });
        }
      }
      if (result.type === BUY_TYPES["BUY_FROM_USER"]) {
        const user = await UserModel.findOne({
          where: { username: result.username },
        });
        if (!user) {
          return res.status(400).json({ message: "User not found." });
        }
        const checkIfSellerHastoken = await UserTokenModel.findOne({
          where: { user_id: user.id, token_id: result.token_id },
        });
        if (!checkIfSellerHastoken) {
          return res
            .status(400)
            .json({ message: `No token found for this user.` });
        }
        if (checkIfSellerHastoken.amount < result.amount) {
          return res
            .status(400)
            .json({ message: `Not enough tokens available to buy.` });
        }
        await UserTokenModel.update(
          {
            amount: checkIfSellerHastoken.amount - result.amount,
          },
          {
            where: { user_id: user.id, token_id: result.token_id },
          }
        );
        const checkIfBuyerHasToken = await UserTokenModel.findOne({
          where: { user_id: result.user_id, token_id: result.token_id },
        });
        if (checkIfBuyerHasToken) {
          await UserTokenModel.update(
            {
              amount: checkIfSellerHastoken.amount + result.amount,
            },
            {
              where: { user_id: result.user_id, token_id: result.token_id },
            }
          );
        } else {
          await UserTokenModel.create({
            user_id: result.user_id,
            token_id: result.token_id,
            amount: result.amount,
          });
        }
      }
      await TransactionModel.create({ ...result, type: "buy" });
      return res.status(200).json({
        message: "Transaction created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  sellProjectTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = sellProjectTokenSchema.parse(req.body);
      const token = await TokenModel.findOne({
        where: { id: result.token_id },
      });
      if (!token) {
        return res.status(400).json({ message: "Token not found." });
      }
      const user = await UserModel.findOne({
        where: { username: result.username },
      });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
      const checkIfSellerHasToken = await UserTokenModel.findOne({
        where: { user_id: result.user_id, token_id: result.token_id },
      });
      if (!checkIfSellerHasToken) {
        return res.status(400).json({ message: "User has no tokens." });
      }
      if (checkIfSellerHasToken.amount < result.amount) {
        return res.status(400).json({ message: "Not enough tokens to sell." });
      }
      const checkIfBuyerHasToken = await UserTokenModel.findOne({
        where: { user_id: user.id, token_id: result.token_id },
      });
      if (!checkIfBuyerHasToken) {
        await UserTokenModel.create({
          user_id: user.id,
          token_id: result.token_id,
          amount: result.amount,
        });
      } else {
        await UserTokenModel.update(
          {
            amount: checkIfBuyerHasToken.amount + result.amount,
          },
          {
            where: { user_id: user.id, token_id: result.token_id },
          }
        );
      }
      await UserTokenModel.update(
        {
          amount: checkIfSellerHasToken.amount - result.amount,
        },
        {
          where: { user_id: result.user_id, token_id: result.token_id },
        }
      );
      await TransactionModel.create({ ...result, type: "sell" });
      return res.status(200).json({
        message: "Transaction created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactions = await TransactionModel.findAll({
        limit: Number(req.params.limit) || 20,
      });
      return res.status(200).json({
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTransactionRelatedToAToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactions = await TransactionModel.findAll({
        where: { token_id: req.params.token_id },
      });
      return res.status(200).json({
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTransactionsForAUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactions = await TransactionModel.findAll({
        where: { user_id: req.params.user_id },
      });
      return res.status(200).json({
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTransactionsForAUserPerToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactions = await TransactionModel.findAll({
        where: { user_id: req.params.user_id, token_id: req.params.token_id},
      });
      return res.status(200).json({
        data: transactions,
      });
    } catch (error) {
      next(error);
    }
  };
}
