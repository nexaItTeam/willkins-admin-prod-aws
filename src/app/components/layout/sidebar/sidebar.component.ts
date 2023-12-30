 
import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service'
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  mobileQuery: any
  public userName!:string |any
  public userRole!:string |any
  constructor(public _sharedService:SharedService,
    private router:Router){
   
  }
  ngOnInit() {

   this.userName=this._sharedService.getDispalyNameValue();
   this.userRole=this._sharedService.getRoleValue();
   }
   public onLogOutClick(){
    localStorage.clear();
    window.location.reload();

   }
}
