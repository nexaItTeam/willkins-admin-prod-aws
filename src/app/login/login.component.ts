import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from '../shared/master.service';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MainShellComponent } from '../components/layout/main-shell/main-shell.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  @ViewChild(MainShellComponent)
  public component!: MainShellComponent ;

constructor(
  private _fb: FormBuilder,
  private _masterService: MasterService,
  private _sharedService:SharedService,
  private router:Router,
  public spinner:NgxSpinnerService
){

}
ngOnInit(): void {
  this.loginForm = this._fb.group({
    username: '',
    password: '',
    
    
  });
}
onSubmit() {
   this.spinner.show();
  if (this.loginForm.valid) {
    var body =
      {
        "login": {
            "user_email": this.loginForm.controls['username'].value,
            "password": this.loginForm.controls['password'].value
        }
    }
    
    this._masterService
    .loginUser(body)
    .subscribe({
      next: (val: any) => {
        alert('Logged in Sucessfull !');
       
       this._sharedService.setRoleValue(val.user.user_type)
       this._sharedService.getDisplayName(val.user.full_name)
       this._sharedService.setAcessToken(val.accessToken)
       this._sharedService.isloggedin= true;
    
       this.router.navigate(['']);
       this.spinner.hide();
      },
      error: (err: any) => {
        if(err.error.error){
          alert(err.error.error)
          this.spinner.hide();
        }else if(err.error.message){
          alert(err.error.message)
          this.spinner.hide();
        }else{
          alert("error from server side")
          this.spinner.hide();
        }
      },
    });
  
  }
} 
}
