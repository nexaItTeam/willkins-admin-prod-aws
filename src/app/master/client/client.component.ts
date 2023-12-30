import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataBindingDirective, PageChangeEvent, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/shared/master.service';
import { State, filterBy, process } from "@progress/kendo-data-query";
import { EmailTemplateComponent } from '../email-template/email-template.component';
import { AddEditEnquiryComponent } from '../enquiry/add-edit-enquiry/add-edit-enquiry.component';
import { OrderComponent } from '../order/order.component';
import { ViewClientOrderComponent } from '../view-client-order/view-client-order.component';
import {
  SVGIcon,
  facebookIcon,
  pinterestIcon,
  twitterIcon,
  cancelIcon,
  shareIcon,
  eyeIcon,
  fontGrowIcon,
  formIcon,
  paddingIcon,
  groupBoxIcon,
  bookIcon,
  clipboardTextIcon,
} from "@progress/kendo-svg-icons";
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  /* displayedColumns: string[] = [
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
    this.getClientList();
  }

  getClientList() {
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
  } */
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
    public client_email:any
    public skip = 0;
    public selectAllState: SelectAllCheckboxState = "unchecked";
constructor(private spinner:NgxSpinnerService,private _masterService: MasterService,private _dialog: MatDialog,){

}
    public mySelection: string[] = [];
  public gridView:any
  public gridData:any;
    public ngOnInit(): void {
      this.getclientList()
      
    }

    public onSelectedKeysChange(): void {
      const len = this.mySelection.length;
  
      if (len === 0) {
        this.selectAllState = "unchecked";
      } else if (len > 0 && len < this.items.length) {
        this.selectAllState = "indeterminate";
      } else {
        this.selectAllState = "checked";
      }
    }
    public onSelectAllChange(checkedState: SelectAllCheckboxState): void {
      if (checkedState === "checked") {
        this.mySelection = this.items.map((item) => item.ProductID);
        this.selectAllState = "checked";
      } else {
        this.mySelection = [];
        this.selectAllState = "unchecked";
      }
    }
  
    public pageChange(event: PageChangeEvent): void {
      this.skip = event.skip;
      this.loadItems();
    }
  
    private loadItems(): void {
      this.gridView = {
        data: this.items?.slice(this.skip, this.skip + 10),
        total: this.items.length,
      };
    }
    public onFilter(value: Event): void {
        const inputValue = value;

        this.gridView = filterBy(this.gridData,{
          logic: 'or',
          filters: [
                { field: "full_name", operator: "contains", value: value, ignoreCase: true },
                { field: "client_email", operator: "contains", value:  value,ignoreCase: true},
                { field: "contact_no", operator: "contains", value:  value,ignoreCase: true},
                { field: "active", operator: "contains", value:  value,ignoreCase: true},
          ]}) 

       
    }
    public items:any
//get client list
   public async getclientList(){
    
      this.spinner.show()
     let body={
      "active": [
          0,
          1
      ]
  }
 
   await  this._masterService.getactiveclientList(body).subscribe({
      next: (res: any) => {
      
       this.gridData = res.getClient.rows
       this.gridView=this.gridData
       this.items=res.getClient.rows
       this.spinner.hide();
      },
      error: (err: any) => {
        alert('error from server side');
        this.spinner.hide();
      }
    });
   }
   selectedKeysChange(rows: any) {
   
   let userEmail ={}
    console.log(rows);
   
    this.client_email =[]
    for(var i = 0; i < rows.length; i++){
      this.client_email.push({"user_email":rows[i]}) ;
  }
   
   
  }
  //will open send email dialog
  openEmailDialog(){
    const dialogRef = this._dialog.open(EmailTemplateComponent,{
     
      data:this.client_email
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
       
        }
      },
    });
  }
  //
  onCreateBrokerClick(){
    const dialogRef = this._dialog.open(AddEditEnquiryComponent,{
     
      data:'Broker'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        
        }
      },
    });
  }
  onfullnameClick(rowdata,index){
   if(index == 0){
    const dialogRef = this._dialog.open(ViewClientOrderComponent,{
     
      data:rowdata
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        
        }
      },
    });
  }else{

  }
  }
  public dialOpen = false;

  public socialItems: Array<any> = [
    { svgIcon: clipboardTextIcon ,label: "Preview Investments" },
    { svgIcon: bookIcon ,label: "Preview Register" },
   
  ];

  public get svgIcon(): SVGIcon {
    return this.dialOpen ? cancelIcon : shareIcon;
  }

  public onDialOpen(): void {
    this.dialOpen = true;
  }

  public onDialClose(): void {
    this.dialOpen = false;
  }
}
