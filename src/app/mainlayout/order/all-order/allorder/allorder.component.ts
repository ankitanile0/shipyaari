import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { DaterangeService } from 'src/app/services/daterange.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { DateFormatService } from 'src/app/services/date-format.service';


@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.css']
})
export class AllorderComponent implements OnInit {

@Output() All_order_count:EventEmitter<any> = new EventEmitter

  
filter_count:any;

  Loader:String;
  datetime:any;
  Table_All_order_tab:any[]=[];
   avn_shipping_id:any="";
  customer_contact_no:any="";
  date:any="";
  paymentmode:any="";
  status_name:any="";
  client_consignment_id:any="";
  p:any
  Order_status:any;
  mydata:any=[];
  str:any;
  splitted:any;

  partnerList:any;
  filter_partner_id:any;

  status_list:any;

  allorderJson:any={};
  count:any;
    ajaxongoing = false;
  constructor(
  	private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
    private datedata:DaterangeService,
    private tostr:ToastrService,
    private datechange:DateFormatService,
  	) { this.getAllorderdataData();}

  ngOnInit(): void {
      this.route.params.subscribe( params => {
      if('msg' in params && params['msg'] != ''){
          setTimeout(() => {
            if(params['msg'].includes('successfully') || params['msg'].includes('Successfully') )
            {
              this.tostr.success(params['msg']);  
            }else{
              this.tostr.error(params['msg']); 
            }
          })
      }
  } );

  	this.getAllorderdataData();
    this.get_partnerList();
    this.get_status();
  }


getAllorderdataData(page_no=1)
{
  this.Loader = this.loader.show();
  if(this.ajaxongoing){
    return;
  }
  this.ajaxongoing = true;
  if(page_no == 1){
    this.Table_All_order_tab = [];
  }

    this.allorderJson = {
      limit:"20",
      page_no:page_no,
      //date:"",
      order_by:"",
      active_tab:"allorders",
      status_code:this.check2,
      order_id:this.orderId,
      del_mobile:this.del_number,
      payment_mode:this.paymode,
      Client_id:"",
      manifast_id:"",
      start_date:this.start_date,
      end_date:this.end_date,
      courier_id:this.check,
      tracking_no:this.track_no
    }
      this.client.All_orders(this.allorderJson).subscribe((data: any) => {
         this.ajaxongoing = false;
        var response = data._body;
        var obj = JSON.parse(response);
         this.Loader = this.loader.hide();
        if (obj.status == 200) {
          this.count = obj.result.totalallodrpages;      
          this.Order_status = obj.result.shipyaari_status;
          this.datetime=obj.result.allorders.consignment_date;
          this.mydata = obj.result.allorders;
          for (var i=0; i < this.mydata.length; i++){  
            this.str =this.mydata[i].consignment_date;
            this.splitted = this.str.split(" ", 2);           
            var date_value=this.splitted[0];
            var time_value=this.splitted[1];
            this.mydata[i].date_value =  date_value; 
            this.mydata[i].time_value =  time_value;            
          }
        this.Table_All_order_tab = this.Table_All_order_tab.concat(this.mydata);  

        this.filter_count = obj.result.ordercount.totalallorder;
           this.All_order_count.emit(this.filter_count);
      }else
      {
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

  onallorderScroll() { 
    if(this.count >= this.allorderJson.page_no)
    {
      this.allorderJson.page_no++;     
      this.getAllorderdataData(this.allorderJson.page_no);
    }
  }
 
  getAllorderdataData1()
  {
  	this.Loader  = this.loader.show();
    let json:any ={
      limit:"200",
      page_no:"",
      //date:"",
      order_by:"",
      active_tab:"allorders",
      status_code:this.check2,
      order_id:this.orderId,
      del_mobile:this.del_number,
      payment_mode:this.paymode,
      Client_id:"",
      manifast_id:"",
      start_date:this.start_date,
      end_date:this.end_date,
      courier_id:this.check,
      tracking_no:this.track_no,
    };
    this.client.All_orders(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
      	 this.Order_status = obj.result.shipyaari_status;
       this.datetime=obj.result.allorders.consignment_date;
        if (obj.result.allorders[0]==undefined){
        }
         else{
           this.Table_All_order_tab=obj.result.allorders;
         }

         var mydata = obj.result.allorders;  
         
        for (var i=0; i < mydata.length; i++){    
            
            this.str =mydata[i].consignment_date;
            this.splitted = this.str.split(" ", 2);           
            var date_value=this.splitted[0];
            var time_value=this.splitted[1];
            mydata[i].date_value =  date_value; 
            mydata[i].time_value =  time_value;
            
        }
         
        this.Table_All_order_tab = mydata;   
         this.Loader  = this.loader.hide();
      }
       else
      {
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

get_status()
{
  this.client.get_status_list().subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.status_list = obj.result;
          for(let i:number = 0; i < this.status_list.length; i++)
         {
           this.status_list[i].checked = false; 
         }
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

check2:any[] = [];
  changeSelection2()
  {
     for(let i:number = 0; i < this.check2.length; i++)
      {
          this.check2.pop();
      }
     var num:number;
       var a =  this.status_list.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].status_name;
         this.check2.push(num);
       }
       var x =  this.check2.filter((value,index) => this.check2.indexOf(value) === index)
       this.check2 = x;
       //console.log(this.check2);
        
  }


 filter_flag:any = 0;
 orderId:any;
 del_number:any;
 paymode:any;
 dRange:any;
 status:any;
 start_date:any;
 end_date:any;

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

  payFilter(data)
{
  this.paymode = data;
  this.filter();
}




  filter()
  {
    this.allorderJson.page_no = 1;
  	this.filter_flag = 1;
    if(this.filter_partner_id != null || this.filter_partner_id != '')
    {
      this.getAllorderdataData();
    }
  	if(this.orderId != null)
  	{
  		this.getAllorderdataData();
  	}
  	if(this.del_number != null)
  	{
  		this.getAllorderdataData();
  	}
  	if(this.dRange != null)
  	{
  		var a = this.datedata.date_split(this.dRange);
  		this.end_date=a[0];
  		this.start_date = a[1];
  		this.getAllorderdataData();
  	}
  	if(this.paymode != null)
	{
	    if(this.paymode == "online")
		    {
		      this.paymode = "online";
		      this.getAllorderdataData();
		    }
	    else
		    {
		      this.paymode = "cod";
		      this.getAllorderdataData();
		    }
	}

  //awb filter
  if(this.check != null)
  {
    this.getAllorderdataData();
  }
  //track_noif
  if(this.track_no != null)
  {
     this.getAllorderdataData();
  }
  if(this.check2 != null)
  {
    this.getAllorderdataData();
  }
  	
  }

  reset_filter()
  {
    this.check2 = null;
     this.track_no = '';
  this.check = null;
    this.filter_partner_id='';
  	this.filter_flag = 0;
  	 this.orderId = '';
	 this.del_number = '';
	 this.paymode = null;
	 this.dRange = null;
	 this.status = '';
	 this.end_date= '';
  	 this.start_date = '';
	 this.getAllorderdataData();
  }

  filterStatus(name)
{
	this.filter_flag = 1;
	this.status = name;
	this.getAllorderdataData();
}

cancel_order(id)
{
   if (confirm("Do You Really Wants to Cancel the Order?")) {
  this.Loader  = this.loader.show();
  var json = {
     consignment_id:id
  }
  this.client.cancel_Shipment(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.getAllorderdataData();
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
}

show_label(consignment, partnerid)
{
  var json =
  {
    consign_id:consignment,
    partner_id:partnerid,
  }
  this.client.all_order_label(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        window.open(obj.result);
         this.tostr.success(obj.message);
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
}


//awb filter
//partnerList:any;
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

 goto_duplicate(id)
 {
   this.router.navigate(['/duplicate/'+id]);
 } 

 go_to_reverse(id)
 {
   this.router.navigate(['/reverce/'+id]);
 }

}
