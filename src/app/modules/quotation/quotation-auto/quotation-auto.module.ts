import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationAutoComponent } from './quotation-auto.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule  } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuotationAutoRiskModule } from './quotation-auto-risk/quotation-auto-risk.module';
import { QuotationAutoService } from './quotation-auto.service';
import { FormsModule } from '@angular/forms';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar/public-api';
import { QuotationRowModule } from '../quotation-row/quotation-row.module';
const quotationAutoRoutes: Route[] = [
  {
      path     : '',
      component: QuotationAutoComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    FuseScrollbarModule,
    QuotationAutoRiskModule,
    QuotationRowModule,
    RouterModule.forChild(quotationAutoRoutes)
  ],
  declarations: [QuotationAutoComponent],
  exports: [QuotationAutoComponent],
  providers: [QuotationAutoService]
})
export class QuotationAutoModule { }
