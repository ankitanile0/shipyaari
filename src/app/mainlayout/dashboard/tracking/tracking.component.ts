import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { DateFormatService } from 'src/app/services/date-format.service';
interface IRange {
  value: Date[];
  label: string;
}

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  legend: ApexLegend;

  from_date:any;
  to_date:any
};

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  ranges: IRange[] = [
    {
      value: [new Date(), new Date(new Date().setDate(new Date().getDate() - 1))],
      label: 'Yesterday'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
      label: 'Last 7 Days'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
      label: 'Last 30 Days'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 90)), new Date()],
      label: 'Last 90 Days'
    },

  ];

  Loader: string;
  Delay3days: any;
  DelayRto10days: any;
  Exception_Rto: any;
  Table_All: any;
  Table_Online: any[] = [];
  Table_COD: any[] = [];
  Table_Zone_Wise_Delivery_Day: any[] = [];
  Table_Zone_Wise_Rto_Day: any[] = [];
  Table_Courier_Wise_Pickup_Hours: any[] = [];
  Table_Courier_Wise_Delivery_Days: any[] = [];
  Table_Courier_Wise_Delivery_First_Attempt: any[] = [];
  Table_Delivery_Analysis: any[] = [];
  multi: any[] = [];
  date: any;
  DATERANGE: any;

  delivery_analysis_graph: any[] = [];
  courier_wise_delivery_days_graph: any;
  courier_wise_delivery_first_attempt_graph: any;
  courier_wise_pickup_hours_graph: any;

  chart_flag: any = 0;

  form = new FormGroup({
    date_range: new FormControl()
  });

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private client: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private loader: LoaderService,
    private tostr:ToastrService,
    private excelService: JsonToExcelService,
     private datechange:DateFormatService
  ) { }

  ngOnInit(): void {
    this.getDashboard_Tracking_Data();
  }

  go_to_home() {
    this.router.navigate(['/dashboard/']);
  }

  go_to_ndr() { this.router.navigate(['/ndr/']); }
  go_to_rto() { this.router.navigate(['/rto/']); }
  go_to_tracking() { this.router.navigate(['/tracking/']); }



  getDashboard_Tracking_Data() {
    this.Loader = this.loader.show()
    let json: any = {
      to_date: this.to_date,
      from_date: this.from_date,
    };
    this.client.dashboard_tracking1(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide()
        this.DATERANGE = obj.result.datestring;
        this.form.setValue({
          "date_range": obj.result.datestring,
        });
        this.Delay3days = obj.result.tracking_tiles.delay3days.cnt;
        this.DelayRto10days = obj.result.tracking_tiles.delayrto10days.cnt;
        this.Exception_Rto = obj.result.tracking_tiles.exception_rto.cnt;
        this.Table_All = obj.result.all;
        this.Table_Online = obj.result.online;
        this.Table_COD = obj.result.cod;
        this.Table_Zone_Wise_Delivery_Day = obj.result.zone_wise_delivery_day;
        this.Table_Zone_Wise_Rto_Day = obj.result.zone_wise_rto_day;
      }
      else {
        this.Loader = this.loader.hide()
      }
      if (obj.message.includes("authToken")) {
        this.router.navigate(['/signin/' + obj.message]);
      }
    });
  }

  onScroll() {
    //console.log('scrolled!!');
    this.Tracking_Data1();
  }
  onScrollDown() {
    //console.log('scrolled down!!');
  }

  onScrollUp() {
    //console.log('scrolled up!!');
  }

  Tracking_Data1() {
    //this.Loader = this.loader.show()
    let json: any = {
      to_date: this.to_date,
      from_date: this.from_date,
    };
    this.client.dashboard_tracking2(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide()
        this.courier_wise_delivery_days_graph = obj.result.courier_wise_delivery_days_graph;
        this.Table_Courier_Wise_Delivery_Days = obj.result.courier_wise_delivery_days;
        this.Table_Courier_Wise_Pickup_Hours = obj.result.courier_wise_pickup_hours;
        this.courier_wise_pickup_hours_graph = obj.result.courier_wise_pickup_hours_graph;
        this.chart_flag = 1;
      }
      else {
        this.Loader = this.loader.hide()
      }
      if (obj.message.includes("authToken")) {
        this.router.navigate(['/signin/' + obj.message]);
      }
    });
  }

  onScroll1() {
    //console.log('scrolled!!');
    this.Tracking_Data2();

  }

  chart_flag1: any = 0
  Tracking_Data2() {
    //this.Loader = this.loader.show()
    let json: any = {
      to_date: this.to_date,
      from_date: this.from_date,
    };
    this.client.dashboard_tracking3(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide()

        // this.courier_wise_delivery_days_graph = obj.result.courier_wise_delivery_days_graph;
        // this.Table_Courier_Wise_Delivery_Days=obj.result.courier_wise_delivery_days;
        // this.Table_Courier_Wise_Pickup_Hours=obj.result.courier_wise_pickup_hours;
        // this.courier_wise_pickup_hours_graph=obj.result.courier_wise_pickup_hours_graph;

        this.Table_Courier_Wise_Delivery_First_Attempt = obj.result.Courier_wise_delivery_first_attempt;
        this.Table_Delivery_Analysis = obj.result.Delivery_Analysis;
        this.delivery_analysis_graph = obj.result.delivery_analysis_graph;
        this.courier_wise_delivery_first_attempt_graph = obj.result.courier_wise_delivery_first_attempt_graph;

        this.chart_flag1 = 1;
      }
      else {
        this.Loader = this.loader.hide()
      }
      if (obj.message.includes("authToken")) {
        this.router.navigate(['/signin/' + obj.message]);
      }
    });
  }


  to_date: any;
  from_date: any;
  showdash() {
    var daterange:any; 
    var temp:any = this.form.get('Drange').value;   
    daterange = this.datechange.changeDateFormate(temp);     
    this.to_date = daterange[1];
    this.from_date = daterange[0];
    console.log(this.to_date+' '+this.from_date );
    this.getDashboard_Tracking_Data();
  }


  downloadTrackingDashboard(ordrstatus){

    var json =
    {

      type:ordrstatus,

 
    }


    this.client.tracking_dashboard(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {
         this.excelService.exportAsExcelFile(obj.result, ordrstatus); 
      } else {
        this.tostr.error(obj.message);
        if (obj.message.includes("authToken")) {
          this.router.navigate(['/signin/' + obj.message]);
        }
      }
    });
  }

}






