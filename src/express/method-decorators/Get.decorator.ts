import { createMethodDecorator } from "./create-method-decorator";

export const Get = (path: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    createMethodDecorator(target, key, descriptor, { method: "get", path });
  };
};
