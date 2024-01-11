import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from './property/property/property.component';
import { EnquiryComponent } from 'src/app/master/enquiry/enquiry/enquiry.component';
import { AddEditPropertyComponent } from './property/add-edit-property/add-edit-property.component';
import { MaterialModule } from 'src/app/components/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditEnquiryComponent } from './enquiry/add-edit-enquiry/add-edit-enquiry.component';
import { ComponentsModule } from '../components/components.module';
import { AddRoleComponent } from './role-mapping/add-role/add-role.component';
import { RoleFunctionComponent } from './role-mapping/role-function/role-function.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {
  GridModule,
  PDFModule,
  ExcelModule,
} from "@progress/kendo-angular-grid";
import { UploadsModule } from "@progress/kendo-angular-upload";
import { LoaderComponent } from 'src/app/master/loader/loader.component';
import { AppModule } from '../app.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BlogComponent } from './blog/blog.component';

import { CKEditorModule } from 'ckeditor4-angular';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ClientComponent } from './client/client.component';
import { OrderComponent } from './order/order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { ViewClientOrderComponent } from './view-client-order/view-client-order.component';
import { ViewRegisterComponent } from './view-register/view-register.component';
import { DatePipe } from '@angular/common'
import { InvestorComponent } from './client-report/investor/investor.component';
import { InvestorHoldingComponent } from './client-report/investor-holding/investor-holding.component';
import { InvestorTabComponent } from './client-report/investor-tab/investor-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewOrderTscComponent } from './view-order-tsc/view-order-tsc.component';
import { UnitCertificateComponent } from './unit-certificate/unit-certificate.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BlogListComponent } from './blog-list/blog-list.component';
@NgModule({
  declarations: [
    PropertyComponent,
    EnquiryComponent,
    AddEditPropertyComponent,
    AddEditEnquiryComponent,
    AddRoleComponent,
    RoleFunctionComponent,
    LoaderComponent,
    ConfirmationDialogComponent,
    BlogComponent,
    ClientComponent,
    OrderComponent,
    ViewOrderComponent,
    EmailTemplateComponent,
    ViewClientOrderComponent,
    ViewRegisterComponent,
    InvestorComponent,
    InvestorHoldingComponent,
    InvestorTabComponent,
    ViewOrderTscComponent,
    UnitCertificateComponent,
    InvoiceComponent,
    BlogListComponent
  ],
  imports: [
    InputsModule,
    MatTabsModule,
    CommonModule,
    ButtonsModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    UploadsModule,
    NgxSpinnerModule,
    CKEditorModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    PDFModule,
    PDFExportModule
  ],
  providers: [DatePipe]
})
export class MasterModule { }
