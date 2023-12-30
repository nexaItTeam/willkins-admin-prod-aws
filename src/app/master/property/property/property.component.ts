
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/shared/master.service';
import { AddEditPropertyComponent } from '../add-edit-property/add-edit-property.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import{stateList,propertTypeList} from 'src/app/master/option-list'
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  public propertTypeList=propertTypeList
  public stateList=stateList
  displayedColumns: string[] = [
    "id",
    "property_name",
    "property_address",
    "price_per_share",
    "first_installment_price",
    "returns",
    "LVR",
    "term",
    "facility",
    "prop_type",
    "state",
    "createdAt",
    "updatedAt",
    "desc",
    "status",
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
    this.getPropertyList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditPropertyComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPropertyList();
        }
      },
    });
  }

  getPropertyList() {
    this.spinner.show();
    this._masterService.getPropertyList().subscribe({
      next: (res: any) => {
      
        this.dataSource = new MatTableDataSource(res.getAll.rows);
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

    deleteProperty(id: any) {

     
      const data={
        title:"Delete Property",
        subtitle:'Are you sure you want to delete property id'  + id.id +'?',
      }
      const dialogRef = this._dialog.open(ConfirmationDialogComponent,{
        width:'50%',
        data:data ?data :null
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.spinner.show();
            this._masterService.deletePropertyList(id).subscribe({
              next: (res) => {
                alert('Propert deleted!');
                this.getPropertyList();
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

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditPropertyComponent, {
      data,
      height: '450px'
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPropertyList();
        }
      },
    });
  }
}
