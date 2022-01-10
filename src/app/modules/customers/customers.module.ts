import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';

import { RouterModule, Route } from '@angular/router';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const customerRoutes: Route[] = [
  {
      path     : '',
      component: CustomersComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FuseScrollbarModule,
    RouterModule.forChild(customerRoutes),
    DxDataGridModule,
    DxButtonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }
