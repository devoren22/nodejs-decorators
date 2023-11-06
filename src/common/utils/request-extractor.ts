import { Request } from "express";
import { sortBy } from "lodash";
import { PropertyMetaData, SocketPropertyMeta } from "../types/paramMetadata.type";
import { RequestOptions } from "../types/requestOptions";

export function requestExtractor(req: Request, propertiesMetas: PropertyMetaData[]) {
  const reqOptionToValue: Record<RequestOptions, any> = {
    req: req,
    body: req.body,
    query: req.query,
    ip: req.ip,
    headers: req.headers,
    params: req.params,
    host: req.hostname,
  };
  const sortedArgumentsMetas = sortBy(propertiesMetas, "index");

  return sortedArgumentsMetas.map((meta) =>
    meta.val ? reqOptionToValue[meta.paramType][meta.val] : reqOptionToValue[meta.paramType]
  );
}

export function socketExtractor(originalPacket: any, metasProps: SocketPropertyMeta[]) {
  const sortedArgumentsMetas = sortBy(metasProps, "index");
  return sortedArgumentsMetas.map((meta) => (meta.val ? originalPacket[meta.val] : originalPacket));
}
