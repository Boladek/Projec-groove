// const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the JWT token from the Authorization header
    const authorization = req.headers.authorization?.split(" ")[1];
    if (authorization) {
      const secretKey = process.env.JWT_SECRET_KEY as string;
      
      // Verify the JWT token using the secret key
      const decoded = jwt.verify(authorization, secretKey);

      // Add the decoded token to the request object
      req.user = decoded;

      // Call the next middleware or route handler
      next();
    } else {
      return res.status(403).send({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    // If the token is invalid or has expired, return a 401 Unauthorized status code
    next(error);
  }
}
