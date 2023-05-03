import { Request, Response, NextFunction } from "express";
import ProjectModel, {
  ProjectAttributes,
} from "../database/models/project.model";
import UserTokenModel, {
    UserTokenAttributes,
  } from "../database/models/user-token.model";
import { userTokenSchema } from "../validators/user-token.validators";

export default class UserTokenController {
  createNewProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = userTokenSchema.parse(req.body);
      const project = await UserTokenModel.create(result);
      return res
        .status(201)
        .json({ data: project, message: "Token created successfully." });
    } catch (error) {
      next(error);
    }
  };
}
