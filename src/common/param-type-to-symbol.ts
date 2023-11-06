import { META_BODY, META_PARAM, META_QUERY, META_REQ, META_HEADERS } from "./reflector-meta-keys/express.symbols";
import { RequestOptions } from "./types/requestOptions";

export const ParamTypeToSymbolMapper: Record<Partial<RequestOptions>, string | undefined> = {
  params: META_PARAM,
  query: META_QUERY,
  body: META_BODY,
  req: META_REQ,
  headers: META_HEADERS,
} as unknown as Record<Partial<RequestOptions>, string | undefined>;
