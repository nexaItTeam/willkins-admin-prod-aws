import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
public role =new Subject();
public isloggedin:boolean =false
public displayName =new Subject();
  constructor() { 


  }


  public setAcessToken(value:string){
    localStorage.setItem( 'token', value);
  }
  public getAcessRoken(){
    return localStorage.getItem( 'token');
  }
  public setRoleValue(value:string){
    localStorage.setItem( 'role', value);
  }
  public getRoleValue(){
    return localStorage.getItem('role');
  }
  public getDisplayName(value:string){
    localStorage.setItem( 'displayname', value);
  }
  public getDispalyNameValue(){
   return localStorage.getItem( 'displayname');
  }
}
