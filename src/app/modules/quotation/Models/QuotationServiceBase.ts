import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalService } from "app/core/services/global-service.service";
import { CategoryDefinition } from "./CategoryDefinition";
import { QuotationModelBase } from "./QuotationModelBase";
import { IRisk } from "./IRisk";
@Injectable({
    providedIn: 'root'
  })
export class QuotationServiceBase {
  public QuotationModel: QuotationModelBase;
  public _quoteDefinitions: Array<any> = [];
  constructor(public http: HttpClient, 
    public globalSrv: GlobalService) { 
        
    this.QuotationModel = this.createQuotationModel();
    this.QuotationModel.risk = this.createRisk();
    this.QuotationModel.categories = this.getCategories();
  }
  public getBranch(): string {
    return null;
  }
  public getUsages(): Promise<any> {
   return new Promise<any>((resolve, reject) => {
        resolve([]);
   });

  }
  public getCategories(): Array<CategoryDefinition> {
      return new Array<CategoryDefinition>();
  }
  public async getDefinitions(categoryCode: string, usageId: number): Promise<Array<any>> {
     return [];
  }

  public async fetchDefinitions(categoryCode: string, usageId: number): Promise<any> {
     return new Promise<any>((resolve, reject) => {
         resolve([]);
     });

  }
  
  public resetQuotationModelQuotes() {
    this.QuotationModel.categories = this.getCategories();
  }
  public createRisk(): IRisk {
    return null;
  }
  createQuotationModel(): QuotationModelBase {
    return null
  }
}
