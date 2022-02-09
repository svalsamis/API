import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryDefinition } from '../Models/CategoryDefinition';
import { CompanyDefinition } from '../Models/CompanyDefinition';
import { GlobalCoverDefinition } from '../Models/GlobalCoverDefinition';
import { ProductCoverDefinition } from '../Models/ProductCoverDefinition';
import { ProductDefinition } from '../Models/ProductDefinition';
import { QuotationAutoService } from '../quotation-auto/quotation-auto.service';

@Component({
  selector: 'app-quotation-row',
  templateUrl: './quotation-row.component.html',
  styleUrls: ['./quotation-row.component.scss']
})
export class QuotationRowComponent implements OnInit {
  @Input() quote: CompanyDefinition;
  @Input() category: CategoryDefinition;
  selectedProduct: Observable<ProductDefinition>;
  products: Observable<Array<ProductDefinition>>;
  categoryCovers: Observable<Array<GlobalCoverDefinition>>;
  globalCovers: Array<GlobalCoverDefinition>;
  constructor() { 
    
  }
  
  async selectProduct(product: ProductDefinition) {
    
    
    if (!this.quote.Products || this.quote.Products.length == 0) { return; }
    this.selectedProduct = of(product);
    this.quote.SelectedProductId = product.ItemId;
    let categoryCovers = QuotationAutoService.getGlobalCoversByCategory(this.quote.Category);
    categoryCovers.forEach(fn => {
      let c = product.Covers.find(cv => cv.ItemId == fn.globalCoverId);
      if (c) {
        if (c.isOptionalCover) {
          fn.status = "OPTIONAL";
        } else {
          fn.status = "PRODUCT";
        }
      } else {
        fn.status = "NONE";
      }
    });
    this.categoryCovers = of(categoryCovers);
  }
  
  ngOnInit() {
    let defprod = this.quote.Products.find(fn => fn.ItemId == this.quote.DefaultProductId);
    if (!defprod) defprod = this.quote.Products[0];
    this.selectProduct(defprod);
    // this.selectProduct(this.quote.DefaultProductId);
    this.products = of(this.quote.Products);
    
  }
  showDetail() {
    
  }
}
