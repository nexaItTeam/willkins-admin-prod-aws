import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/components/material.module';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainShellComponent } from './layout/main-shell/main-shell.component';
import { SideNavbarComponent } from './layout/side-navbar/side-navbar.component';





@NgModule({
  declarations: [
   
    SidebarComponent,
     HeaderComponent, 
     FooterComponent,
     MainShellComponent,
  
     SideNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [SideNavbarComponent , SidebarComponent,
    HeaderComponent, 
    FooterComponent,
    MainShellComponent,],
})
export class ComponentsModule { }
