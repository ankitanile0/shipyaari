import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import {  Input } from '@angular/core';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { DateFormatService } from 'src/app/services/date-format.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

interface IRange {
  value: Date[];
  label: string;
}

@Component({
  selector: 'app-rto',
  templateUrl: './rto.component.html',
  styleUrls: ['./rto.component.css']
})
export class RtoComponent implements OnInit {
 
 @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

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

Loader:String;
Cnt:any;
  Rto_It: any;
  Rto_Dl:any;
  Rto_Ex: any;
  Rto_Init:any;
  Avg_Rto_Day: any;
  Revenu: any;
  Tot_Rto: any;
  Table_Top_20_RTO_Pincode:any[]=[];
  Table_Reasonwise_Split:any[]=[];
multi:any[] = [];
  Graphdata:any;
date:any;
value:any;
list1:any[] =[]; 
DATERANGE:any;

form = new FormGroup({
    Drange: new FormControl()
  });


  constructor(
    private client:ClientService , 
    private route:ActivatedRoute , 
    private router: Router ,
    private alertService: AlertService,
    private loader:LoaderService,
    private tostr:ToastrService,
    private excelService:JsonToExcelService,
    private datechange:DateFormatService
  ) {
   
   }

  ngOnInit(): void {
    this.getDashboard_RtoData();
  }

go_to_home()
{
  this.router.navigate(['/dashboard/']);
}
go_to_ndr(){this.router.navigate(['/ndr/']);}
go_to_rto(){this.router.navigate(['/rto/']);}
go_to_tracking(){this.router.navigate(['/tracking/']);}

  getDashboard_RtoData()
  {
    this.Loader = this.loader.show();
    let json:any ={
      to_date:this.to_date,
      from_date:this.from_date,

    };
    this.client.dashboard_rto(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide();

         this.DATERANGE=obj.result.datestring;
       
          this.form.patchValue({
           "Drange":obj.result.datestring
         })

         this.Rto_It=obj.result.tile_info_rto.all.rto_it;
         this.Rto_Dl=obj.result.tile_info_rto.all.rto_dl ;
         this.Rto_Ex=obj.result.tile_info_rto.all.rto_ex;
         this.Rto_Init=obj.result.tile_info_rto.all.rto_init ;

         this.Avg_Rto_Day=obj.result.tile_info_rto.all.avg_rto_day;
         this.Revenu=obj.result.tile_info_rto.all.revenu ;
         this.Tot_Rto=obj.result.tile_info_rto.tot_rto_pencentage.tot_rto;
         this.Table_Top_20_RTO_Pincode=obj.result.table_info_rto.to20pincode;
         this.Table_Reasonwise_Split=obj.result.table_info_rto.reson_wise_shipment;
         this.show_pin(this.Table_Top_20_RTO_Pincode);
       

         this.date = obj.result.table_info_rto.ratio_graph;
         //console.log(this.date);
          var a = []; 
          var b = [];
          for(let i:number = 0; i < this.date.length; i++)
          {
            //console.log(i)
              a.push(this.date[i].name);
              b.push(this.date[i].value);
          }
          this.datedata = a;
          b = b.map(i=>Number(i));
          this.count = b;
         // console.log(a)
         // console.log(b)
           
         this.chart_flag = 1;
         this.chart1();
      }
      else{
        this.Loader = this.loader.hide();
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
  }







to_date:any;
 from_date:any;
 count:any;
 datedata:any;
  showdash()
 {   
    var daterange:any; 
    var temp:any = this.form.get('Drange').value;   
    daterange = this.datechange.changeDateFormate(temp);     
    this.to_date = daterange[1];
    this.from_date = daterange[0];
    console.log(this.to_date+' '+this.from_date );  
    this.getDashboard_RtoData();  
 }

chart_flag:any = 0;
chart1()
{
 
  this.chartOptions = {
      series: [
        {
          name: "Rto ratio in %",
          data: 
          //[0] 
           this.count
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
     
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.datedata 
        // this.datedata,
        // [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep"
        // ]
      }
    };
}

data_limit:any;
show_pin(data)
{
  var pin:any;
  for(let i:number = 0; i < data.length; i++)
  {
    pin = data[i].delivery_pincode.split(",");
    this.data_limit = pin.length;
    var limit:any=[];
     for(let j:number = 0; j < 5; j++)
     {
        limit.push(pin[j]);   
     }
    this.Table_Top_20_RTO_Pincode[i].pindata = limit;
    this.Table_Top_20_RTO_Pincode[i].pincodes = pin;
    console.log(this.Table_Top_20_RTO_Pincode);
  }
}


download_sheet(reportdata)
{
  var json:any =
  {
    type:reportdata,
    to_date:this.to_date,
    from_date:this.from_date,
  }
  this.client.rto_dash_count(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.excelService.exportAsExcelFile(obj.result, reportdata); 
      }
      else{
        //this.Loader = this.loader.hide();
        this.tostr.error(obj.message);
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
}


}
