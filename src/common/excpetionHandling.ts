import { NextFunction, Request, Response } from "express";
import HttpError from "standard-http-error";

export function errorHandler(error: HttpError, __req: Request, __res: Response, next: NextFunction) {
  __res.status(error.code).send({
    error: error.name,
    message: error.message,
  });
  next();
}
