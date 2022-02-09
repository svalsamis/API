import { StringIterator } from "lodash";
import { Observable, of } from "rxjs";
import { QuotationAutoService } from "../quotation-auto/quotation-auto.service";
import { CompanyDefinition } from "./CompanyDefinition";
import { GlobalCoverDefinition } from "./GlobalCoverDefinition";

export class CategoryDefinition {
    public code: string;
    public name: string;
    public quotes: Array<CompanyDefinition>;
    public isSubCategory: boolean;
    public companyDefinitions: CompanyDefinition[];
    public GlobalCovers: Array<GlobalCoverDefinition>;
    constructor(code: string, name: string, isSubCategory: boolean = false) {
        this.quotes = new Array<CompanyDefinition>();
        this.code = code;
        this.name = name;
        this.isSubCategory = isSubCategory;
        this.GlobalCovers = QuotationAutoService.getGlobalCoversByCategory(code);
        
    }
}

