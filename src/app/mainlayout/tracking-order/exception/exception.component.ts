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
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit {
  

@Output() excndr_count:EventEmitter<any> = new EventEmitter

  Loader:any;
  exception_list:any;
  all:any;
  action_pending:any;
  action_tacken:any;
  date:any;
  file:any;
  import:BsModalRef;
  type:any='pending';
  //report:BsModalRef;
  filter_count:any;

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
  ){ }

  ngOnInit(): void {
	  this.getIntransitData(this.type);
    this.get_partnerList();
    this.get_status();
    //this.radio_pending();
  }

  go_to_home()
  {
    this.router.navigate(['/dashboard/']);
  }

  getIntransitData(type)
  {
    this.type = type;
    this.exception_list = [];
    this.Loader = this.loader.show();
    let json:any ={
      order_id:this.trackingID,
      limit:"100",
      page_no:"",
      start_date:"",
      end_date:"",
      order_by:"",
      tab_type:"exceptionndr",
      mobile_no:this.cust_mobile,
      payment_mode:this.pay,
      tracking_no:this.track_no,
      manifast_id:"",
      status:this.check2,
      courier_id :this.check,
      type:this.type
    };
    this.client.Tracking(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();   
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
     	  this.exception_list = obj.result.trackingdata;
        this.all = obj.result.countexndr.all;
        this.action_pending = obj.result.countexndr.pendingfromseller;
        this.action_tacken = obj.result.countexndr.actiontaken;
        this.file = obj.result.ndrsamplesheet;  
        console.log(this.all);   
        
        
      this.filter_count = obj.result.count_ndr;
      this.excndr_count.emit(this.filter_count);
      }
      else{       
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
  radio_pendings:boolean = true;
  radio_pending()
  {
    this.radio_pendings = true;
    this.exception_list= [];
    var a :any = ( < HTMLInputElement > document.getElementById('inlineRadio2')).value;
    //console.log(a);
    var json = 
    {
      type:a
    }
    this.client.exception_filter(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.exception_list = obj.result.typewisedata;                    
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }


all_radio:boolean = false;
  radio_all()
  {
    this.all_radio = true;
    this.exception_list= [];
    var a :any = ( < HTMLInputElement > document.getElementById('inlineRadio1')).value;
    //console.log(a);
    var json = 
    {
      type:a
    }
    this.client.exception_filter(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.exception_list = obj.result.typewisedata; 
        //this.getIntransitData(type);        
      }else
      {         
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }


  radio_taken()
  {
    this.exception_list= [];
    var a :any = ( < HTMLInputElement > document.getElementById('inlineRadio3')).value;
    //console.log(a);
    var json = 
    {
      type:a
    }
    this.client.exception_filter(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.exception_list = obj.result.typewisedata;        
        //this.getIntransitData();      
      }
      else{     
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
remarkdata:any;
  followup:BsModalRef;
  followup_all(modal ,id)
  { 
    this.followup = this.modalService.show(modal,
    {
      class:"",
    })   
    var json =
    {
      consigned_id:id
    }
    this.Loader = this.loader.show();
    this.client.tracking_followp(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.remarkdata = obj.result;         
      }
      else{
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
     
    });   
  }
  close_followup()
  {
    this.followup.hide();
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
    var selected :any = ( < HTMLInputElement > document.getElementById('type')).value; 
    if(this.date == '' || this.date == null)
    {
      this.tostr.error("Please Select Date Range or Select Type");
    }else
    {
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
        type:selected,
        start_date:this.start_date1,
        to_date:this.end_date1
      }
      this.client.report_ndr(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == 200) {
          this.excelService.exportAsExcelFile(obj.result, 'export-to-excel');
          this.closeReport();
          this.Loader = this.loader.hide();
        }else{
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
    var selected :any = ( < HTMLInputElement > document.getElementById('type')).value; 
    if(selected == null || selected ==''){
         this.tostr.error("Please Select Type"); 
    }else
    {
      var json =
      {
          days_type:"currentmonth",
          type:selected,
          start_date:"",
          to_date:""
      }
     this.client.report_ndr(json).subscribe((data: any) => {
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

  report_last_30()
  {
    var selected :any = ( < HTMLInputElement > document.getElementById('type')).value; 
    if(selected == null || selected ==''){
         this.tostr.error("Please Select Type"); 
    }
    else{
     var json =
    {
         days_type:"last30days",
         type:selected,
        start_date:"",
        to_date:""
    }
     this.client.report_ndr(json).subscribe((data: any) => {
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

  report_last_60()
  {
     var selected :any = ( < HTMLInputElement > document.getElementById('type')).value; 
    if(selected == null || selected ==''){
         this.tostr.error("Please Select Type"); 
    }
    else{
     var json =
    {
        days_type:"last60days",
        type:selected,
        start_date:"",
        to_date:""
    }
     this.client.report_ndr(json).subscribe((data: any) => {
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

download_sheet()
{
  this.client.download_ndr_excel(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.file = obj.result;
         this.excelService.exportAsExcelFile(this.file, 'export-to-excel');
      }
      else{
      
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

  open_import(modal)
  {
    this.import = this.modalService.show(modal,
    {

    })
  }

  datafile:any = null;
  close_import()
  {
    this.import.hide();
  }

  resData:any;
  upload_file()
  {
    var url = localStorage.getItem('apiurl');
     var file :any = ( < HTMLInputElement > document.getElementById('sheet')).files; 
    
       const payload = new FormData();
        this.Loader = this.loader.show();
         // payload.append("app_token" , localStorage.getItem("token"));
          payload.append("ndr_file" , file[0]);
      this.http
      .post(url+"/trackings/import_ndr",
        payload, 
        { 
          headers: 
          {
            'Authorization': localStorage.getItem("token"),
            } 
        }).subscribe((data:any) => {
            this.resData = data;
            var obj = this.resData;
            if (obj.status == 200) 
            {
              this.close_import();
              this.tostr.success(obj.message);
              this.Loader = this.loader.hide();  
             
            } 
            else 
            {
               this.tostr.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
   
  }

  remark:BsModalRef;
  selectedType:any;
  comment:any;
  consid:any;
  remark_modal(modal, id)
  {
    this.consid = id;
   this.remark = this.modalService.show(modal,
   {
     class:"",
   })
  }

  close_remark()
  {
    this.remark.hide();
  }

  submit()
  {
    if(this.comment == null || this.comment == '')
    {
      this.tostr.error("Please Add comment"); 
    }else
    {
      var b :any = ( < HTMLInputElement > document.getElementById('typedata')).value; 
      var json =  {
          consignment_id:this.consid,
          shipment_type: b,
          comment: this.comment,
      }

      this.client.exception_comment(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == 200) {
           this.close_remark()
           this.tostr.success(obj.message);
          this.Loader = this.loader.hide();
        }
        else{
          this.close_remark()
          this.tostr.error(obj.message);
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
      if(this.trackingID != null && this.trackingID != '')
      {
        this.filterFlag =1;
        this.getIntransitData(this.type);
      }
       if(this.cust_mobile != null && this.cust_mobile != '')
      {
        this.filterFlag =1;
        this.getIntransitData(this.type);
      }
       if(this.pay != null && this.pay != '')
      {
        this.filterFlag =1;
        this.getIntransitData(this.type);
      }
      if(this.track_no != null && this.track_no != '')
      {
        this.filterFlag =1;
        this.getIntransitData(this.type);
      }
      if(this.check != null && this.check[0] != '')
      {
        this.filterFlag =1;
        this.getIntransitData(this.type);
      }

       if(this.check2 != null && this.check2[0] != '')
      {
        this.filterFlag =1;
        this.getIntransitData(this.type);
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
    this.getIntransitData(this.type);
  } 
}
