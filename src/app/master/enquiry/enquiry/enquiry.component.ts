import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/shared/master.service';
import { AddEditEnquiryComponent } from 'src/app/master/enquiry/add-edit-enquiry/add-edit-enquiry.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent {
  displayedColumns: string[] = [
    "select",
    // "id",
    "full_name",
    "user_email",
    "contact_no",
    "invest",
    "location",
    "description",
    "property_id",
    // "status",
    "createdAt",
    "updatedAt",
    "isActiveEnq",
    "action",
    
  ];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    public spinner:NgxSpinnerService,
    private _masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.getEnquiryList();
  }

  openAddEditEmpForm() {
    
  }

  getEnquiryList() {
    this.spinner.show()
    this._masterService.getEnquiryList().subscribe({
      next: (res: any) => {
      
        this.dataSource = new MatTableDataSource(res.getAllEnquery.rows);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.spinner.hide()
      },
      error: (err: any) => {
        alert('error from server side');
        this.spinner.hide();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditEnquiryComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEnquiryList();
        }
      },
    });
  }


  deleteEnquiry(id: any) {

     
    const data={
      title:"Delete Enquiry",
      subtitle:'Are you sure you want to delete Enquiry id'  + id +'?',
    }
    const dialogRef = this._dialog.open(ConfirmationDialogComponent,{
      width:'50%',
      data:data ?data :null
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.spinner.show();
          var body ={
            id:id
          }
          this._masterService.deleteEnquiryList(body).subscribe({
            next: (res) => {
              alert('Enquiry deleted!');
              this.getEnquiryList();
              this.spinner.hide();
            },
            error: (err: any) => {
             alert('error from server side');
             this.spinner.hide();
           }
          });
        }
      },
    });
   
 } 
 activateClient(Clientdata:any){
 
  const data={
    title:"Activate Enquiry",
    subtitle:'Are you sure you want to activate client '  +Clientdata.full_name  +'?',
  }
  const dialogRef = this._dialog.open(ConfirmationDialogComponent,{
    width:'50%',
    data:data ?data :null
  });
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.spinner.show();
       
 var body= 
 {
  "client": {
    "full_name": Clientdata.full_name    ,
    "password":Math.random().toString(36).slice(-8),
    "client_email":Clientdata.user_email,
    "contact_no":Clientdata.contact_no,
    "active":0
 }
 }
    this._masterService
           .activateClient(body)
          .subscribe({
             next: (val: any) => {
               alert('Client Activated');
               this.spinner.hide()
               this.updateactiveStatus(Clientdata)
             },
             error: (err: any) => {
              alert(err.error.message);
              this.spinner.hide()
             },
           });
}
 },
})
}

updateactiveStatus(data){
  var body={
    "enquery": {
      "id":data.id,
     "isActiveEnq":true
   }
}
     this._masterService
       .updateEnquiryList(body)
      .subscribe({
         next: (val: any) => {
          
           this.spinner.hide()
          this.getEnquiryList()
         },
         error: (err: any) => {
          console.error(err);
         },
       });
}
}

