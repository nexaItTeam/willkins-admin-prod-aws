import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/shared/master.service';

@Component({
  selector: 'app-add-edit-enquiry',
  templateUrl: './add-edit-enquiry.component.html',
  styleUrls: ['./add-edit-enquiry.component.scss']
})
export class AddEditEnquiryComponent implements OnInit{
enquiryForm!:FormGroup
constructor( private _fb:FormBuilder,
  private _dialog: MatDialog,
  private _dialogRef: MatDialogRef<AddEditEnquiryComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _masterService: MasterService,
    public spinner: NgxSpinnerService,
){

}



  ngOnInit(): void {
    this.enquiryForm = this._fb.group({
      "full_name": ["",Validators.required],
        "user_email":["",[Validators.required,Validators.email]] ,
        "contact_no":["",Validators.required],
        "location": ["",Validators.required],
        "description":["",Validators.required],
        "property_id": ["",]
      
    });
    this.enquiryForm.patchValue(this.data)
    console.log(this.data)
  }
  onFormSubmit() {
    this.spinner.show()
   if(this.data !='Broker'){
    if (this.enquiryForm.valid ) {
      
      var body={
        "enquery": {
         "id": this.data.id,
            "full_name": this.enquiryForm.controls['full_name'].value,
           "user_email":this.enquiryForm.controls["user_email"].value,
           "contact_no": this.enquiryForm.controls["contact_no"].value,
            "location": this.enquiryForm.controls["location"].value ,
            "description": this.enquiryForm.controls["description"].value,
           "property_id": this.data.property_id
       }
    }
         this._masterService
           .updateEnquiryList(body)
          .subscribe({
             next: (val: any) => {
               alert('Enquiry details Updated!');
               this.spinner.hide()
               this._dialogRef.close(true);
             },
             error: (err: any) => {
              console.error(err);
             },
           });
      
    }else {
      alert("Please fill the form correctly")
      this.spinner.hide()
    }
  }
    else{
  if(this.enquiryForm.valid && this.data == 'Broker'){
    var Brokerbody={
      
        "client": {
            "full_name":this.enquiryForm.controls['full_name'].value,
            "password": Math.random().toString(36).slice(-8),
            "client_email": this.enquiryForm.controls["user_email"].value,
            "contact_no":  this.enquiryForm.controls["contact_no"].value,
            "active": 0,
            "client_type":1
    }
  }
    this._masterService
           .activateClient(Brokerbody)
          .subscribe({
             next: (val: any) => {
               alert('Broker  Activated');
               this.spinner.hide()
               this._dialogRef.close()
             },
             error: (err: any) => {
              alert(err.error.message);
              this.spinner.hide()
             },
           });
  }else{
    alert("Please fill the form correctly")
    this.spinner.hide()
  }
}
  
  }
}
