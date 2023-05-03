const paths = {
  BUY_TOKENS: "/transactions/buy-token",
  SELL_TOKENS: "/transactions/sell-token",
  FETCH_TRANSACTIONS: "/transactions/get-all-transactions",
  FETCH_TOKEN_TRANSACTIONS: "/transactions/get-token-transactions/:token_id",
  FETCH_USER_TRANSACTIONS: "/transactions/get-transactions/:user_id",
  FETCH_USER_TRANSACTIONS_FOR_TOKEN: "/transactions/get-transactions-per-token/:user_id/:token_id"
};

export default paths;
