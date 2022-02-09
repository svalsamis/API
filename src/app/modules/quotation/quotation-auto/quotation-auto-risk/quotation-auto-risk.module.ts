import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationAutoRiskComponent } from './quotation-auto-risk.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule} from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  declarations: [QuotationAutoRiskComponent],
  exports: [QuotationAutoRiskComponent]
})
export class QuotationAutoRiskModule { }
