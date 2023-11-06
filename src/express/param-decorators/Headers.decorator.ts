import { createParamDecorator } from "./create-param.decorator";

export function Headers(param?: string) {
  return function (target: any, propertyKey: string, paramIndex: number) {
    createParamDecorator(target, propertyKey, paramIndex, { paramType: "headers", val: param });
  };
}
