import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { GlobalService } from 'app/core/services/global-service.service';
import { Observable, of } from 'rxjs';
import { Auto } from '../../Models/Auto';
import { QuotationAutoService } from '../quotation-auto.service';

@Component({
  selector: 'app-quotation-auto-risk',
  templateUrl: './quotation-auto-risk.component.html',
  styleUrls: ['./quotation-auto-risk.component.scss']
})
export class QuotationAutoRiskComponent implements OnInit {
  @Input() risk: Auto = new Auto();
  @Output() usageChanged: EventEmitter<number> = new EventEmitter<number>();
  usages: Observable<Array<any>> = of([]);
  appearance = 'standard';
  constructor(private globalSrv: GlobalService,
    private Qsrv: QuotationAutoService) { 

    }

  ngOnInit() {
    this.Qsrv.getUsages().then(res => {
      this.usages = of(res);
    });
    
  }
  updateRisk(frm: NgForm) {

  }
  setUsage(event: MatSelectChange) {
    this.usageChanged.emit(event.value);
  }
  loadDefinitions(event) {
    
  }
}
