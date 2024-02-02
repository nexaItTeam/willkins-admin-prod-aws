import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/shared/master.service';

@Component({
  selector: 'app-view-order-tsc',
  templateUrl: './view-order-tsc.component.html',
  styleUrls: ['./view-order-tsc.component.scss'],
  
})
export class ViewOrderTscComponent implements OnInit{
  showerror:boolean =false
  ordertscForm:FormGroup;
  transactionData:any
  public orderData:object |any
  public payload:any
  constructor(private _fb: FormBuilder,
    private _masterService: MasterService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<ViewOrderTscComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.orderData = data
      console.log(data)
    }
ngOnInit(): void {
  this.ordertscForm = this._fb.group({
    amount_paid: [0],
    paidStatus: [''],
    transaction_date:['',Validators.required],
    transaction_type:['',Validators.required]
  });
  //patch form value & call get transaction on load
  this.ordertscForm.get('paidStatus').setValue(this.orderData.paidStatus)
  this.getTransaction()
}
//status list
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

// save all details and call api by passing form data
onSaveClick(){
  
     this.spinner.show()
      this.showerror =true
      if(this.ordertscForm.get('amount_paid').value !=0 && this.ordertscForm.valid){
      this.payload = {
        "order": {
          "order_id": this.orderData.order_id,
          "paidStatus": this.ordertscForm.get('paidStatus').value,
          "amount_paid": this.ordertscForm.get('amount_paid').value,
          "amount_unpaid":this.orderData.amount_unpaid == 0 ? this.orderData.investment_unit - this.ordertscForm.get('amount_paid').value :  this.orderData.amount_unpaid -  this.ordertscForm.get('amount_paid').value
        },
        "transaction": {
          "client_id": this.orderData.enq_client_data.id,
          "order_id": this.orderData.id,
          "enq_form_id": this.orderData.enq_form_id,
          "prop_id": this.orderData.enq_prop_data.id,
          "investment_unit": this.orderData.investment_unit,
          "investing_amount": this.orderData.investing_amount,
          "transaction_date": this.ordertscForm.get('transaction_date').value,
          "transaction_type": this.ordertscForm.get('transaction_type').value,
          "units_acquired": this.orderData.investment_unit,
          "units_transferred": 0,
          "units_balance": this.orderData.investment_unit,
          "amount_paid": this.ordertscForm.get('amount_paid').value, 
          "amount_unpaid": this.orderData.amount_unpaid == 0 ? this.orderData.investment_unit - this.ordertscForm.get('amount_paid').value :  this.orderData.amount_unpaid -  this.ordertscForm.get('amount_paid').value,
          
        }
      }
    }else if(this.ordertscForm.get('amount_paid').value ==0){
      this.payload= {
        "order": {
          "order_id": this.orderData.order_id,
          "paidStatus": this.ordertscForm.get('paidStatus').value,
          "amount_paid":this.orderData.amount_paid,
          "amount_unpaid":this.orderData.amount_unpaid == 0 ? this.orderData.investment_unit - this.ordertscForm.get('amount_paid').value :  this.orderData.amount_unpaid -  this.ordertscForm.get('amount_paid').value
        },
      }
    }else{
      alert('please fill form correctly')
      this.spinner.hide()
      return
    }

      this._masterService.updateorderStatus(this.payload).subscribe((res: any) => {
        this.spinner.hide()
        alert('status updated')
        this._dialogRef.close(true);
      },(err)=>{
        this.spinner.hide()
        alert('error from server side')
      }
      )


}

//get transaction data of particular order id
public getTransaction() {
  this.spinner.show()
  const body = {
    "client_id": this.orderData.client_id,
    "order_id":this.orderData.order_id,
    "holder_type":"self",
    "form_type":this.orderData.enq_form_data.investor_form_type
  }
  this._masterService.getTransactionData(body).subscribe({
    next: (res: any) => {

      this.transactionData = res.get_transaction[0]
      this.spinner.hide()
    },


    error: (err: any) => {
      alert('error from server side');
      this.spinner.hide();
    }
  });
}
}
