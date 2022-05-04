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
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

@Output() complete_count:EventEmitter<any> = new EventEmitter

  Loader:String;
  p:any;
  Table_Complete_order_tab:any[]=[];
  str:any;
  splitted:any;
  datefetch:any[]=[];
  completeJson:any={}
  count:any;
  mydata:any=[];
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
  	) { }

  ngOnInit(): void {
  	this.getCompleteorderData();
    this.get_partnerList();
  }

filter_count:any;
    getCompleteorderData(page_no=1)
  {
    if(this.ajaxongoing){
        return;
    }
    this.ajaxongoing = true;
    if(page_no == 1){
    this.Table_Complete_order_tab = [];
  }
  	this.Loader  = this.loader.show();
    this.completeJson ={
      limit:"20",
      page_no:page_no,
      start_date:this.start_date,
      end_date:this.end_date,
      del_mobile:this.del_number,
      order_by:"",
      avn_service:"",
      status_code:"",
      active_tab:"completeorders",
      order_id:this.orderId,
      payment_mode:this.paymode,
      status_start_date:this.status_start_date,
      status_end_date:this.status_end_date,
      courier_id:this.check,
      tracking_no:this.track_no,
    }

    this.client.All_orders(this.completeJson).subscribe((data: any) => {
      this.ajaxongoing = false;
      this.Loader  = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.count = obj.result.totalcompodrpages;       
        this.mydata = obj.result.completeorders;           
        for (var i=0; i < this.mydata.length; i++){  
            this.str =this.mydata[i].consignment_date;
            this.splitted = this.str.split(" ", 2);           
            var date_value=this.splitted[0];
            var time_value=this.splitted[1];
            this.mydata[i].date_value =  date_value; 
            this.mydata[i].time_value =  time_value;
        } 
        this.Table_Complete_order_tab = this.Table_Complete_order_tab.concat(this.mydata);  

           this.filter_count = obj.result.ordercount.totalincompleteorder;
           this.complete_count.emit(this.filter_count); 

      }else
      {      	
      	if(obj.message.includes("authToken"))
	      {
	        this.router.navigate(['/signin/'+obj.message]);
	      }
      }
    });
  }
  onScrollcompleteorder() {  
    if(this.count >= this.completeJson.page_no)
    {
      this.completeJson.page_no++;   
      this.getCompleteorderData(this.completeJson.page_no);
    }
  }

  filter_flag:any = 0;
  dRange:any;
  orderId:any;
  del_number:any;
  paymode:any;
  start_date:any;
  end_date:any;
  sdRange:any;
  status_start_date:any;
  status_end_date:any;

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
    this.completeJson.page_no = 1;
  	this.filter_flag = 1;
  	if(this.dRange != null)
  	{
  		var a = this.datedata.date_split(this.dRange);
  		this.end_date=a[0];
  		this.start_date = a[1];
  		this.getCompleteorderData();
  	}
  	if(this.orderId !=null)
  	{
  		this.getCompleteorderData();
  	}
  	if(this.del_number != null)
  	{
  		this.getCompleteorderData();
  	}
  	if(this.paymode != null)
  	{
  		 if(this.paymode == "online")
	    {
	      this.paymode = "online";
	      this.getCompleteorderData();
	    }
	    else
	    {
	      this.paymode = "cod";
	      this.getCompleteorderData();
	    }
  		
  	}
    if(this.sdRange != null)
    {
      var a = this.datedata.date_split(this.sdRange);
      this.status_start_date=a[1];
      this.status_end_date=a[0];
      this.getCompleteorderData();
    }

     //awb filter
  if(this.check != null)
  {
    this.getCompleteorderData();
  }
  //track_noif
  if(this.track_no != null)
  {
     this.getCompleteorderData();
  }
}

  reset_filter()
  {
  this.track_no = '';
  this.check = null;
  this.dRange = null;
  this.sdRange = null;
  this.orderId = "";
  this.del_number = "";
  this.paymode = null;
  this.start_date = "";
  this.end_date = "";
  	this.getCompleteorderData();
  	this.filter_flag = 0;
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
       console.log(this.check); 
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
