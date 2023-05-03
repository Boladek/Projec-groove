import { Request, Response, NextFunction } from "express";
import ProjectModel, {
  ProjectAttributes,
} from "../database/models/project.model";
import UserTokenModel, {
  UserTokenAttributes,
} from "../database/models/user-token.model";
import TokenModel, { TokenAttributes } from "../database/models/token.model";
import { projectSchema } from "../validators/project.validators";
import { tokenSchema } from "../validators/token.validators";
import { generateTokenSymbol } from "../utils/generateTokenSymbol";

export default class ProjectController {
  createNewProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = projectSchema.parse(req.body);
      const project = await ProjectModel.create(result);
      await TokenModel.create({
        project_id: project.id,
        token_name: result.token_name || project.project_name,
        token_symbol:
          result.token_symbol || generateTokenSymbol(project.project_name),
        total: result.tokens,
        amount_available: result.tokens,
      });
      return res
        .status(201)
        .json({ data: project, message: "Project created successfully." });
    } catch (error) {
      next(error);
    }
  };

  fetchProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await ProjectModel.findOne({
        where: { id: req.params.id },
      });
      if (!project) {
        return res.status(400).json({ message: "Project not found." });
      }
      return res
        .status(200)
        .json({ data: project, message: "Fetched successfully." });
    } catch (error) {
      next(error);
    }
  };

  fetchAllProjects = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projects = await ProjectModel.findAll();
      return res
        .status(200)
        .json({ data: projects, message: "Fetched successfully." });
    } catch (error) {
      next(error);
    }
  };
}
