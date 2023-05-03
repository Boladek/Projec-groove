import { Router } from "express";
import ProjectController from "../../controllers/projects.controllers";
// import {  } from "../../middlewares/auth.middleware";
import paths from "./paths";

export default (router: Router) => {
  const projectController = new ProjectController();

  router.post(paths.CREATE_PROJECT, projectController.createNewProject);
  router.get(paths.FETCH_ALL_PROJECT, projectController.fetchAllProjects);
  router.get(paths.FETCH_PROJECT, projectController.fetchProject);
};
