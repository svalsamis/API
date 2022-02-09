import { DefinitionBase } from "./DefinitionBase";
import { AmountTypesEnum } from "./AmountTypesEnum";
import { SubCoverInfo } from "./SubCoverInfo";

export class ProductCoverDefinition extends DefinitionBase {
    ProductCoverId: number;
    SubCoverId: number;
    AmoutType: AmountTypesEnum;
    isOptionalCover: boolean;

    Amount: number;
    Remission: number;
    SubCoversEnabled: boolean;
    DefaultSelected: boolean;
    RequiredCovers: number[];
    IncludedCovers: number[];
    IncompatibleCovers: number[];
    ExcludedSubCovers: string;
    SubCovers: SubCoverInfo[];
    
}
