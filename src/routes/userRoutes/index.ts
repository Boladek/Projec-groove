import { Router } from "express";
import UserController from "../../controllers/users.controller";
// import  } from "../../middlewares/auth.middleware";
import paths from "./paths";

export default (router: Router) => {
  const userController = new UserController();

  router.post(paths.CREATE_USER, userController.createUser);
  router.post(paths.LOGIN_USER, userController.login);
  router.get(paths.FETCH_USER, userController.fetchUser);
  router.get(paths.FETCH_USERS, userController.fetchAllUsers);
//   router.put(paths.UPDATE_USER, userController.updateUser);
};
