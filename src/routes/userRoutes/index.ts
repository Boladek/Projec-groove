import { Router } from "express";
import UserController from "../../controllers/users.controller";
import paths from "./paths";
import { authMiddleware } from "../../middlewares/auth.middleware";

export default (router: Router) => {
  const userController = new UserController();

  router.post(paths.CREATE_USER, userController.createUser);
  router.post(paths.LOGIN_USER, userController.login);
  router.get(paths.FETCH_USER, authMiddleware, userController.fetchUser);
  router.get(paths.FETCH_USERS, authMiddleware, userController.fetchAllUsers);
};
