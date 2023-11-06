import { ParamTypeToSymbolMapper } from "../../common/param-type-to-symbol";
import { PropertyMetaData } from "../../common/types/paramMetadata.type";

export function createParamDecorator(
  target: any,
  propertyKey: string,
  paramIndex: number,
  paramArgs: Pick<PropertyMetaData, "paramType" | "val">
) {
  const metaDataSymbol = ParamTypeToSymbolMapper[paramArgs.paramType];

  const oldMetaData: PropertyMetaData[] = Reflect.getOwnMetadata(metaDataSymbol, target, propertyKey);

  let newMetaDataParams: PropertyMetaData[] = [{ paramType: paramArgs.paramType, index: paramIndex, val: paramArgs.val }];

  // Initiate the metadata for this paramType
  if (oldMetaData && oldMetaData.length) newMetaDataParams = [...newMetaDataParams, ...oldMetaData];

  Reflect.defineMetadata(metaDataSymbol, newMetaDataParams, target, propertyKey);
}
