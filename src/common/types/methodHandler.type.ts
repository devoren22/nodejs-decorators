import { Request, Response, NextFunction } from "express";

export type HttpMethod = "get" | "put" | "delete" | "post" | "patch";

export type MethodHandler = {
  method: HttpMethod;
  path: string;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>;
};

export type SocketHandler = {
  event: string;
  handler: (packet: any) => Promise<any>;
};
