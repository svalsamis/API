import { DefinitionBase } from "./DefinitionBase";
import { SpecialDiscount } from "./SpecialDiscount";
import { ProductDefinition } from "./ProductDefinition";

export class CompanyDefinition extends DefinitionBase {
    Products: ProductDefinition[];
    SpecialDiscounts: SpecialDiscount[];
    SupportedFrequencies: number[];
    HasSpecInfos: boolean;
    ProviderId: number;
    SelectedProductId: number;
    DefaultProductId: number;
    Category: string;
}
