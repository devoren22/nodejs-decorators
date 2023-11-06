import { createParamDecorator } from "./create-param.decorator";

export function Param(param?: string) {
  return function (target: any, propertyKey: string, paramIndex: number) {
    createParamDecorator(target, propertyKey, paramIndex, { paramType: "params", val: param });
  };
}
