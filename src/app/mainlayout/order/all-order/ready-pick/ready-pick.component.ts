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
  selector: 'app-ready-pick',
  templateUrl: './ready-pick.component.html',
  styleUrls: ['./ready-pick.component.css']
})
export class ReadyPickComponent implements OnInit {

@Output() readypic_count:EventEmitter<any> = new EventEmitter

	 Loader:String;
	 p:any;
	Table_Readytopick_tab:any[]=[];
  count:any;
  readyJson:any={};
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
  	this.getReady_to_pick_Data();
  }

filter_count:any;

  getReady_to_pick_Data(page_no=1)
  {
    if(this.ajaxongoing){
        return;
    }
    this.ajaxongoing = true;
    if(page_no == 1){
    this.Table_Readytopick_tab = [];
      }
  	this.Loader  = this.loader.show();
    this.readyJson ={
      limit:"20",
      page_no:page_no,
      order_by:"",
      avn_service:"",
      status_code:"",
      active_tab:"readytopick",
      order_id:"",
      manifast_id:this.manifest,
      start_date:this.start_date,
      end_date:this.end_date,

    };
    this.client.All_orders(this.readyJson).subscribe((data: any) => {
        this.ajaxongoing = false;
        this.Loader = this.loader.hide();
       
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.count = obj.result.totalreadytopickpages; 
        this.Table_Readytopick_tab = this.Table_Readytopick_tab.concat(obj.result.readytopick);    
        this.filter_count = obj.result.ordercount.totalreadytopickorder;
        this.readypic_count.emit(this.filter_count); 

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

onScrollReadytopick() {    
    if(this.count >= this.readyJson.page_no)
    {
      this.readyJson.page_no++;    
      this.getReady_to_pick_Data(this.readyJson.page_no);
    }
  }

dRange:any;
manifest:any;
start_date:any;
end_date:any;
filter_flag:any = 0;
  filter()
  {
    this.readyJson.page_no = 1;
  	this.filter_flag = 1;
  	if(this.manifest != null)
  	{
  		this.getReady_to_pick_Data();
  	}
  	if(this.dRange != null)
  	{
  		var a = this.datedata.date_split(this.dRange);
  		this.end_date=a[0];
  		this.start_date = a[1];
  		this.getReady_to_pick_Data();
  	}
  }

reset_filter()
	{
		this.filter_flag = 0;
		this.dRange = "";
		this.manifest = "";
		this.start_date = "";
		this.end_date = "";
		this.getReady_to_pick_Data();
	}

  get_manifest(id)
  {
    var json =
    {
      comman_id:id
    }
    this.client.ready_pick_manifest(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       window.open(obj.result);
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

get_label(id)
{
  var json =
    {
      comman_id:id
    }
    this.client.ready_pick_label(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        if(obj.result == null)
        {
          this.tostr.error("Data Not Available !!");
        }
        else
        {
          window.open(obj.result);
        }
       
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

remove_Batch(id)
{
  if(confirm("Are you sure you want to remove this batch?")) {   
  var json =
    {
      comman_id:id
    }
    this.client.ready_pick_rem_batch(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       //window.open(obj.result);
       this.tostr.success(obj.message);
       this.getReady_to_pick_Data();
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
}

get_invoice(id)
{
  var json =
    {
      comman_id:id
    }
    this.client.ready_pick_getlabel(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       window.open(obj.result);
       //this.tostr.success(obj.message);
       //this.getReady_to_pick_Data();
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

detailModal:BsModalRef;
list:any;
str:any;
splitted:any;
getOrderDetails(modal, id)
{
  
  var json =
    {
      comman_id:id
    }
    this.client.ready_pick_getdetail(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.list = obj.result;
        var finalData =[];
        for(var i:number = 0; i < this.list.length; i++)
        {
          var row = this.list[i];
          finalData[i] = row[0]
          //console.log(finalData);
        }

        for (var i=0; i < finalData.length; i++)
           {    
               
               this.str =finalData[i].consignment_date;
               this.splitted = this.str.split(" ", 2);           
               var date_value=this.splitted[0];
               var time_value=this.splitted[1];
               finalData[i].date_value =  date_value; 
               finalData[i].time_value =  time_value;
               
           }
        this.list = finalData;
         this.detailModal = this.modalService.show(modal,
          {
            class:"modal-xl",
          })
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

CloseDetails()
{
  this.detailModal.hide();
}


Show_label(consignment, partner, no_pck, paymode, orderid )
{
  var json = 
  {
    consign_id:consignment,
    partner_id:partner,
    no_of_pkg:no_pck,
    payment_mode:paymode,
    orderid:orderid
  }
  this.client.ready_to_ship_label(json).subscribe((data: any) => {
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

cancel_order(id)
{
  if (confirm("Do You Really Wants to Cancel the Order?")) {
  var json = {
     consignment_id:id
  }
  this.client.cancel_Shipment(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         //this.getReadytoShipData();
         this.Loader  = this.loader.hide();
         this.list;
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
