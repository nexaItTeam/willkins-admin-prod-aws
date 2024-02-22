import { Component, OnInit } from '@angular/core';
import { GroupDescriptor, groupBy } from '@progress/kendo-data-query';
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterService } from 'src/app/shared/master.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss']
})
export class InvestorComponent implements OnInit {
  public dataSource: any;
  public groups: GroupDescriptor[];

  constructor(
    private spinner: NgxSpinnerService,
    private _masterService: MasterService
  ) { }

  ngOnInit(): void {
    // Initialize groups
    this.groups = [
      { field: "enq_prop_data.property_name", aggregates: [{ field: "investing_amount", aggregate: "sum" }] },
      { field: "paidStatus", aggregates: [{ field: "investing_amount", aggregate: "sum" }] },
     


    ];

    this.getOrder();
  }

  public getOrder(): void {
    this.spinner.show();
    this._masterService.getOrders([]).subscribe({
      next: (res: any) => {
        this.dataSource = groupBy(res.getOrder, this.groups);
        console.log(this.dataSource);
        this.spinner.hide();
      },
      error: (err: any) => {
        alert('Error from server side');
        this.spinner.hide();
      }
    });
  }

  public groupChange(groups: GroupDescriptor[]): void {
    this.groups = groups;
    this.getOrder();
  }

  //   public calculateCustomSum1(group: any): number {
  //     if (!group || !group.items) {
  //         console.error("Invalid group object:", group);
  //         return 0;
  //     }

  //     let sum = 0;
  //     group.items.forEach(item => {
  //         if (item.holder_type =="self" || item.holder_type == null) {
  //             sum += item.investing_amount;
  //         }
  //     });

  //     console.log("Custom sum for group:", group, "is", sum);
  //     return sum;
  // }
  public calculateCustomSum1(group: any): number {
    if (!group || !group.items) {
      console.error("Invalid group object:", group);
      return 0;
    }

    let sum = 0;

    // Function to recursively calculate sum for items within the group and its child groups
    const calculateSumRecursively = (items: any[]) => {
      items.forEach(item => {
        if (item.holder_type === "self" || item.holder_type === null) {
          const investingAmount = parseFloat(item.investing_amount);
          if (!isNaN(investingAmount)) {
            sum += investingAmount;
          } else {
            console.error("Invalid investing_amount for item:", item);
          }
        }
        if (item.items && item.items.length > 0) {
          calculateSumRecursively(item.items); // Recursively calculate sum for child groups
        }
      });
    };

    calculateSumRecursively(group.items); // Start recursive calculation from the top level of the group

    console.log("Custom sum for group:", group, "is", sum);
    return sum;
  }


  onFilter(event: any) {

  }





}
