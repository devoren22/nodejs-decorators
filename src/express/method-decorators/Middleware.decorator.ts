import { META_MIDDLEWARE } from "../../common/reflector-meta-keys/express.symbols";
import { IMiddleware, Type } from "../../common/types/middleware.type";

export function Middlewares(...middlewares: Type<IMiddleware>[]) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(META_MIDDLEWARE, middlewares, target);
  };
}
