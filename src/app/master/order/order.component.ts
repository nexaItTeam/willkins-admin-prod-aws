import { Component, ViewChild, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/shared/master.service';
import { ViewOrderTscComponent } from '../view-order-tsc/view-order-tsc.component';
import { SVGIcon, bookIcon, cancelIcon, clipboardTextIcon, eyeIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  public clientId: any
  public payloadData: any
  public payload: any
  @Input() msgFromParent1: any
  constructor(private spinner: NgxSpinnerService, private _masterService: MasterService,
    private router: Router, private _dialog: MatDialog,
    //   private _dialog: MatDialog,
    // private _dialogRef: MatDialogRef<OrderComponent>,
    //   @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  displayedColumns: string[] = [
    "emptycolumn",
    "createdAt",
    "id",  
    "order_id",
    "investing_amount",
    "enq_client_data",
    "contactno",
    "client_email",
    "enq_form_data",
    "enq_prop_data",
    "paidStatus",
    "amount_paid",
    "amount_unpaid",
    "action"
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getOrder()

  }
  public socialItems: Array<any> = [
   
    { svgIcon: bookIcon, label: "View Application" },
    { svgIcon: clipboardTextIcon, label: "View & Download TERMS OF PAYMENT" },
    { svgIcon: bookIcon, label: "View & Download Unit Certificate" },
  ];
  onfullnameClick(dataItem, row) {
    switch (dataItem.item.label) {
      
      case 'View Application':
        this.viewApplication(row)
        break;
      case 'View & Download TERMS OF PAYMENT':
        this.viewInvoice(row)
        break;
      case 'View & Download Unit Certificate':
        if (row.paidStatus == 2 || row.paidStatus == 4) {
          this.viewCerticate(row)
        } else {
          alert('Unit Certificate can be downloaded after installment are paid')
        }
        break;
    }
  }

  public get svgIcon(): SVGIcon {
    return this.dialOpen ? cancelIcon : eyeIcon;
  }

  public onDialOpen(): void {
    this.dialOpen = true;
  }

  public onDialClose(): void {
    this.dialOpen = false;
  }
  public dialOpen = false;
  public statusList = [{
    type: 'Under Review',
    value: 0
  },
  {
    type: 'Approved',
    value: 1
  },
  {
    type: 'First Installment Recieved',
    value: 2
  }, {
    type: 'Rejected',
    value: 3
  },
  {
    type: 'Payment Done ',
    value: 4
  }
  ]
  public getOrder() {

    this.spinner.show()
    if (this.msgFromParent1) {
      this.payloadData = {
        "client_id": this.msgFromParent1.id
      }
    } else {
      this.payloadData = []
    }

    this._masterService.getOrders(this.payloadData).subscribe({
      next: (res: any) => {
        console.log(res.getOrder)
        this.dataSource = new MatTableDataSource(res.getOrder);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
        this.dataSource.filterPredicate = (data: any, filter: any) => {

          return data.enq_form_data.investor_form_type.toLocaleLowerCase().includes(filter) ||
            data.enq_prop_data.property_name.toLocaleLowerCase().includes(filter) ||
            data.enq_client_data.full_name.toLocaleLowerCase().includes(filter) ||
            data.enq_client_data.client_email.toLocaleLowerCase().includes(filter) ||
            data.order_id.toLocaleLowerCase().includes(filter) ||
            data.investing_amount.toString().trim().toLowerCase().includes(filter) ||
            data.id.toString().trim().toLowerCase().includes(filter);

        }
      },
      error: (err: any) => {
        alert('error from server side');
        this.spinner.hide();
      }
    });
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  applyFilter(event) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  viewApplication(row: any) {


    //this._dialogRef.close()
    this._masterService.orderData = []
    this._masterService.orderData.push(row)
    this.router.navigate(['client-form'])
  }
  viewInvoice(row) {
console.log(row)
    this._masterService.invoiceData = []
    this._masterService.invoiceData.push(row)
    this.router.navigate(['invoice'])
  }
  viewCerticate(row) {
    this._masterService.invoiceData = []
    this._masterService.invoiceData.push(row)
    this.router.navigate(['certificate'])
  }
  openEditForm(row, index) {
    const dialogRef = this._dialog.open(ViewOrderTscComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrder()
        }
      },
    });
    //   this.spinner.show()
    //   console.log(row)
    //   if(row.amount_paid !=0){
    //   this.payload = {
    //     "order": {
    //       "order_id": row.order_id,
    //       "paidStatus": row.paidStatus,
    //       "amount_paid": row.amount_paid,
    //       "amount_unpaid":row.amount_unpaid == 0 ? row.investment_unit - row.amount_paid :  row.amount_unpaid -  row.amount_paid
    //     },
    //     "transaction": {
    //       "client_id": row.enq_client_data.id,
    //       "order_id": row.id,
    //       "enq_form_id": row.enq_form_id,
    //       "prop_id": row.enq_prop_data.id,
    //       "investment_unit": row.investment_unit,
    //       "investing_amount": row.investing_amount,
    //       "transaction_date": new Date() ,
    //       "transaction_type": "Allotment",
    //       "units_acquired": row.investment_unit,
    //       "units_transferred": 0,
    //       "units_balance": row.investment_unit,
    //       "amount_paid": row.amount_paid, 
    //       "amount_unpaid": row.amount_unpaid == 0 ? row.investment_unit - row.amount_paid :  row.amount_unpaid -  row.amount_paid
    //     }
    //   }
    // }else{
    //   this.payload= {
    //     "order": {
    //       "order_id": row.order_id,
    //       "paidStatus": row.paidStatus,
    //       "amount_paid": row.amount_paid,
    //       "amount_unpaid":row.amount_unpaid == 0 ? row.investment_unit - row.amount_paid :  row.amount_unpaid -  row.amount_paid
    //     },
    //   }
    // }

    //   this._masterService.updateorderStatus(this.payload).subscribe((res: any) => {
    //     this.spinner.hide()
    //     alert('status updated')
    //     this.getOrder()
    //   },(err)=>{
    //     this.spinner.hide()
    //     alert('error from server side')
    //   }
    //   )


  }

}
