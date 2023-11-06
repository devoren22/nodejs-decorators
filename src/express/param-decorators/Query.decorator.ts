import { createParamDecorator } from "./create-param.decorator";

export function Query(param?: string) {
  return function (target: any, propertyKey: string, paramIndex: number) {
    createParamDecorator(target, propertyKey, paramIndex, { paramType: "query", val: param });
  };
}
