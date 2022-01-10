import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationComponent } from './quotation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Route } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

const quotationRoutes: Route[] = [
  {
      path     : '',
      component: QuotationComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forChild(quotationRoutes)
  ],
  declarations: [QuotationComponent]
})
export class QuotationModule { }
