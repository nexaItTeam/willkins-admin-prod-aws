import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/shared/master.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit{
  public roleMapForm!:FormGroup
  public userRoleList:any
constructor(private _fb: FormBuilder,
  private spinner:NgxSpinnerService,
  private _dialogRef: MatDialogRef<AddRoleComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _masterService: MasterService){}
ngOnInit(): void {
  this.roleMapForm = this._fb.group({
    id:'',
    full_name:"",
        user_email:"",
        password:"",
        contact_no:"",
        user_type:"",
    
  });
  this.getdropdownRole();
  this.roleMapForm.patchValue(this.data);
}


onFormSubmit(){
  if (this.roleMapForm.valid) {
    this.spinner.show()
    if (this.data) {
      var body={
        "user": {
          "id":this.roleMapForm.controls['id'].value,
          "full_name":this.roleMapForm.controls['full_name'].value,
          "user_email":this.roleMapForm.controls['user_email'].value,
          "password": this.roleMapForm.controls['password'].value,
          "contact_no": this.roleMapForm.controls['contact_no'].value,
          
      }
      
      }
      this._masterService
        .updateUserRole(body)
        .subscribe({
          next: (val: any) => {
            alert('User detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      var Addbody={
        "user": {
          
          "full_name":this.roleMapForm.controls['full_name'].value,
          "user_email":this.roleMapForm.controls['user_email'].value,
          "password": this.roleMapForm.controls['password'].value,
          "contact_no": this.roleMapForm.controls['contact_no'].value,
          "user_type": this.roleMapForm.controls['user_type'].value
      }
      
      }

      this._masterService.addUserRole(Addbody).subscribe({
        next: (val: any) => {
          alert('User Created  successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }else{
    this.spinner.hide()
    alert("Please fill the form correctly")
  }


}
public getdropdownRole(){
  this.userRoleList=[
    {
      name: "Admin",
      value: "admin"
    },
    {
      name: "Team Lead",
      value: "TeamLead"
    },
    {
      name: "Lead Generator",
      value: "LeadGenerator"
    },
    {
      name: "Content Writer",
      value: "blog"
    }
  ]
}
}
