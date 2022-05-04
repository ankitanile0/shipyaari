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
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.css']
})
export class CancelledComponent implements OnInit {

@Output() cancell_count:EventEmitter<any> = new EventEmitter

  Loader:String;
  p:any;
  count:any;
  str:any;
  splitted:any;
  filter_flag:any = 0;
  dRange:any;
  start_date:any;
  del_number:any;
  end_date:any;
  orderId:any;
  paymode:any;
  datefetch:any=[];  
  Table_Cancel_order_tab:any=[];
  cancelledJson:any={}
  partnerList:any;
  mydata:any=[];
  mydata1:any=[];
  track_no:any;
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

  ){}

  ngOnInit(): void {
  	this.getCancelorderData();
    this.get_partnerList();
  }

  filter_count:any;
  getCancelorderData(page_no=1)
  {  	
    if(this.ajaxongoing){
        return;
    }
    this.ajaxongoing = true;
    this.Loader  = this.loader.show();
    if(page_no == 1){
      this.Table_Cancel_order_tab = [];
    }  
    this.cancelledJson ={     
    	limit:"20",
		  page_no:page_no,
		  order_by:"",
		  active_tab:"cancelorder",
		  status_code:"",
		  order_id:this.orderId,
		  avn_service:"",
		  payment_mode:this.paymode,
		  manifast_id:"",
      start_date:this.start_date,
      end_date:this.end_date,
      del_mobile:this.del_number,
      courier_id:this.check,
      tracking_no:this.track_no,
    };
    this.client.All_orders(this.cancelledJson).subscribe((data: any) => {
       this.ajaxongoing = false;
      this.Loader  = this.loader.hide();
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
          this.count = obj.result.totalcancelodrpages;   
         this.mydata = obj.result.cancel_order;  
        for (var i=0; i <  this.mydata.length; i++){    
            this.str = this.mydata[i].cancel_date;
            this.splitted = this.str.split(" ", 2);           
            var cancel_date_value=this.splitted[0];
            var cancel_time_value=this.splitted[1];
             this.mydata[i].cancel_date_value =  cancel_date_value; 
             this.mydata[i].cancel_time_value =  cancel_time_value;
        }      
        this.mydata1 =  this.mydata;  
        for (var i=0; i < this.mydata1.length; i++){    
            this.str =this.mydata1[i].consignment_date;
            this.splitted = this.str.split(" ", 2);           
            var cancel_date_value1=this.splitted[0];
            var cancel_time_value1=this.splitted[1];
            this.mydata1[i].cancel_date_value1 =  cancel_date_value1; 
            this.mydata1[i].cancel_time_value1 =  cancel_time_value1;
        }         
        this.Table_Cancel_order_tab = this.Table_Cancel_order_tab.concat(this.mydata1);   

        this.filter_count = obj.result.ordercount.totalcancelorder;
           this.cancell_count.emit(this.filter_count);


         
       
      }else
      {      	
      	if(obj.message.includes("authToken"))
	      {
	        this.router.navigate(['/signin/'+obj.message]);
	      }
      }
    });
  }

  onScrollcancelorder() { 
    if(this.count >= this.cancelledJson.page_no)
    {
      this.cancelledJson.page_no++;    
      this.getCancelorderData(this.cancelledJson.page_no);
    }
  } 

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
    this.cancelledJson.page_no = 1;
  	this.filter_flag = 1;
  	if(this.orderId != null)
  	{
  		this.getCancelorderData()
  	}
  	if(this.del_number != null)
  	{
  		this.getCancelorderData()
  	}
  	if(this.dRange != null)
  	{
  		var a = this.datedata.date_split(this.dRange);
  		this.end_date=a[0];
  		this.start_date = a[1];
  		this.getCancelorderData()
  	}
  	if(this.paymode != null)
	  {
	    if(this.paymode == "online")
		    {
		      this.paymode = "online";
		      this.getCancelorderData();
		    }
	    else
		    {
		      this.paymode = "cod";
		      this.getCancelorderData();
		    }
	  }

    if(this.check != null)
    {
        this.getCancelorderData();
    }

    if(this.track_no != null)
    {
         this.getCancelorderData();
    }
  }

  reset_filter()
  {
      this.track_no = '';
      this.check = null;
      this.filter_flag = 0;
      this.dRange = null;
      this.start_date = "";
      this.del_number = "";
      this.end_date = "";
      this.orderId = "";
      this.paymode = "";
      this.getCancelorderData();
  }


//awb filter
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
        }else
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
