import { Interface } from 'readline';
import { CategoryDefinition } from './CategoryDefinition'
import { IRisk } from './IRisk';
export class QuotationModelBase {
    public branch: string;
    public categories: Array<CategoryDefinition>;
    public risk: IRisk;
    constructor(risk: IRisk = null) {
        this.risk = risk;
        this.categories = new Array<CategoryDefinition>();
        
    }
        
}

