import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from 'src/app/shared/master.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-role-function',
  templateUrl: './role-function.component.html',
  styleUrls: ['./role-function.component.scss']
})
export class RoleFunctionComponent implements OnInit {
  
  displayedColumns: string[] = [
    "id",
    "contact_no",
    "createdAt",
    "full_name",
    "user_email",
    "user_type",
    "updatedAt",
    "action"
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(private _dialog: MatDialog,
  private spinner:NgxSpinnerService,
  private _masterService: MasterService){}
ngOnInit(): void {
  this.getUserRoleList()
}

public getUserRoleList(){
  this.spinner.show()
  this._masterService.getUserRole().subscribe({
    next: (res: any) => {
    
      this.dataSource = new MatTableDataSource(res.getUser.rows);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     this.spinner.hide();
    },
    error: (err: any) => {
      alert('error from server side');
      this.spinner.hide();
    }
  });
}
openAddEditEmpForm() {
  const dialogRef = this._dialog.open(AddRoleComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getUserRoleList();
      }
    },
  });
}

openEditForm(data: any) {
  const dialogRef = this._dialog.open(AddRoleComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getUserRoleList();
      }
    },
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
