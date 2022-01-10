import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationAutoComponent } from './quotation-auto.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    RouterModule.forChild(quotationAutoRoutes)
  ],
  declarations: [QuotationAutoComponent]
})
export class QuotationAutoModule { }
