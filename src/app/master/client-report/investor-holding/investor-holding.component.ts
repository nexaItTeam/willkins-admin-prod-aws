import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AggregateDescriptor, GroupDescriptor, groupBy } from '@progress/kendo-data-query';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/shared/master.service';

@Component({
  selector: 'app-investor-holding',
  templateUrl: './investor-holding.component.html',
  styleUrls: ['./investor-holding.component.scss']
})
export class InvestorHoldingComponent {
  public dataSource:any
  public aggregates: AggregateDescriptor[] = [
    
    
    { field: "amount_paid", aggregate: "sum" },
  ];
  public groups: GroupDescriptor[] = [{ field: "prop_data.property_name" ,aggregates: this.aggregates},
  { field: "client_data.full_name" ,aggregates: this.aggregates},
  { field: "order_id" ,aggregates: this.aggregates}];
  constructor(private spinner: NgxSpinnerService, 
    private _masterService: MasterService,
    private router: Router,  
  ) {}

  ngOnInit(): void {
    this.getTransactionDetails()

  }
  getTransactionDetails(){
    this.spinner.show()  
    this._masterService.getTransactionData([]).subscribe({
      next: (res: any) => {
        this.dataSource = groupBy(res.get_transaction, this.groups) ;     
        
        this.spinner.hide() 
      },
      error: (err: any) => {
        alert('error from server side');
        this.spinner.hide();
      }
    });
  }
  public groupChange(groups: GroupDescriptor[]): void {
    groups.map((group) => (group.aggregates = this.aggregates));
    this.groups = groups;
    this.getTransactionDetails();
  }
  onFilter(data){

  }
}
