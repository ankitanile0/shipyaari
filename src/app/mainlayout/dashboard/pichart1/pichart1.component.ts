import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {  Input } from '@angular/core'

import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-pichart1',
  templateUrl: './pichart1.component.html',
  styleUrls: ['./pichart1.component.css']
})
export class Pichart1Component implements OnInit {

   @Input() Tracking_Pie_Chart: any;
   @Input() Service_Wise_Label: any;
    @Input() Service_Wise_Count: any;

       flag:any =0;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  // Tracking_Pie_Chart:any[]=[];
  // Service_Wise_Label:any[]=[];
  // Service_Wise_Count:any[]=[];

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {

     if(this.Tracking_Pie_Chart != '')
    {
      this.flag = 1
       this.get_pichart();
    }
    
   // this.get_pichart();
  }

  tracking_pie_chart(){
    var a = this.Tracking_Pie_Chart.map(i=>Number(i));
    //var b = this.Service_Wise_Label.map(i=>Number(i));
    console.log("a",a);
    console.log("b",this.Service_Wise_Label);
    this.chartOptions = {
      series:  a,
      //[44, 55, 41, 17,18, 15],
      labels :  this.Service_Wise_Label,
      // ['Not Pickup','Delivered','OFD','Exception','In transit','RTO'],
      chart: {
        width: 450,
        type: "donut",
        animations: {
        enabled: false,
        }
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }

  get_pichart()
  {
      var a = this.Tracking_Pie_Chart.map(i=>Number(i));
      console.log(a);
    this.chartOptions = {
      series:a,
      labels:this.Service_Wise_Label,
      chart: {
        width: 400,
        type: "donut"
      },
      dataLabels: {
        enabled: true
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  
  getDashboardData()
  {
    let json:any ={
      date:"",
    

    };
    this.client.dashboard(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
  
        this.Tracking_Pie_Chart=obj.result.tracking_pie_chart.service_wise ; 
        this.Service_Wise_Label=obj.result.tracking_pie_chart.service_wise_label ; 
        this.Service_Wise_Count=obj.result.tracking_pie_chart.service_wise_count ; 
        this.tracking_pie_chart()
         
      }
    });
  }

}
