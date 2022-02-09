import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { GlobalService } from 'app/core/services/global-service.service';

import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuotationModelBase } from '../Models/QuotationModelBase';
import { QuotationModelAuto } from '../Models/QuotationModelAuto';
import { QuotationServiceBase } from '../Models/QuotationServiceBase';
import { QuotationAutoService } from './quotation-auto.service';

@Component({
  selector: 'app-quotation-auto',
  templateUrl: './quotation-auto.component.html',
  styleUrls: ['./quotation-auto.component.scss']
})
export class QuotationAutoComponent implements OnInit {
  QuotationModel: QuotationModelAuto;
  QuoteDefinitions: Observable<Array<any>> = of([]);
  selectedCategoryDefinitions: Observable<Array<any>> = of([]);
  selectedCategory: string = "BASE";
  loading: boolean = false;
  constructor(private QSrv: QuotationAutoService,
    private globalSrv: GlobalService) { 
    this.QuotationModel = this.QSrv.QuotationModel as QuotationModelAuto;  
  }
  changeCategory(event: MatButtonToggleChange) {
    this.setCategory(event.value);
  }
  async setUsage(usageId: number) {
    //clear Model;
    this.QSrv.resetQuotationModelQuotes();

    let cat = this.QuotationModel.categories.find(fn => fn.code == this.selectedCategory);
    let data = await this.QSrv.getDefinitions(this.selectedCategory, usageId);
    cat.quotes = data;
    this.QuoteDefinitions = of(cat.quotes);

  }
  async setCategory(category) {
    this.selectedCategory = category;
    this.loading = true;
    let cat = this.QuotationModel.categories.find(fn => fn.code == category);
    let data = await this.QSrv.getDefinitions(this.selectedCategory, this.QuotationModel.risk.UsageId);
    cat.quotes = data;
    this.loading = false;
    this.QuoteDefinitions = of(cat.quotes);
      
  }
  ngOnInit() {
    
    this.setCategory(this.selectedCategory)
    
  }
  
}
