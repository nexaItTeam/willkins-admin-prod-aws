import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.css']
})
export class MainShellComponent implements OnInit {
public y :boolean=false
  constructor(public _sharedService:SharedService) { 
this.Authenticate()
  }
      
  ngOnInit() {

     
  }
public Authenticate(){
  this.y = this._sharedService.isloggedin
}
}
