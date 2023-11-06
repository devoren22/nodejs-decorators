import { META_SOCKET_BODY } from "../../common/reflector-meta-keys/socket.symbols";

export function MessageBody(param?: string) {
  return function (target: any, propertyKey: string, paramIndex: number) {
    const oldMetaData = Reflect.getOwnMetadata(META_SOCKET_BODY, target, propertyKey);

    let newMetaDataParams = [{ val: param, index: paramIndex }];

    // Initiate the metadata for this paramType
    if (oldMetaData && oldMetaData.length) newMetaDataParams = [...newMetaDataParams, ...oldMetaData];

    Reflect.defineMetadata(META_SOCKET_BODY, newMetaDataParams, target, propertyKey);
  };
}
