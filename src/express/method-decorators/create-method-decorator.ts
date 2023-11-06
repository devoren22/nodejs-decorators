import { NextFunction, Request, Response } from "express";
import { isNumber } from "lodash";
import HttpError from "standard-http-error";
import { META_ROUTE } from "../../common/reflector-meta-keys/express.symbols";
import { MethodHandler } from "../../common/types/methodHandler.type";
import { requestExtractor } from "../../common/utils/request-extractor";
import { PropertyMetaData } from "../../common/types/paramMetadata.type";

export const createMethodDecorator = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
  methodArgs: Pick<MethodHandler, "method" | "path">
) => {
  // The first 3 keys are not important for us.
  const metaDataKeys = Reflect.getOwnMetadataKeys(target, key).flatMap((key: string) => {
    if (!key.includes("design")) {
      return key;
    }
    return [];
  });

  const httpPropertiesMetaData = metaDataKeys.flatMap(
    (metaKey) => Reflect.getOwnMetadata(metaKey, target, key) as PropertyMetaData[]
  );

  const internalFn: Function = descriptor.value;

  const handler = async function (req: Request, res: Response, next: NextFunction) {
    const reqRouteArguments = requestExtractor(req, httpPropertiesMetaData);

    try {
      // Call the internal function with the controller class as (this)
      let result = await internalFn.call(this, ...reqRouteArguments);
      if (isNumber(result)) result = result.toString();

      res.send(result);
    } catch (ex) {
      next(new HttpError(HttpError.INTERNAL_SERVER_ERROR));
    }
  };

  // add methods routes to controller metadata
  const metaDataForClassDecorator = Reflect.getOwnMetadata(META_ROUTE, target) || new Map<string, MethodHandler>();
  metaDataForClassDecorator.set(key, { method: methodArgs.method, path: methodArgs.path, handler });

  Reflect.defineMetadata(META_ROUTE, metaDataForClassDecorator, target);
};
