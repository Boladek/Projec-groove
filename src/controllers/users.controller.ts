import { Request, Response, NextFunction } from "express";
import UserModel, { UserAttributes } from "../database/models/user.model";
import {
  userSchema,
  loginSchema,
  userIdSchema,
} from "../validators/user.validators";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = userSchema.parse(req.body);
      const checkIfUserExists = await UserModel.findOne({
        where: { username: result.username },
      });
      if (checkIfUserExists) {
        return res.status(400).json({ message: "User already exists." });
      }
      const hash = await bcrypt.hash(result.password, 8);
      const user = await UserModel.create({ ...req.body, password: hash });
      return res
        .status(200)
        .json({ user, message: "User created successfully." });
    } catch (error) {
      next(error);
    }
  };

  fetchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = userIdSchema.parse(req.params);
      const user = await UserModel.findOne({ where: { id: result.id } });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res
        .status(200)
        .json({ data: user, message: "Fetched successfully." });
    } catch (error) {
      next(error);
    }
  };

  //   updateUser = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const result = updateUserSchema.parse(req.params);
  //       const user = await UserModel.findOne({ where: { id: result.id } });
  //       if (!user) {
  //         return res.status(404).json({ message: "User not found." });
  //       }
  //       await UserModel.update(result, {
  //         where: { id: result.id },
  //       });
  //       return res.status(200).json({ message: "User updated successfully." });
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserModel.findAll();
      return res
        .status(200)
        .json({ data: users, message: "Users created successfully." });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const result = loginSchema.parse(body);
      const user = await UserModel.findOne({
        where: { username: result.username },
      });
      //   const response = await login(result);
      const token = jwt.sign(
        { email: result.username },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .json({ message: "Login successful.", data: { user, token } });
      //   let role = "staff";
      //   if (response?.data?.staff?.groups.includes("Admin Group"))
      //     role = "admin";
      //   if (response?.data?.staff?.groups.includes("CSP Security"))
      //     role = "security";
      //   return res.status(200).json({
      //     message: response.data.message,
      //     token: token,
      //     user: {...response.data.staff, role},
      //   });
    } catch (error) {
      next(error);
    }
  };
}
