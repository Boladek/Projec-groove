import { Request, Response, NextFunction } from "express";
import ProjectModel, {
  ProjectAttributes,
} from "../database/models/project.model";
import TransactionModel, {
  TransactionAttributes,
} from "../database/models/transaction.model";
import { tokenSchema } from "../validators/token.validators";
import {
  trasactionSchema,
  buyProjectTokenSchema,
} from "../validators/transaction.validators";
import { BUY_TYPES } from "../utils/constants";
import TokenModel, { TokenAttributes } from "../database/models/token.model";
import UserTokenModel, {
  UserTokenAttributes,
} from "../database/models/user-token.model";
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
        })
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        const token = await UserTokenModel.findOne({
            where: { user_id: user.id, token_id: result.token_id },
        })
        if (!token) {
            return res.status(400).json({ message: `No token found for this user.` });
        }
        if (token.amount < result.amount) {
            return res.status(400).json({ message: `Not enough tokens available to buy.` });
        }
        await UserTokenModel.update({
            amount: token.amount - result.amount,
        }, {
            where: { user_id: user.id, token_id: result.token_id },
        })
        const checkIfBuyerHasToken = await UserTokenModel.findOne({
            where: { user_id: result.user_id, token_id: result.token_id },
        })
        if (!checkIfBuyerHasToken) {
            await UserTokenModel.update({
                amount: token.amount + result.amount,
            }, {
                where: { user_id: result.user_id, token_id: result.token_id },
            })
        } else {
            await UserTokenModel.create({
                user_id: result.user_id,
                token_id: result.token_id,
                amount: result.amount,
            });;
        }
      }
      await TransactionModel.create(result);
      return res.status(200).json({
        message: "Transaction created successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}
