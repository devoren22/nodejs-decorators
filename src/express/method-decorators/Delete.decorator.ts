import { createMethodDecorator } from "./create-method-decorator";

export function Delete(path: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    createMethodDecorator(target, key, descriptor, { method: "delete", path });
  };
}
