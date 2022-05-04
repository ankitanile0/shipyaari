import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { DateFormatService } from 'src/app/services/date-format.service';
@Component({
  selector: 'app-in-transit',
  templateUrl: './in-transit.component.html',
  styleUrls: ['./in-transit.component.css']
})
export class InTransitComponent implements OnInit {

@Output() intransit_count:EventEmitter<any> = new EventEmitter

  Loader:String;
  a:any;
  Table_Intransit_tab:any[]=[];
  str:any;
  splitted:any;
  Order_status:any;
  transitJson:any = {};
  count:any;
    mydata:any=[];
  dataPaymode:any[] = [
  {
    id:"1",
    name:"cod",
  },
  {
    id:"2",
    name:"online",
  }
  ]; 
  ajaxongoing = false;  
  constructor(
  	private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
    private tostr:ToastrService,
    private datechange:DateFormatService,
  	) { }

  ngOnInit(): void {
  	this.getIntransitData();
    this.get_partnerList();
  }

filter_count:any;
  getIntransitData(page_no=1)
  {
    if(this.ajaxongoing){
        return;
    }
    this.ajaxongoing = true;
    if(page_no == 1){
    this.Table_Intransit_tab = [];
  }
  	this.Loader  = this.loader.show();
    this.transitJson ={
      limit:"20",
      page_no:page_no,
      start_date:this.start_date,
      end_date:this.end_date,
      pick_mobile:"",
      del_mobile:this.del_mobile,
      order_by:"",
      avn_service:"",
      status_code:this.status,
      active_tab:"intransitorders",
      order_id:this.order_id,
      payment_mode:this.paymode,
      courier_id:this.check,
      tracking_no:this.track_no,

    };
    this.client.All_orders(this.transitJson).subscribe((data: any) => {
        this.ajaxongoing = false;
        this.Loader  = this.loader.hide(); 
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == 200) {

        this.count = obj.result.totalintrpages;
           this.Order_status = obj.result.shipyaari_status;
          this.mydata = obj.result.intransitorders;           
         for (var i=0; i <  this.mydata.length; i++){  
             this.str = this.mydata[i].consignment_date;
             this.splitted = this.str.split(" ", 2);           
             var date_value=this.splitted[0];
             var time_value=this.splitted[1];
              this.mydata[i].date_value =  date_value; 
              this.mydata[i].time_value =  time_value;   
         }    

         this.Table_Intransit_tab = this.Table_Intransit_tab.concat(this.mydata); 
         this.filter_count = obj.result.ordercount.totalintransitorder;
         this.intransit_count.emit(this.filter_count);
     
      }else
      {        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

 onScrollIntransiteordr() {   
    if(this.count >= this.transitJson.page_no)
    {
      this.transitJson.page_no++;    
      this.getIntransitData(this.transitJson.page_no);
    }
  }


filter_flag:any = 0;
order_id:any;
del_mobile:any;
paymode:any;
dRange:any;
start_date:any;
end_date:any;
status:any;

payFilter(data)
{
  this.transitJson.page_no = 1;
  this.filter_flag = 1;
  this.paymode = data;
   this.getIntransitData();
}

filter()
{
  this.transitJson.page_no = 1;
	this.filter_flag = 1;
	//for date range
	if(this.dRange != null)
	{		
    var daterange:any; 
      var temp:string = this.dRange;
    daterange = this.datechange.changeDateFormate(temp);     
    this.end_date = daterange[1];
    this.start_date = daterange[0];
    console.log(this.end_date+' '+this.start_date );  
		this.getIntransitData();
	}

	if(this.order_id != null)
	{
		this.getIntransitData();
	}
	if(this.del_mobile != null)
	{
		this.getIntransitData();
	}
	if(this.paymode != null)
	{
    if(this.paymode == "online")
    {
      this.paymode = "online";
      this.getIntransitData();
    }
    else
    {
      this.paymode = "cod";
      this.getIntransitData();
    }
		
	}
	if(this.status != null)
	{
		this.getIntransitData();
	}

   //awb filter
  if(this.check != null)
  {
    this.getIntransitData();
  }
  //track_noif
  if(this.track_no != null)
  {
     this.getIntransitData();
  }
}

reset_filter()
{
	this.track_no = '';
  this.check = null;
  this.filter_flag = 0;
	this.order_id="";
	this.del_mobile="";
	this.paymode="";
	this.start_date="";
	this.end_date="";
	this.dRange=null;
	this.status="";
	this.getIntransitData();
}

filterStatus(name)
{
	this.filter_flag = 1;
	this.status = name;
	this.getIntransitData();
}

cancel_order(id)
{
  this.Loader  = this.loader.show();
  var json = {
     consignment_id:id
  }
  this.client.cancel_Shipment(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.getIntransitData();
         this.Loader  = this.loader.hide();
         this.tostr.success(obj.message);
      }
       else
      {
        this.Loader = this.loader.hide();
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

//awb filter
partnerList:any;
track_no:any;
get_partnerList()
  {
    this.client.get_partner_list().subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.partnerList = obj.result;
         for(let i:number = 0; i < this.partnerList.length; i++)
         {
           this.partnerList[i].checked = false; 
         }
         //console.log(this.partnerList);
      }
       else
      {
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

  check:any[] = [];
  changeSelection()
  {
     for(let i:number = 0; i < this.check.length; i++)
      {
          this.check.pop();
      }
      this.check = [];
     var num:number;
       var a =  this.partnerList.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].user_id;
         this.check.push(num);
       }
       var x =  this.check.filter((value,index) => this.check.indexOf(value) === index)
       this.check = x;
       //console.log(this.check); 
  }



detailsModal:BsModalRef;
datalist:any;
prodlist:any;
detailsmodal(modal, id)
    {

      var json = 
      {
        consignment_id:id,
      }
      this.client.order_details_modal(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.datalist = obj.result.consignmentdetails;
        this.prodlist = obj.result.consignmentdetails.productdata;
      }
       else
      {
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });


       this.detailsModal = this.modalService.show(modal,
       {
         class:"modal-xl",
       }) 
    }

 close_modal()
 {
   this.detailsModal.hide();
 }  


go_to_tracking(id:number)
{
  var url = '/track/'+id;
  window.open(url);
}


}
