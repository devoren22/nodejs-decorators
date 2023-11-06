import { META_SERVER_PROPERTY } from "../../common/reflector-meta-keys/socket.symbols";
export const WebSocketServer = (): PropertyDecorator => {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.set(target, propertyKey, null);
    Reflect.defineMetadata(META_SERVER_PROPERTY, { propertyKey }, target);
  };
};
