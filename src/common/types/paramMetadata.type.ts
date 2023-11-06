import { RequestOptions } from "./requestOptions";

export type PropertyMetaData = { paramType: RequestOptions; index: number; val: string | undefined };

export type SocketPropertyMeta = Pick<PropertyMetaData, "val" | "index">;
