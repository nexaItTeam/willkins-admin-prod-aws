import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AggregateDescriptor, GroupDescriptor, groupBy } from '@progress/kendo-data-query';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/shared/master.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss']
})
export class InvestorComponent implements OnInit{
 public dataSource:any
 
 public aggregates: AggregateDescriptor[] = [
  { field: "investing_amount", aggregate: "sum" },
];
public groups: GroupDescriptor[] = [{ field: "enq_prop_data.property_name" ,aggregates: this.aggregates}];
  constructor(private spinner: NgxSpinnerService, 
    private _masterService: MasterService,
    private router: Router,  
  ) {}

  ngOnInit(): void {
    this.getOrder()

  }

  public getOrder() {
    this.spinner.show()  
    this._masterService.getOrders([]).subscribe({
      next: (res: any) => {
        this.dataSource = groupBy(res.getOrder, this.groups) ;     
        console.log(this.dataSource)
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
    this.getOrder();
  }
  onFilter(data){

  }
}
