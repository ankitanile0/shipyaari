import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import {  Input } from '@angular/core'


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
};

@Component({
  selector: 'app-courier-del-amt',
  templateUrl: './courier-del-amt.component.html',
  styleUrls: ['./courier-del-amt.component.css']
})
export class CourierDelAmtComponent implements OnInit {

   @Input() courier_wise_delivery_first_attempt_graph: any;

Loader: string;
  Delay3days:any;
  DelayRto10days: any;
  Exception_Rto: any;
  Table_All:any;
  Table_Online:any[]=[];
  Table_COD:any[]=[];
  Table_Zone_Wise_Delivery_Day:any[]=[];
  Table_Zone_Wise_Rto_Day:any[]=[];
  Table_Courier_Wise_Pickup_Hours:any[]=[];
  Table_Courier_Wise_Delivery_Days:any[]=[];
  Table_Courier_Wise_Delivery_First_Attempt:any[]=[];
  Table_Delivery_Analysis:any[]=[];
  multi:any[] = [];
  date:any;

 constructor(
    private client:ClientService , 
    private route:ActivatedRoute , 
    private router: Router ,
    private alertService: AlertService,
    private loader:LoaderService
  ) { }


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
 ngOnInit(): void {
  //this.getDashboard_Tracking_Data();
  
  this.prepare_data(this.courier_wise_delivery_first_attempt_graph);
  }



  go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

  getDashboard_Tracking_Data()
  {
    this.Loader = this.loader.show()
    let json:any ={
      date:"",
    

    };
    this.client.dashboard_tracking(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide()
         
        
         this.prepare_data(obj.result.courier_wise_pickup_hours_graph);

      }
      else{
        this.Loader = this.loader.hide()
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
  }


chart12:any;
prepare_data(data)
{ 
  var objArray = [];
for(let j:number = 0; j < data.length; j++)
{
  var comp_name;
var values1 = Object.keys(data).map(function (key) { return data[key]; });
var data1 = values1[j].values;
comp_name = values1[j].name;
var values2 = Object.keys(data1).map(function (key) { return data1[key]; });
var a = Object.values(data1);
a = a.map(i=>Number(i));

 var series = {
   name:comp_name,
   data:a
 }
  
   objArray.push(series);
  

}
 //console.log(objArray)
 this.chart12 = objArray;
   this.chart1();
}

chart1()
{
    this.chartOptions = {
      series: this.chart12,
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      title: {
       
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "0",
          "0-3 days",
          "4-6 days",
          "7-10 days"
        ]
      }
    };
}

}
