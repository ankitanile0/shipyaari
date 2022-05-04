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
  selector: 'app-pichart3',
  templateUrl: './pichart3.component.html',
  styleUrls: ['./pichart3.component.css']
})
export class Pichart3Component implements OnInit {

   @Input() Rto_Wise_series: any;
   @Input() Rto_Wise_Label: any;
  
     flag:any =0;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  


  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
   
    if(this.Rto_Wise_series != '')
    {
      this.flag = 1
       this.rto_pie_chart();
    }
   // this. rto_pie_chart();
  }

  rto_pie_chart(){
     
    this.chartOptions = {
      series: this.Rto_Wise_series,
      //[44],
      labels :  this.Rto_Wise_Label,
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
   
           
        this.Rto_Wise_series=obj.result.tracking_pie_chart.rto_wise_series ; 
        this.Rto_Wise_Label=obj.result.tracking_pie_chart.rto_wise_label ; 
        this.rto_pie_chart();
           
           
           
         
       }
     });
   }   


}
