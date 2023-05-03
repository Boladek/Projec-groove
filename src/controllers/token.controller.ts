import { Request, Response, NextFunction } from "express";
import ProjectModel, {
  ProjectAttributes,
} from "../database/models/project.model";
import TokenModel, {
    TokenAttributes,
  } from "../database/models/token.model";
import { tokenSchema } from "../validators/token.validators";

export default class TokenController {
  createNewProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = tokenSchema.parse(req.body);
      const project = await TokenModel.create(result);
      return res
        .status(201)
        .json({ data: project, message: "Token created successfully." });
    } catch (error) {
      next(error);
    }
  };
}
