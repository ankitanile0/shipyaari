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
  selector: 'app-pichart2',
  templateUrl: './pichart2.component.html',
  styleUrls: ['./pichart2.component.css']
})
export class Pichart2Component implements OnInit {

    @Input() Exception_Wise_Series: any;
   @Input() Exception_Wise_Label: any;
  
   flag:any =0;


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  // Exception_Wise_Series: any[]=[];
  // Exception_Wise_Label: any[]=[];

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    //this.getDashboardData();
    if(this.Exception_Wise_Series != '')
    {
      this.flag = 1
       this.exception_pie_chart();
    }
  }
  exception_pie_chart(){
    console.log(this.Exception_Wise_Series);
        this.chartOptions = {
      series: this.Exception_Wise_Series,
      // [44],
      labels : this.Exception_Wise_Label,
      chart: {
        width: 335,
        type: "donut",
        animations: {
        enabled: true,
        }
      },
      dataLabels: {
        enabled: true

      },
      fill: {
        type: "gradient"
      },
      legend: { position: 'bottom',show:false },
     /* plotOptions: {
          pie: {
            donut: {
              labels: {
                show: false,
                 
              }
            }
          }
        },*/
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            },
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
  
          
        this.Exception_Wise_Series=obj.result.tracking_pie_chart.exception_wise_series ; 
        this.Exception_Wise_Label=obj.result.tracking_pie_chart.exception_wise_label ; 
        // this.Exception_Wise_Label=["OTP not received", "Customer/Business NA.", "OFD"] ;
        this.exception_pie_chart();
          
          
          
        
      }
    });
  }

}
