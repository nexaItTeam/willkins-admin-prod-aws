import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class roleGuardGuard implements CanActivate {
  

  constructor(
    private _sharedService:SharedService,
    private router:Router
  ){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
  
  
 if(this._sharedService.isloggedin ){
 
  return true
 }else{
  this._sharedService.isloggedin=false;
  localStorage.clear();
  this.router.navigate(['/login']);
 return false
 }
  }
};
