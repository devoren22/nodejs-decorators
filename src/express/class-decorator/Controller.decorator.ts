import cors from "cors";
import express, { Router } from "express";
import Container from "typedi";
import { errorHandler } from "../../common/excpetionHandling";
import { META_MIDDLEWARE, META_ROUTE, META_ROUTER_MIDDLEWARE } from "../../common/reflector-meta-keys/express.symbols";
import { Server } from "../../common/server";
import { Constructor } from "../../common/types/constructor.type";
import { MethodHandler } from "../../common/types/methodHandler.type";
import { IMiddleware, Type } from "../../common/types/middleware.type";

export function Controller(str?: string) {
  return function (target: Constructor) {
    // Define express router
    const router = configureRouter();
    Server.app.use(str ?? "", router);

    // Add the listening methods to the router
    const methodsMap: Map<string, MethodHandler> = Reflect.getOwnMetadata(META_ROUTE, target.prototype);
    const middlewares: Type<IMiddleware>[] = Reflect.getOwnMetadata(META_MIDDLEWARE, target.prototype);
    const routerMiddlewares: Type<IMiddleware>[] = Reflect.getOwnMetadata(META_ROUTER_MIDDLEWARE, target);

    if (routerMiddlewares && routerMiddlewares.length) router.use(...useMiddlewares(routerMiddlewares));

    // Check if no route registered to the controller
    if (!methodsMap) {
      console.log("Please register to the controller, and then reload the app ", target);
      return;
    }
    for (const methodInfo of methodsMap.values()) registerHandlers(target, router, methodInfo, middlewares);

    router.use(errorHandler);
  };
}

function configureRouter() {
  const router = express.Router({});
  router.use(cors());
  router.use(express.json());

  return router;
}

function registerHandlers(target: any, router: Router, methodInfo: MethodHandler, middlewares: Type<IMiddleware>[]) {
  const { method, path, handler } = methodInfo;
  if (middlewares && middlewares.length) {
    const middlewaresUse = useMiddlewares(middlewares);
    router[method](path, ...middlewaresUse, errorHandler, handler.bind(Container.get(target) || target));
  } else {
    router[method](path, errorHandler, handler.bind(Container.get(target) || target));
  }
}

function useMiddlewares(middlewaresType: Type<IMiddleware>[]) {
  return middlewaresType.map((mid) => Container.get(mid).use.bind(Container.get(mid)));
}
