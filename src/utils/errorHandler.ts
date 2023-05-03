import jwt from "jsonwebtoken";
import z from "zod";
import { API_RESPONSE_STATUS, API_RESPONSE_MESSAGE } from "./constants";
import ApplicationResponseException from "./applicationResponseError";

const { JsonWebTokenError, TokenExpiredError } = jwt;

export default function (error: any, responseWriter: any) {
  if (error instanceof ApplicationResponseException) {
    if (error.actualError) console.error(error.actualError);
    return responseWriter
      .status(error.statusCode ? error.statusCode : 500)
      .json({
        message: error.message ? error.message : "",
        status: API_RESPONSE_STATUS.ERROR,
        code: error.errorCode ? error.errorCode : undefined,
      });
  }

  if (error instanceof TokenExpiredError) {
    return responseWriter.status(401).json({
      message: "Token expired",
      status: API_RESPONSE_STATUS.ERROR,
      code: "TOKEN_EXPIRED",
    });
  }

  if (error instanceof JsonWebTokenError) {
    if (
      error.message === "invalid token" ||
      error.message === "invalid signature"
    )
      return responseWriter.status(401).json({
        message: "unauthenticated",
        status: API_RESPONSE_STATUS.ERROR,
        code: "INVALID_TOKEN",
      });
  }

  if (error?.name === "ValidationError") {
    let err;
    for (let field in error?.errors) {
      err = error?.errors[field]?.message;
      break;
    }
    return responseWriter.status(400).json({
      message: err,
      status: API_RESPONSE_STATUS.ERROR,
      code: "VALIDATION_ERROR",
    });
  }

  if (error?.name === "MongoError" || error?.name === "MongoServerError") {
    if (error?.code === 11000) {
      return responseWriter.status(409).json({
        message: API_RESPONSE_MESSAGE.RESOURCE_EXISTS,
        status: API_RESPONSE_STATUS.ERROR,
        code: "RESOURCE_ALREADY_EXISTS",
      });
    }
  }
  if (error?.response?.data) {
    // console.error(error.response.data);
    return responseWriter.status(error.response.status).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: error.response.data.message,
      code: 404,
    });
  }
  if (error instanceof z.ZodError) {
    // let err;
    // for (let field in error?.errors) {
    //   err = error?.errors[field]?.message;
    //   break;
    // }
    return responseWriter.status(422).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: error?.errors,
      code: "VALIDATION_ERROR",
    });
  }
  if (error.name === "SequelizeUniqueConstraintError") {
    // console.log({error: error.errors})
    return responseWriter.status(409).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: "User already exists",
      code: "RESOURCE_ALREADY_EXISTS",
    });
  }
  console.error(error);
  return responseWriter.status(500).json({
    status: API_RESPONSE_STATUS.ERROR,
    message: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
  });
}
