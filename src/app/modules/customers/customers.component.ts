import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { dxGridHelper } from 'app/core/framework/dxGridHelper';
import { GlobalFramework } from 'app/core/framework/GlobalFramework';
import { GlobalService } from 'app/core/services/global-service.service';
import { DxDataGridComponent } from 'devextreme-angular';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomersComponent implements OnInit {
  Clients: any;
  partners: any;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  salespointId: number;
  selectionMode = "single";
  selectionFilterValue = "ALL";
  myClientsFlag = false;
  mergeMode = false;
  selectedItems: Array<any> = [];
  totalRecords: number = null;
  GridHelper: dxGridHelper;
  currentProductionCode: string;
  constructor(private GlobalSrv: GlobalService) { 
    this.Clients = AspNetData.createStore({
      key: "ItemId",
      loadUrl: `${this.GlobalSrv.AppSettings.hermesAPIUrl_Clients}getClients`,
      onBeforeSend: (operation, ajaxSetting) => {
        ajaxSetting.headers = this.GlobalSrv.getHeadersObject(ajaxSetting.headers);

      }
    });
    this.partners = AspNetData.createStore({
      key: "value",
      loadUrl: `${GlobalFramework.AppSettings.hermesAPIUrl_Clients}getPartners`,
      onBeforeSend: (operation, ajaxSetting) => {
        ajaxSetting.headers = this.GlobalSrv.getHeadersObject(ajaxSetting.headers);

      },
      
      
    });
    this.GridHelper = new dxGridHelper();
    this.currentProductionCode = GlobalFramework.CurrentUser.productionCode;
  }

  ngOnInit() {

  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
    {
      location: 'before',
      template: 'checkMyClients'
    },
    {
      location: 'after',
      template: 'lblTotalRecords'
    },
    { location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });
    if (!this.mergeMode) {
      e.toolbarOptions.items.unshift(
        {
          location: 'before',
          widget: 'dxSelectBox',
          value: this.selectionFilterValue,
          elementAttr: {disabled: this.mergeMode },
          options: {
            width: 200,
            items: [{
              value: 'ALL',
              text: '(όλους τους πελάτες)'
            },
            {
              value: 'UPDATED',
              text: 'Τους ενημερωμένους'
            },
            {
              value: 'NOTUPDATED',
              text: 'Τους MH ενημερωμένους'
            },
            {
              value: 'CONSUMERS',
              text: 'Με λογαριασμό myAccount'
            }],
            displayExpr: 'text',
            valueExpr: 'value',
            value: 'ALL',
            onValueChanged: this.selectionChanged.bind(this)
          }
        },
        {
            location: "before",
            widget: "dxButton",
            options: {
              text: "Συγχώνευη Πελατών",
              onClick: this.switchToSelecionMode.bind(this)
            }
          
        }
      );
    } else {
      e.toolbarOptions.items.unshift(
        {
          location: 'before',
          template: 'mergeConfirmation'
        }   
      );
    }
  }
  onRowPrepared(e) {
    if (e.rowType == 'data') {
      const client = e.data;
      if (client.ProducerId == GlobalFramework.CurrentUser.productionCode) {
      //  e.rowElement.style.fontWeight = "700";
      } else {
        //e.rowElement.style.fontWeight = "normal";
      }
    }
    
  }
  editButtonClicked(data: any) {
    const itemId = data.ItemId;
    // this.proccesing = true;
    // this.clientSrv.getClient(itemId).then((res) => {
    //   this.proccesing = false;
    //   const dlg = this.dialog.open(ClientFormComponent, {
    //     data: {
    //       client: res.client,
    //       clientUser: res.clientUser,
    //       entities: res.entities,
    //       isDemo: res.isDemo,
    //       partners: res.partners,
    //       partnerSalespoints: res.partnerSalespoints
    //     }, width: "80vw", panelClass: "mat-dialog-no-padding"
    //   });
    //   dlg.componentInstance.onSaveCompleted.subscribe((client) => {
    //     this.refreshDataGrid();
    //   });
    //   dlg.componentInstance.onClientChanged.subscribe((client) => {
    //     this.refreshDataGrid();
    //   });
      
      
    // });


  }
  getSelectedItems(event) {
    this.selectedItems = event.selectedRowsData;
    
  }
  refreshDataGrid() {
    this.dataGrid.instance.getDataSource().reload();
  }
  onContentReady(e) {
    this.selectedItems = [];
    this.totalRecords = e.component.getDataSource().totalCount();
    

  }
  switchToSelecionMode(e) {
    this.setMergeMode(true);
  }
  setMergeMode(flag: boolean) {
    if (flag) {
      this.selectionMode = "multiple";
    } else {
      this.selectionMode = "single";
    }
    this.mergeMode = flag;
    this.dataGrid.instance.repaint();
    
  }
  selectionChanged(e) {
    this.dataGrid.instance.clearFilter();
    if (e.value == 'UPDATED') {
      this.dataGrid.instance.filter(["ProducerId","=", GlobalFramework.CurrentUser.productionCode]);
    } else if (e.value == 'NOTUPDATED') {
      this.dataGrid.instance.filter(["ProducerId","=",null]);
    
    } else if (e.value  == 'CONSUMERS') {
      this.dataGrid.instance.filter([["ProducerId","=",GlobalFramework.CurrentUser.productionCode],"and", ["SalespointUserId", ">" ,0]]);
    }
    
    
  }
  getInitials(dataItem) {
    let res = '';
    let client = dataItem;
    if (client.LastName && client.LastName != null && client.LastName.length > 0 && client.FirstName && client.FirstName != null && client.FirstName.length > 0) {
        res = client.LastName.substring(0,1) + client.FirstName.substring(0,1);
    } else if (client.DisplayName && client.DisplayName != null && client.DisplayName.length > 0) {
        const parts = client.DisplayName.split(' ');
        if (parts.length > 1) {
          res = parts[0].substring(0,1) + parts[1].substring(0,1);
        } else {
          res = parts[0].substring(0,2);
        }
    }
    return res;

 }
}
