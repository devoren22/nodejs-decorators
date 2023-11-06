import { isNumber } from "lodash";
import { MethodHandler } from "../../common/types/methodHandler.type";
import { socketExtractor } from "../../common/utils/request-extractor";
import { META_EVENT } from "../../common/reflector-meta-keys/socket.symbols";

export function SubscribeMessage(event: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // The first 3 keys are not important for us.
    const metaDataKeys = Reflect.getOwnMetadataKeys(target, key).flatMap((key: string) => {
      if (!key.includes("design")) {
        return key;
      }
      return [];
    });

    const socketPropertiesMetaData = metaDataKeys.flatMap((metaKey) => Reflect.getOwnMetadata(metaKey, target, key));

    const internalFn: Function = descriptor.value;

    const handler = async function (packetInfo: any) {
      const socketEventArguments = socketExtractor(packetInfo, socketPropertiesMetaData);

      try {
        // Call the internal function with the controller class as (this)
        let result = await internalFn.call(this, ...socketEventArguments);
        if (isNumber(result)) result = result.toString();

        return result;
      } catch (ex: any) {
        return {
          error: "socket handler error",
          message: ex.message,
        };
      }
    };

    // add methods routes to controller metadata
    const metaDataForClassDecorator = Reflect.getOwnMetadata(META_EVENT, target) || new Map<string, MethodHandler>();
    metaDataForClassDecorator.set(key, { event, handler });

    Reflect.defineMetadata(META_EVENT, metaDataForClassDecorator, target);
  };
}
