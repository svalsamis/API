import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationRowComponent } from './quotation-row.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule
  ],
  declarations: [QuotationRowComponent],
  exports: [QuotationRowComponent]
})
export class QuotationRowModule { }
