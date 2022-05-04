import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { DateFormatService } from 'src/app/services/date-format.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  @Output() all_count:EventEmitter<any> = new EventEmitter
Loader:any;
all_list:any;
p:any;
date:any;
allJson:any = {};
count:any;
mydata:any=[];
totalallpages:any;
allordercount:any;
filter_count:any;
ajaxongoing = false;

  constructor(
  	private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
    private http: HttpClient,
    private tostr:ToastrService,
    private excelService:JsonToExcelService,
    private datechange:DateFormatService,
  	) { }

  ngOnInit(): void {
  		this.getIntransitData();
      this.get_partnerList();
      this.get_status();
  }
  onallScrollData() {  
      console.log('scrolled');    
      if(this.totalallpages >= this.allJson.page_no)
      {
        this.allJson.page_no++;  
        this.getIntransitData(this.allJson.page_no);
      }
  }
  
  go_to_home()
  {
    this.router.navigate(['/dashboard/']);
  }

getIntransitData(page_no=1)
  {
    this.Loader = this.loader.show();
    if(this.ajaxongoing){
      return;
    }
    this.ajaxongoing = true;    
    if(page_no == 1){
      this.all_list = [];
    }  
    this.allJson ={
      order_id:this.trackingID,
      limit:"20",
      page_no:page_no,
      start_date:"",
      end_date:"",
      order_by:"",
      tab_type:"all",
      mobile_no:this.cust_mobile,
      payment_mode:this.pay,
      tracking_no:this.track_no,
      manifast_id:"",
      status:this.check2,
      courier_id :this.check,
    };
    this.client.Tracking(this.allJson).subscribe((data: any) => {
      this.ajaxongoing = false;
      this.Loader = this.loader.hide();

      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.count = obj.result.count_allorder;
        this.totalallpages = obj.result.totalallpages;
        
       	this.mydata = obj.result.trackingdata;
       	var time;
       	for(let i:number = 0; i < this.mydata.length; i++)
       	{
       		time = this.mydata[i].mytime;
       		time = time.split(".",2)
       		//console.log(time);
       		this.mydata[i].updateTime = time[0];
       	}
        this.all_list = this.all_list.concat(this.mydata); 
        
        this.filter_count = obj.result.count_allorder;
        this.all_count.emit(this.filter_count);



      }else
      {
      
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }


report:BsModalRef;
  downloadMoal(modal)
  {
      this.report = this.modalService.show(modal,
      {
        class:""
      })
  }

  closeReport()
  {
    this.report.hide();
  }

  end_date1:any;
  start_date1:any;
  report_download()
  {
   
    if(this.date == '' || this.date == null)
    {
      this.tostr.error("Please Select Date Range");
    }
    else{
      var temp:string = this.date;
      var daterange:any; 
    
    daterange = this.datechange.changeDateFormate(temp);     
    this.end_date1 = daterange[1];
    this.start_date1 = daterange[0];
    console.log(this.end_date1+' '+this.start_date1 );
     this.Loader = this.loader.show();
    var json =
    {
        days_type:"",
        start_date:this.start_date1,
        to_date:this.end_date1
    }
    this.client.tracking_report(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.excelService.exportAsExcelFile(obj.result, 'export-to-excel');
         this.closeReport()
        this.Loader = this.loader.hide();
      }
      else{
        this.closeReport()
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

  report_current_month()
  {
      var json =
    {
        days_type:"currentmonth",
        start_date:"",
        to_date:""
    }
     this.client.tracking_report(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.excelService.exportAsExcelFile(obj.result, 'export-to-excel');
         this.closeReport()
        this.Loader = this.loader.hide();
      }
      else{
        this.closeReport()
       this.Loader = this.loader.hide();
        this.tostr.error(obj.message); 
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

  report_last_30()
  {
     var json =
    {
         days_type:"last30days",
        start_date:"",
        to_date:""
    }
     this.client.tracking_report(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.excelService.exportAsExcelFile(obj.result, 'export-to-excel');
         this.closeReport()
        this.Loader = this.loader.hide();
      }
      else{
        this.closeReport()
       this.Loader = this.loader.hide();
        this.tostr.error(obj.message); 
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

  report_last_60()
  {
     var json =
    {
         days_type:"last60days",
        start_date:"",
        to_date:""
    }
     this.client.tracking_report(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.excelService.exportAsExcelFile(obj.result, 'export-to-excel');
         this.closeReport()
        this.Loader = this.loader.hide();
      }
      else{
        this.closeReport()
       this.Loader = this.loader.hide();
        this.tostr.error(obj.message); 
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

go_to_tracking(id:number)
{
  var url = '/track/'+id;
  window.open(url);
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


partnerList:any;
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

status_list:any;
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
         num = a[i].id;
         this.check2.push(num);
       }
       var x =  this.check2.filter((value,index) => this.check2.indexOf(value) === index)
       this.check2 = x;
       //console.log(this.check2);
        
  }


filterFlag = 0;
trackingID:any = null;
cust_mobile:any = null;
paymode = [
{ name: "cod", value:"COD"},
{ name: "online", value:"Online"}];
pay:any = null;
track_no:any = null;
payFilter(data)
{
    this.pay = data;
    this.filter();
}

filter()
{
  this.allJson.page_no = 1;
    if(this.trackingID != null && this.trackingID != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
     if(this.cust_mobile != null && this.cust_mobile != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
     if(this.pay != null && this.pay != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
    if(this.track_no != null && this.track_no != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
    if(this.check != null && this.check[0] != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }

     if(this.check2 != null && this.check2[0] != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
}

reset_filter()
{
  this.filterFlag =0;
  this.trackingID = null;
  this.cust_mobile =null
  this.pay = null
  this.track_no = null;
  this.check =null;
  this.check2 = null;
  this.getIntransitData();
}

}
