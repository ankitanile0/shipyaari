import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {  Input } from '@angular/core'

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css']
})

export class Graph1Component {
  
  @Input() Order_Revenue_Init_Date: any;
   @Input() Order_Revenue_Revenue: any;
    @Input() Order_Revenue_Cnt: any;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  // Order_Revenue_Init_Date:any[]=[];
  // Order_Revenue_Revenue: any[]=[];
  // Order_Revenue_Cnt: any[]=[];
new_Order_Revenue_Init_Date:any[] = [];

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
  ) {

   }

  ngOnInit(): void {

    //this.getDashboardData();
    //console.log(this.Order_Revenue_Init_Date);
    var data;
    var pre;
    var post;
    for(let i:number = 0; i < this.Order_Revenue_Init_Date.length; i++)
    {
      data = this.Order_Revenue_Init_Date[i];
      data = data.split(" ");
      pre = data[1];
      post = data[0];
      data = pre+" "+post;
      data = data.toString();
      this.new_Order_Revenue_Init_Date.push(data);
     // console.log(this.new_Order_Revenue_Init_Date);
    }
     this.revenue_chart();
  }



  revenue_chart(){
    if(this.Order_Revenue_Cnt != "")
    {
      var a = this.Order_Revenue_Cnt.map(i=>Number(i));
    }
    else
    {
      var a = this.Order_Revenue_Cnt;
    }
    if(this.Order_Revenue_Revenue != "")
    {
      var b = this.Order_Revenue_Revenue.map(i=>Number(i));
    }
    else
    {
      var b = this.Order_Revenue_Revenue;
    }
    
   // console.log("chart",b);
    this.chartOptions = {
      series: [
        {
          name: "No. Of Shipment",
          data:  a
          // data:[65, 75, 85, 95 , 100, 110, 105, 90, 80, 70, 60, 50]
        },
        {
          name: "Revenue",
          data:  b
          // data: [50, 60, 70, 80, 90, 105, 110, 100, 95, 85, 75, 65]
        },
        
      ],
      chart: {
        type: "bar",
        height: 230
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          //endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 10,
        colors: ["transparent"]
      },
      xaxis: {
         categories: 
         this.new_Order_Revenue_Init_Date
        //  [
        
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        //   "Nov",
        //   "Dec"
        // ]
      },
      
      yaxis: {
       
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "Rs " + val + " thousands";
          }
        }
      }
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
  
          
        // this.Order_Revenue_Init_Date=obj.result.order_revenue_shipment_graph.initdate ; 
        //  this.Order_Revenue_Revenue=obj.result.order_revenue_shipment_graph.revenue ; 
        //  this.Order_Revenue_Cnt=obj.result.order_revenue_shipment_graph.cnt ; 
        this.revenue_chart();
          
          
          
        
      }
    });
  }


}
