import { Auto } from './Auto';
import { QuotationModelBase } from './QuotationModelBase';

export class QuotationModelAuto extends QuotationModelBase {
    public risk: Auto;
    constructor() {
        super();
        this.risk = new Auto();
        this.branch = "19";
    }
}
