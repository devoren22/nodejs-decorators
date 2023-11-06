import { createParamDecorator } from "./create-param.decorator";

export function Req(param?: string) {
  return function (target: any, propertyKey: string, paramIndex: number) {
    createParamDecorator(target, propertyKey, paramIndex, { paramType: "req", val: param });
  };
}
