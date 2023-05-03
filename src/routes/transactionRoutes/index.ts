import { Router } from "express";
import TransactionController from "../../controllers/transactions.controllers";
import paths from "./paths";
import { authMiddleware } from "../../middlewares/auth.middleware";

export default (router: Router) => {
  const transactionController = new TransactionController();

  router.post(
    paths.BUY_TOKENS,
    authMiddleware,
    transactionController.buyProjectTokens
  );
  router.post(
    paths.SELL_TOKENS,
    authMiddleware,
    transactionController.sellProjectTokens
  );
  router.get(
    paths.FETCH_TRANSACTIONS,
    transactionController.getAllTransactions
  );
  router.get(
    paths.FETCH_TOKEN_TRANSACTIONS,
    transactionController.getAllTransactionRelatedToAToken
  );
  router.get(
    paths.FETCH_USER_TRANSACTIONS,
    authMiddleware,
    transactionController.getAllTransactionsForAUser
  );
  router.get(
    paths.FETCH_USER_TRANSACTIONS_FOR_TOKEN,
    authMiddleware,
    transactionController.getAllTransactionsForAUserPerToken
  );
};
