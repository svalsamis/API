import { DefinitionBase } from "./DefinitionBase";
import { Statement } from "./Statement";
import { ProductCoverDefinition } from "./ProductCoverDefinition";

export class ProductDefinition extends DefinitionBase {
    Categories: string[];
    Selected: boolean;
    QuotationProfiles: string;
    SupportedFrequencies: number[];
    EasyBuy: boolean;
    LowCommission: boolean;
    ProviderId: number;
    SupportdUsages: number[];
    Statements: Statement[];
    Covers: ProductCoverDefinition[];
}
