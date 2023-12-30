import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from "@progress/kendo-angular-menu";
import { MaterialModule } from 'src/app/components/material.module';
import { MasterModule } from './master/master.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { PDFModule } from '@progress/kendo-angular-grid';

@NgModule({ 
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    MenuModule,
    BrowserAnimationsModule,
    MaterialModule,
    MasterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    PDFModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

