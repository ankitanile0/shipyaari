 import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert';
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import {  Input } from '@angular/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { DateFormatService } from 'src/app/services/date-format.service';

interface IRange {
  value: Date[];
  label: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
 @ViewChild('template') template: TemplateRef<HTMLDivElement>;
  paymodal: BsModalRef;

  ranges: IRange[] = [
    // {
    //   value: [new Date(), new Date(new Date().setDate(new Date().getDate() -1))],
    //   label: 'Yesterday'
    // },
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

amount_(id)
{
  var x=id;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}




go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

go_to_ndr(){this.router.navigate(['/ndr/']);}
go_to_rto(){this.router.navigate(['/rto/']);}
go_to_tracking(){this.router.navigate(['/tracking/']);}



form = new FormGroup({
    Drange: new FormControl()
  });
     
  
dashDate:any = '';
to_date:any = '';
from_date:any;
  Loader: string;
  DATERANGE:any = '';
  Drange:any = '';
  selectedDate:any;
  Not_picked:any;
  In_Transit: any;
  Ofd: any;
  Exception: any;
  Deliverd: any;
  Rto: any;
  Orders: any;
  Revenue: any;
  Applicable_Charges: any;
  Cod_Shipped: any;
  Cod_Deliverd: any;
  Cod_Remitted: any;
  Upcoming_Cod: any;
  Cod_Not_Due: any;
  Cod_Rto: any;
  Total_Ndr: any;
  Total_Syp_Action: any;
  Total_Seller_Action: any;
  Total_Ndr_Pending: any;
  Total_Dl_Ratio: any;
  Total_Succ_Ratio: any;
  Create_To_Pick: any;
  Pick_To_Ofd: any;
  Pick_To_Dl: any;
  Pick_To_Rto: any;
  Ex_To_Rto: any;
  Ex_To_Dl: any;
  Table_zone:any[]=[];
  Table_service:any[]=[];
  Table_ratio:any[]=[];

 

  Order_Revenue_Init_Date:any;
  Order_Revenue_Revenue: any;
  Order_Revenue_Cnt: any;

  Ratio_Graph_Initdate_Ratio:any;
  Ratio_Graph_Dl_Ratio:any;
  Ratio_Graph_Rto_Ratio:any;

  Tracking_Pie_Chart:any;
  Service_Wise_Label:any;
  Service_Wise_Count:any;

  Exception_Wise_Series: any;
  Exception_Wise_Label: any;

  Rto_Wise_series: any;
  Rto_Wise_Label: any;


  chart_flag:any = 0;

  constructor(
    private client:ClientService, 
    private loader:LoaderService,
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tostr:ToastrService,
    private modalService: BsModalService,
    private excelService:JsonToExcelService,
    private datechange:DateFormatService,
  ) { 
    this.checkparams();
  }

message:any;
payalert:BsModalRef;

 checkparams(){
    var url = window.location.href.split("?");  
    if(url.length == 2){
    const urlParams = new URLSearchParams(url[1]);
    const payment_status = urlParams.get('payment_status');
    const msg = urlParams.get('msg');
    this.message = msg;
    if(payment_status == "success"){
        setTimeout(() => {
      this.tostr.success(msg); 
      // alert(msg);
        //this.openModal(); 
     })
    } else {
      setTimeout(() => {
      this.tostr.error(msg);  
       })
     // alert(msg); 
    }
   
    }
  }

  openModal() {
   // alert("Modal Open")
    try{
      this.payalert = this.modalService.show(this.template, 
    {
      // animated: true,
      // backdrop: 'static',
      //class:"",
    });
    }
    catch(e)
    {
      alert(e)
    }
    
  }

  close_paymodal()
  {
    this.payalert.hide();
  }

  ngOnInit(): void {
     this.route.params.subscribe( params => {
      if('msg' in params && params['msg'] != ''){
          setTimeout(() => {
                 if(params['msg'].includes('successfully') || params['msg'].includes('Successfully'))
                {
                  this.tostr.success(params['msg']);  
                }else{
                  this.tostr.error(params['msg']); 
                }
          })
      }
  });

     this.route.params.subscribe( params => {
      if('payment_status' in params && params['payment_status'] != ''){
          setTimeout(() => {
                 if(params['payment_status'].includes('successfully') || params['payment_status'].includes('Successfully'))
                {
                  this.tostr.success(params['payment_status']);  
                }else{
                  this.tostr.error(params['payment_status']); 
                }
          })
      }
  });
    this.getDashboardData();
  }

  getDashboardData()
  {
    this.chart_flag = 0
    this.Loader=this.loader.show();
    let json:any ={
      //date:this.selectedDate,
      to_date:this.to_date,
      from_date:this.from_date,
    };
    this.client.dashboard(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader=this.loader.hide();

         this.Order_Revenue_Init_Date=obj.result.order_revenue_shipment_graph.initdate ; 
         this.Order_Revenue_Revenue=obj.result.order_revenue_shipment_graph.revenue ; 
         this.Order_Revenue_Cnt=obj.result.order_revenue_shipment_graph.cnt ;
         this.chart_flag = 1;
         this.form.setValue({
           "Drange":obj.result.datestring,
         })
         this.DATERANGE = obj.result.datestring;
         this.Orders=this.amount_(obj.result.order_info_amt.orders); 
         this.Revenue=this.amount_(obj.result.order_info_amt.revenue ); 
         this.Applicable_Charges=this.amount_(obj.result.order_info_amt.applicable_charges); 

         this.Not_picked=obj.result.today_update.not_picked;
         this.In_Transit=obj.result.today_update.in_transit ;
         this.Ofd=obj.result.today_update.ofd ;
         this.Exception=obj.result.today_update.exception ; 
         this.Deliverd=obj.result.today_update.deliverd ; 
         this.Rto=obj.result.today_update.rto ; 

         
         

        //  this.Ratio_Graph_Initdate_Ratio=obj.result.ratio_graph.initdate_ratio ; 
        //  this.Ratio_Graph_Dl_Ratio=obj.result.ratio_graph.dl_ratio_ratio_graph ; 
        //  this.Ratio_Graph_Rto_Ratio=obj.result.ratio_graph.rto_ratio_ratio_graph ;

        //  this.Tracking_Pie_Chart=obj.result.tracking_pie_chart.service_wise ; 
        // this.Service_Wise_Label=obj.result.tracking_pie_chart.service_wise_label ; 
        // this.Service_Wise_Count=obj.result.tracking_pie_chart.service_wise_count ; 

        //  this.Exception_Wise_Series=obj.result.tracking_pie_chart.exception_wise_series ;
        //  //console.log(this.Exception_Wise_Series) 
        // this.Exception_Wise_Label=obj.result.tracking_pie_chart.exception_wise_label ; 

        // this.Rto_Wise_series=obj.result.tracking_pie_chart.rto_wise_series ; 
        // this.Rto_Wise_Label=obj.result.tracking_pie_chart.rto_wise_label ; 

        
         
        //  this.chart_flag = 1;

        
        
        //  this.Cod_Shipped=obj.result.cod.cod_shipped ; 
        //  this.Cod_Deliverd=obj.result.cod.cod_deliverd ; 
        //  this.Cod_Remitted=obj.result.cod.cod_remitted ; 
        //  this.Upcoming_Cod=obj.result.cod.upcoming_cod ; 
        //  this.Cod_Not_Due=obj.result.cod.cod_not_due ; 
        //  this.Cod_Rto=obj.result.cod.cod_rto ; 
        //  this.Total_Ndr=obj.result.ndr.total_ndr ;
        //  this.Total_Syp_Action=obj.result.ndr.total_syp_action ;
        //  this.Total_Seller_Action=obj.result.ndr.total_seller_action ;
        //  this.Total_Ndr_Pending=obj.result.ndr.total_ndr_pending ;
        //  this.Total_Dl_Ratio=obj.result.ndr.total_dl_ratio ;
        //  this.Total_Succ_Ratio=obj.result.ndr.total_succ_ratio ; 
        //  this.Create_To_Pick=obj.result.orderdetails.create_to_pick.avg_hour ; 
        //  this.Pick_To_Ofd=obj.result.orderdetails.pick_to_ofd.avg_days ; 
        //  this.Pick_To_Dl=obj.result.orderdetails.pick_to_dl.avg_days ; 
        //  this.Pick_To_Rto=obj.result.orderdetails.pick_to_rto.avg_days ; 
        //  this.Ex_To_Rto=obj.result.orderdetails.ex_to_rto.avg_days ; 
        //  this.Ex_To_Dl=obj.result.orderdetails.ex_to_dl.avg_days ; 
        //  this.DATERANGE=obj.result.datestring;
        //  if (obj.result.zone_wise_ratio[0]==undefined){}
        //  else{
        //    this.Table_zone=obj.result.zone_wise_ratio;
        //  }
  
        //  if (obj.result.service_wise_ratio[0]==undefined){}
        //  else{
        //    this.Table_service=obj.result.service_wise_ratio;
        //  }
        //  if (obj.result.ratio[0]==undefined){}
        //  else{
        //    this.Table_ratio=obj.result.ratio;
        //  }

         
          
        
       this.Loader=this.loader.hide();
       
      }
      else{
        this.Loader=this.loader.hide();
      }

      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
  }


onScroll() {
      //console.log('scrolled!!');
     this.get_dash_part();
    
    }
    onScrollDown() {
      //console.log('scrolled down!!');
    }

    onScrollUp() {
      //console.log('scrolled up!!');
    }

    onScroll1(){
      if(this.chart_flag3 != 1)
      {
       this.get_dash_part3();
      }
    }


chart_flag2:any = 0;
chart_flag3:any = 0;
get_dash_part()
{
  if(this.chart_flag2 == 0)
  {
     //this.Loader=this.loader.show();
  let json:any ={
      to_date:this.to_date,
      from_date:this.from_date,
    };
  this.client.dashboard2(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader=this.loader.hide();

         this.Ratio_Graph_Initdate_Ratio=obj.result.ratio_graph.initdate_ratio; 
         this.Ratio_Graph_Dl_Ratio=obj.result.ratio_graph.dl_ratio_ratio_graph; 
         this.Ratio_Graph_Rto_Ratio=obj.result.ratio_graph.rto_ratio_ratio_graph;

        this.Tracking_Pie_Chart=obj.result.tracking_pie_chart.service_wise ; 
        this.Service_Wise_Label=obj.result.tracking_pie_chart.service_wise_label; 
        this.Service_Wise_Count=obj.result.tracking_pie_chart.service_wise_count; 

        if(this.Tracking_Pie_Chart == undefined)
        {
          this.Tracking_Pie_Chart = '';
          this.Service_Wise_Label = '';
          this.Service_Wise_Count = ''; 
        }

        this.Exception_Wise_Series=obj.result.tracking_pie_chart.exception_wise_series; 
        this.Exception_Wise_Label=obj.result.tracking_pie_chart.exception_wise_label; 
        if(this.Exception_Wise_Series == undefined)
        {
          this.Exception_Wise_Series = ''; 
          this.Exception_Wise_Label = ''; 
        }

        this.Rto_Wise_series=obj.result.tracking_pie_chart.rto_wise_series; 
        this.Rto_Wise_Label=obj.result.tracking_pie_chart.rto_wise_label; 
        if(this.Rto_Wise_series == undefined)
        {
          this.Rto_Wise_series = ''; 
          this.Rto_Wise_Label = ''; 
        }

        
         
         this.chart_flag2 = 1;

        
        
         this.Cod_Shipped=obj.result.cod.cod_shipped ; 
         this.Cod_Deliverd=obj.result.cod.cod_deliverd ; 
         this.Cod_Remitted=obj.result.cod.cod_remitted ; 
         this.Upcoming_Cod=obj.result.cod.upcoming_cod ; 
         this.Cod_Not_Due=obj.result.cod.cod_not_due ; 
         this.Cod_Rto=obj.result.cod.cod_rto ; 
         this.Total_Ndr=obj.result.ndr.total_ndr ;
         this.Total_Syp_Action=obj.result.ndr.total_syp_action ;
         this.Total_Seller_Action=obj.result.ndr.total_seller_action ;
         this.Total_Ndr_Pending=obj.result.ndr.total_ndr_pending ;
         this.Total_Dl_Ratio=obj.result.ndr.total_dl_ratio ;
         this.Total_Succ_Ratio=obj.result.ndr.total_succ_ratio ; 
         this.Table_ratio=obj.result.ratio;
         // if (obj.result.zone_wise_ratio[0]==undefined){}
         // else{
         //   this.Table_zone=obj.result.zone_wise_ratio;
         // }
  
         // if (obj.result.service_wise_ratio[0]==undefined){}
         // else{
         //   this.Table_service=obj.result.service_wise_ratio;
         // }
         // if (obj.result.ratio[0]==undefined){}
         // else{
         //   this.Table_ratio=obj.result.ratio;
         // }
        
       this.Loader=this.loader.hide();
       
      }
      else{
        this.Loader=this.loader.hide();
      }

      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });

  }
}

get_dash_part3()
{
  if(this.chart_flag3 == 0 )
  {
     //this.Loader=this.loader.show();
  let json:any ={
      to_date:this.to_date,
      from_date:this.from_date,
    };
  this.client.dashboard3(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader=this.loader.hide();  
        this.chart_flag3 = 1;
         //this.Create_To_Pick=obj.result.orderdetails.create_to_pick.avg_hour ; 
         var data = obj.result.orderdetails.create_to_pick.avg_hour;
         if(this.Create_To_Pick == '0')
         {
           this.Create_To_Pick = 0.00
         }
         else
         {
           var to_pick = parseInt(data);
           //console.log(to_pick);
           this.Create_To_Pick = to_pick.toFixed(2);
         }
         this.Pick_To_Ofd=obj.result.orderdetails.pick_to_ofd.avg_days ; 
         this.Pick_To_Dl=obj.result.orderdetails.pick_to_dl.avg_days ; 
         this.Pick_To_Rto=obj.result.orderdetails.pick_to_rto.avg_days ; 
         this.Ex_To_Rto=obj.result.orderdetails.ex_to_rto.avg_days ; 
         this.Ex_To_Dl=obj.result.orderdetails.ex_to_dl.avg_days ; 
         this.DATERANGE=obj.result.datestring;
         // this.Table_ratio=obj.result.ratio;
         if (obj.result.zone_wise_ratio[0]==undefined){}
         else{
           this.Table_zone=obj.result.zone_wise_ratio;
         }
  
         if (obj.result.service_wise_ratio[0]==undefined){}
         else{
           this.Table_service=obj.result.service_wise_ratio;
         }
            
        
       this.Loader=this.loader.hide();
       
      }
      else{
        this.Loader=this.loader.hide();
      }

      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });

  }
}
 //revenue chart
 showdash()
 {  
    var daterange:any; 
    var temp:any = this.form.get('Drange').value;   
    daterange = this.datechange.changeDateFormate(temp);     
    this.to_date = daterange[1];
    this.from_date = daterange[0];
    console.log(this.to_date+' '+this.from_date );   
    this.getDashboardData();  
 }

flag1:any = 1;

tab1()
{
  this.flag1 = 1
}

tab2()
{
  this.flag1 = 2
}

tab3()
{
  this.flag1 = 3
}
downloadTodaysOrderData(ordrstatus){
  var json =
    {
        type:ordrstatus,
    }
    this.client.dashcountsheet(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        console.log(obj);
        if (obj.status == 200) {        
         this.excelService.exportAsExcelFile(obj.result, ordrstatus); 
        }else
        {
          this.tostr.error(obj.message);
          if(obj.message.includes("authToken"))
            {
              this.router.navigate(['/signin/'+obj.message]);
            }
        }    
      });
}

}
