import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/shared/master.service';

import { NgxSpinnerService } from 'ngx-spinner';

import{stateList,propertTypeList} from 'src/app/master/option-list'
import { Router } from '@angular/router';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  public propertTypeList=propertTypeList
  public stateList=stateList
  displayedColumns: string[] = [
    "id",
    "blog_title",
    "blog_desc",
    "blog_body",
    "createdAt",
    "updatedAt",
    "action"
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    public spinner:NgxSpinnerService,
    private _masterService: MasterService,
    private route:Router
  ) { }
  ngOnInit(): void {
    this.getBlogList();
  }
  getBlogList() {
    this.spinner.show();
    this._masterService.getBlogData().subscribe({
      next: (res: any) => {
      
        this.dataSource = new MatTableDataSource(res.getAllBlog.rows);
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
  openBlog(row){
    this._masterService.blogData = row
this.route.navigate(['/blog'])
  }
  deleteBlog(row){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
