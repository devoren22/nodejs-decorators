import { createMethodDecorator } from "./create-method-decorator";

export function Post(path: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    createMethodDecorator(target, key, descriptor, { method: "post", path });
  };
}
