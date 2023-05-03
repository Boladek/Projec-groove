import { Router } from "express";
import ProjectController from "../../controllers/projects.controllers";
// import {  } from "../../middlewares/auth.middleware";
import paths from "./paths";
import { authMiddleware } from "../../middlewares/auth.middleware";

export default (router: Router) => {
  const projectController = new ProjectController();

  router.post(
    paths.CREATE_PROJECT,
    authMiddleware,
    projectController.createNewProject
  );
  router.get(paths.FETCH_ALL_PROJECT, authMiddleware, projectController.fetchAllProjects);
  router.get(
    paths.FETCH_PROJECT,
    authMiddleware,
    projectController.fetchProject
  );
};
