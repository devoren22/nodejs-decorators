import { Constructor } from "../../common/types/constructor.type";
import { META_ROUTER_MIDDLEWARE } from "../../common/reflector-meta-keys/express.symbols";
import { Type, IMiddleware } from "../../common/types/middleware.type";

export function RouterMiddlewares(...middlewares: Type<IMiddleware>[]) {
  return function (target: Constructor) {
    Reflect.defineMetadata(META_ROUTER_MIDDLEWARE, middlewares, target);
  };
}
