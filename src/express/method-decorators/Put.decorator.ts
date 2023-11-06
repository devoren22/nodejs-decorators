import { createMethodDecorator } from "./create-method-decorator";

export function Put(path: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    createMethodDecorator(target, key, descriptor, { method: "put", path });
  };
}
