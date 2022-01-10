import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  components = [];
  constructor() { 
    this.components = [
      {
        id      : '19',
        name    : 'Αυτοκίνητο',
        summary : 'Προσφορά ΙΧ Επιβατηγά',
        image   : 'fa-car'
      },
      {
        id      : '17',
        name    : 'Κατοικίας',
        summary : 'Προσφορά για Ασφάλιση Κατοικίας',
        image   : 'fa-home'
      },
      {
        id      : '15',
        name    : 'Σκαφών',
        summary : 'Προσφορά για Ασφάλιση Σκάφους',
        image   : 'fa-anchor'
      },
      {
        id      : '00_1',
        name    : 'Αλλοδαπών',
        summary : 'Προσφορά για Ασφάλιση Αλλοδαπών',
        image   : 'fa-address-card'
      },
    ]
  }
  
  ngOnInit() {

  }

}
