import { Component, ElementRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { MasterService } from 'src/app/shared/master.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  company_trustName: any
  public invoiceInfo: any
  public Date: any
  public name: any
  public index: number
  public installmentAmount: number
  public prop_type: string
  public ARSN: string
  public Account_number: any
  constructor(public _commonService: MasterService, public router: Router, private location: Location) {

    this.invoiceInfo = this._commonService.invoiceData
    console.log(this.invoiceInfo)
    this.Date = this.invoiceInfo[0].createdAt
    this.installmentAmount = this.invoiceInfo[0].enq_prop_data?.first_installment_price
    this.index = this.invoiceInfo[0].enq_form_data?.primary_index
    this.prop_type = this.invoiceInfo[0].enq_prop_data.prop_type == 3 ? "Wellkins Mortgage Fund" : "Wellkins Capital Fund"
    this.ARSN = this.invoiceInfo[0].enq_prop_data.prop_type == 3 ? '673 559 576' : '614 577 276'
    this.Account_number = this.invoiceInfo[0].enq_prop_data.prop_type == 3 ? '900113297' : '899882071'
    this.getUserDetail()
  }
  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;



  public email: any
  public contactno: any
  Address: any
  public sub_Address: string
  public getUserDetail() {

    if (this.invoiceInfo[0].enq_form_data.investor_form_type == "Unregulated" || this.invoiceInfo[0].enq_form_data.investor_form_type == "Regulated") {
      this.name = ''
      this.sub_Address = ''
      this.Address = ''
      this.company_trustName = this.invoiceInfo[0].enq_form_data.form_c.trustname
    } if (this.invoiceInfo[0].enq_form_data.investor_form_type == "Individual") {
      if (this.invoiceInfo[0].enq_form_data.form_a.ispersonalprimary == "Y") {
        this.name = this.invoiceInfo[0].enq_form_data.form_a.title + " " + this.invoiceInfo[0].enq_form_data.form_a.givennames + " " + (this.invoiceInfo[0].enq_form_data.form_a.middlename != null ? this.invoiceInfo[0].enq_form_data.form_a.middlename : '') + " " + this.invoiceInfo[0].enq_form_data.form_a.surname

        this.Address = this.invoiceInfo[0].enq_form_data.form_a.house + " " + this.invoiceInfo[0].enq_form_data.form_a.street + " " + this.invoiceInfo[0].enq_form_data.form_a.street_type + ','
        this.sub_Address = this.invoiceInfo[0].enq_form_data.form_a.suburb + ' ' + this.invoiceInfo[0].enq_form_data.form_a.state + " " + this.invoiceInfo[0].enq_form_data.form_a.postcode
        this.company_trustName = ''
      } else {
        this.name = this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].title + " " + this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].givennames + " " + (this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].middlename != null ? this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].middlename : '') + " " + this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].surname

        this.Address = this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].house + " " + this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].street + " " + this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].street_type + ','
        this.sub_Address = this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].suburb + ' ' + this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].state + " " + this.invoiceInfo[0].enq_form_data.form_a.jointInvestor[this.index].postcode
        this.company_trustName = ''
      }
    }
    else if (this.invoiceInfo[0].enq_form_data.investor_form_type == "Company" || this.invoiceInfo[0].enq_form_data.investor_form_type == "Australian public company") {
      // this.name = this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].title + " " + this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].directornames + " " + (this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].middlename != null ? this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].middlename : '') + " " + this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].surname
      this.name = this.invoiceInfo[0].enq_form_data.form_h.companyname
      this.Address = this.invoiceInfo[0].enq_form_data.form_h.house + " " + this.invoiceInfo[0].enq_form_data.form_h.street + " " + this.invoiceInfo[0].enq_form_data.form_h.street_type + ','
      this.sub_Address = this.invoiceInfo[0].enq_form_data.form_h.suburb + ' ' + this.invoiceInfo[0].enq_form_data.form_h.state + " " + this.invoiceInfo[0].enq_form_data.form_h.postcode
      this.company_trustName = ''
    }
    else if (this.invoiceInfo[0].enq_form_data.investor_form_type == "Unregulated Corporate" || this.invoiceInfo[0].enq_form_data.investor_form_type == "Regulated Corporate") {
      // this.name = this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].title + " " + this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].directornames + " " + (this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].middlename != null ? this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].middlename : '') + " " + this.invoiceInfo[0].enq_form_data.form_h.Director[this.index].surname
      this.name = this.invoiceInfo[0].enq_form_data.form_h.companyname + " Trustee For " + this.invoiceInfo[0].enq_form_data.form_c.trustname
      this.Address = ''
      this.sub_Address = ''
      this.company_trustName = ''
    }
  }
  public navigate() {
    this.location.back()
  }
}
