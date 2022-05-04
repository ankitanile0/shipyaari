import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AlertService } from './alert/alert.service'
import { ToastrService } from './_toastr/toastr/toastr.service'
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { MainlayoutModule } from './mainlayout/mainlayout.module';
import { ClientService } from './services/client.service';
import { JsonToExcelService } from './services/json-to-excel.service';
import { DaterangeService } from './services/daterange.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LoaderService } from './services/loader.service';
import { AuthGuardService } from './guard/auth-guard.service';
import { TokenexpireService } from './services/tokenexpire.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ConfService } from './mainlayout/help/feedback/conf.service';
import { DateFormatService } from './services/date-format.service';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    MainlayoutModule,
    HttpClientModule,
    HttpModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgApexchartsModule,
    NgSelectModule,
    UiSwitchModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    CKEditorModule,
    AngularEditorModule,
    NgxChartsModule,
    InfiniteScrollModule

   
   
  ],
  providers: [
    ClientService, 
    AlertService, 
    LoaderService,
    AuthGuardService,
    TokenexpireService,
    ToastrService,
    DaterangeService,
    JsonToExcelService,
    ConfService,
    DateFormatService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
