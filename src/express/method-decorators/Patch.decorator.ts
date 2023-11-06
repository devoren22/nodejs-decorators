import { createMethodDecorator } from "./create-method-decorator";

export function Patch(path: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    createMethodDecorator(target, key, descriptor, { method: "patch", path });
  };
}
