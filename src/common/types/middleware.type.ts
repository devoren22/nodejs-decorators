import { NextFunction, Request, Response } from "express";

export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export interface IMiddleware {
  use: (req: Request, res: Response, next: NextFunction) => void;
}
