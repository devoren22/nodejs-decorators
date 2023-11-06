import { Server, ServerOptions, Socket } from "socket.io";
import { META_EVENT, META_SERVER_PROPERTY } from "../../common/reflector-meta-keys/socket.symbols";
import { Constructor } from "../../common/types/constructor.type";
import { SocketHandler } from "../../common/types/methodHandler.type";

export function SocketGateway(port: number, options?: Partial<ServerOptions>) {
  return function (target: Constructor) {
    const io = new Server(port, options);

    const addListeners = (socket: Socket) => {
      const eventsMap: Map<string, SocketHandler> = Reflect.getOwnMetadata(META_EVENT, target.prototype);

      for (const { event, handler } of eventsMap.values()) {
        socket.on(event, async (packetInfo: any) => {
          const result = await handler.call(target, packetInfo);
          if (!result) return;
          socket.emit(event, result);
        });
      }
    };

    io.on("connection", addListeners);

    const { propertyKey }: any = Reflect.getOwnMetadata(META_SERVER_PROPERTY, target.prototype);
    Reflect.set(target, propertyKey, io);
  };
}
