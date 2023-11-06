import { createParamDecorator } from "./create-param.decorator";

export function Body(param?: string) {
  return function (target: any, propertyKey: string, paramIdx: number) {
    createParamDecorator(target, propertyKey, paramIdx, { paramType: "body", val: param });
  };
}
