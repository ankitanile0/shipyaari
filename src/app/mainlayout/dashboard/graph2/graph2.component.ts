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
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-graph2',
  templateUrl: './graph2.component.html',
  styleUrls: ['./graph2.component.css']
})
export class Graph2Component implements OnInit {

  @Input() Ratio_Graph_Initdate_Ratio: any;
   @Input() Ratio_Graph_Dl_Ratio: any;
    @Input() Ratio_Graph_Rto_Ratio: any;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  
  // Ratio_Graph_Initdate_Ratio:any[]=[];
  // Ratio_Graph_Dl_Ratio: any[]=[];
  // Ratio_Graph_Rto_Ratio: any[]=[];

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    //this.getDashboardData();
    this.Delivery_rto_graph();
  }

  Delivery_rto_graph(){
    if(this.Ratio_Graph_Dl_Ratio == "")
    {
     this.Ratio_Graph_Dl_Ratio = [0]; 
    }
    if(this.Ratio_Graph_Rto_Ratio == "")
    {
      this.Ratio_Graph_Rto_Ratio=[0];
    }
    // if(this.Ratio_Graph_Initdate_Ratio == "")
    // {
    //    this.Ratio_Graph_Initdate_Ratio = [] 
    // }
   // var a = this.Ratio_Graph_Dl_Ratio.map(i=>Number(i));
    //var b = this.Ratio_Graph_Rto_Ratio.map(i=>Number(i));
    //var c = this.Ratio_Graph_Initdate_Ratio.map(i=>Number(i));
    this.chartOptions = {
      series: [
        {
          name: "Delivered",
          data: this.Ratio_Graph_Dl_Ratio
          // [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "RTO",
          data:this.Ratio_Graph_Rto_Ratio
          // [11, 32, 45, 91, 34, 52, 41]
        }
         
      ],
      chart: {
        height: 310,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
         categories: this.Ratio_Graph_Initdate_Ratio
         //[
        //   "2018-09-19T00:00:00.000Z",
        //   "2018-09-19T01:30:00.000Z",
        //   "2018-09-19T02:30:00.000Z",
        //   "2018-09-19T03:30:00.000Z",
        //   "2018-09-19T04:30:00.000Z",
        //   "2018-09-19T05:30:00.000Z",
        //   "2018-09-19T06:30:00.000Z"
        // ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

  }

  public generateData(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
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
  
          
         this.Ratio_Graph_Initdate_Ratio=obj.result.ratio_graph.initdate_ratio ; 
         this.Ratio_Graph_Dl_Ratio=obj.result.ratio_graph.dl_ratio_ratio_graph ; 
         this.Ratio_Graph_Rto_Ratio=obj.result.ratio_graph.rto_ratio_ratio_graph ; 
         this.Delivery_rto_graph();
          
          
          
        
      }
    });
  }

}
