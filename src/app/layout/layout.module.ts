import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert';
import { ToastrModule } from '../_toastr/toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SigninComponent } from '../mainlayout/signin/signin.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from "ng-apexcharts";
import { UiSwitchModule } from 'ngx-ui-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PassbookComponent } from './header/passbook/passbook.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
    imports: [
          LayoutRoutingModule,
          FormsModule,
          ReactiveFormsModule,
          AlertModule,
          CommonModule,
          ToastrModule,
          TooltipModule.forRoot(),
          NgSelectModule,
          BsDatepickerModule.forRoot(),
          ProgressbarModule.forRoot(),
          NgCircleProgressModule.forRoot({})
    ],
    declarations: [
        LayoutComponent,
        SigninComponent,
        FooterComponent,
        HeaderComponent,
        SidebarComponent,
        PassbookComponent
    ],
    
    providers: [  ] 

   
})
export class LayoutModule {}
