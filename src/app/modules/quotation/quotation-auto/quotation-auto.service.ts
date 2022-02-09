import { Injectable } from '@angular/core';
import { Auto } from '../Models/Auto';
import { CategoryDefinition } from '../Models/CategoryDefinition';
import { QuotationModelBase } from '../Models/QuotationModelBase';
import { QuotationModelAuto } from '../Models/QuotationModelAuto';
import { QuotationServiceBase } from '../Models/QuotationServiceBase';
import { CompanyDefinition } from '../Models/CompanyDefinition';
import { GlobalCoverDefinition } from '../Models/GlobalCoverDefinition';
import { COVER_FF, COVER_KP, COVER_MK, COVER_NP, COVER_OB, COVER_PA, COVER_UK, COVER_YZA } from '../Models/Constants';

@Injectable({
  providedIn: 'root'
})
export class QuotationAutoService extends QuotationServiceBase {
  public getUsages(): Promise<any> {
      const url = `${this.globalSrv.AppSettings.hermesAPIUrl_QuotationAuto}getUsages`;
      return this.http.get(url, {headers: this.globalSrv.headers}).toPromise();
  }
  
  public async getDefinitions(categoryCode: string, usageId: number): Promise<Array<CompanyDefinition>> {
    let cat = this.QuotationModel.categories.find(fn => fn.code == categoryCode);
    if (!cat) { return [];}
    if (!cat.quotes || cat.quotes.length == 0) {
      cat.quotes = await this.fetchDefinitions(categoryCode, usageId);
      return cat.quotes;
    } else {
      return cat.quotes;
    }
    
  }
  public getCategories(): Array<CategoryDefinition> {
          return [
                new CategoryDefinition("BASE", "ΒΑΣΙΚΑ"),
                new CategoryDefinition("THEFT", "ΠΥΡΟΣ/ΚΛΟΠΗΣ"),
                new CategoryDefinition("MIXED", "ΜΙΚΤΗΣ"),
                new CategoryDefinition("ROAD", "ΟΔΙΚΗ", true),
                new CategoryDefinition("LEGAL", "NOMIKH", true),
          ]
  }
  public getBranch(): string {
    return "19";
  }
  public static getGlobalCoversByCategory(code: string): Array<GlobalCoverDefinition> {
    let GlobalCovers = new Array<GlobalCoverDefinition>();
        if (code == "BASE") {
            GlobalCovers.push(new GlobalCoverDefinition(COVER_OB,"Οδική βοήθεια"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_UK,"Θραύση κρυστάλλων"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_NP,"Νομική προσασία"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_PA,"Προσωπικό ατύχημα"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_YZA,"Ζημιές πό ανασφάλιστο"));
        } else if (code == "THEFT") {
            GlobalCovers.push(new GlobalCoverDefinition(COVER_OB,"Οδική βοήθεια"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_UK,"Θραύση κρυστάλλων"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_NP,"Νομική προσασία"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_MK,"Μερική κλοπή"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_FF,"Φυσικά φαινόμενα"));
        } else if (code == "MIXED") {
            GlobalCovers.push(new GlobalCoverDefinition(COVER_OB,"Οδική βοήθεια"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_UK,"Θραύση κρυστάλλων"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_NP,"Νομική προσασία"));
            GlobalCovers.push(new GlobalCoverDefinition(COVER_KP,"Κακόνουλες μικτής"));

        }
        return GlobalCovers;
  }
  public async fetchDefinitions(categoryCode: string, usageId: number): Promise<CompanyDefinition[]> {
    const url = `${this.globalSrv.AppSettings.hermesAPIUrl_QuotationAuto}getQuoteDefinitionsAsync`;
      const body = {
        category: categoryCode,
        usageId: usageId,
        companyIds: null

      }
      return new Promise<CompanyDefinition[]>((resolve, reject) => {
       this.http.post<CompanyDefinition[]>(url, 
          JSON.stringify(body), 
          {headers: this.globalSrv.getHeaders()}).toPromise().then(data => {
            resolve(data);
          }).catch(err => { reject(err); });
        });

  }
  createRisk(): Auto {
    return new Auto();
  }
  createQuotationModel(): QuotationModelBase {
      return new QuotationModelAuto();
  }
  
}


