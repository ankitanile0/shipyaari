import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DateFormatService } from 'src/app/services/date-format.service';

@Component({
  selector: 'app-cod',
  templateUrl: './cod.component.html',
  styleUrls: ['./cod.component.css']
})
export class CodComponent implements OnInit {

 agreementdata:any;
  agrpdfdata:any;
  Loader:string;
  codData:any;
  shipment_pikup_count:any;
  shipment_delivered_count:any;
  paid_amount_count:any;
  shipment_in_trasnit_count:any;
  shipment_rto_count:any;
  upcoming_cycle:any;
  no_of_bill:any;
  date:any;
  cod_sheet_data:any;
  from_date:any;
  to_date:any;
  days_type:any;
  productDtails:any; 
  all_transaction_data:any; 
  recovery_ship:BsModalRef;
  all_transaction:BsModalRef;

  constructor(
    private fb:FormBuilder,
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,  
    private http: HttpClient,
    private tostr:ToastrService,
    private loader:LoaderService,
    private jsontoexcel:JsonToExcelService,
    private modalService: BsModalService, 
    private datechange:DateFormatService,
  ) { }

  ngOnInit(): void {
    this.codlist();
  }

  go_to_home()
  {
    this.router.navigate(['/dashboard/']);
  }

go_to_cod(){this.router.navigate(['/cod/']);} 
go_to_all_inv(){this.router.navigate(['/allinvoices/']);}
go_to_reports(){this.router.navigate(['/reports/']);}
  
  codlist()
  {
    this.Loader  = this.loader.show();
    let json:any ={
      start_page: "",
      limit: "",
      page_no: "",
      order_by: "",
      from_date: "",
      to_date: "",
      report_ref_number: "",
      payment_ref_number: ""
    };
    this.client.codDetails(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {          
        this.codData=obj.result.list_trasctions; 
        this.shipment_pikup_count=obj.result.countdata.shipment_pikup_count;  
        this.shipment_delivered_count=obj.result.countdata.shipment_delivered_count;  
        this.paid_amount_count=obj.result.countdata.paid_amount_count;  
        this.shipment_in_trasnit_count=obj.result.countdata.shipment_in_trasnit_count;  
        this.shipment_rto_count=obj.result.countdata.shipment_rto_count;  
        this.upcoming_cycle=obj.result.check_new_cod.upcoming_cycle; 
       this.no_of_bill=obj.result.check_new_cod.no_of_bill; 
       this.date=obj.result.check_new_cod.date;     
      }else{
        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }

report:BsModalRef;
open_report(modal)
{
	this.report = this.modalService.show(modal,
	{
		class:""
	})	
}

close_report()
{
	this.report.hide();
}

Date:any = null;
end_date1:any;
start_date1:any;
  datewise()
  {
  	var date = this.Date;
  	if(date == null || date == '')
  	{ 
  		 this.tostr.error("Please enter date");
  	}
  	else
  	{
        var daterange:any; 
        var temp:any = this.Date;   
        daterange = this.datechange.changeDateFormate(temp);     
        this.end_date1 = daterange[1];
        this.start_date1 = daterange[0];
        console.log(this.end_date1+' '+this.start_date1 );  

  		  var json = 
		    {
		      from_date:this.start_date1,
		      to_date:this.end_date1,
		      days_type:""
		    } 
  		   
	    this.client.downloadcoddatewise(json).subscribe((data: any) => {
	      var response = data._body;
	      var obj = JSON.parse(response);      
	      if (obj.status == 200) {
	        this.jsontoexcel.exportAsExcelFile(obj.result, 'file Name'); 
	        this.tostr.success(obj.message);    
	        this.close_report();
	      }else{    
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
			      from_date:"",
			      to_date:"",
			      days_type:"currentmonth"
			    }
			     this.client.downloadcoddatewise(json).subscribe((data: any) => {
	      var response = data._body;
	      var obj = JSON.parse(response);      
	      if (obj.status == 200) {
	        this.jsontoexcel.exportAsExcelFile(obj.result, 'file Name'); 
	        this.tostr.success(obj.message);    
	        this.close_report();
	      }else{ 
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
			      from_date:"",
			      to_date:"",
			      days_type:"last30days"
			    }
			     this.client.downloadcoddatewise(json).subscribe((data: any) => {
	      var response = data._body;
	      var obj = JSON.parse(response);      
	      if (obj.status == 200) {
	        this.jsontoexcel.exportAsExcelFile(obj.result, 'file Name'); 
	        this.tostr.success(obj.message);    
	        this.close_report();
	      }else{  
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
			      from_date:"",
			      to_date:"",
			      days_type:"last60days"
			    }
			     this.client.downloadcoddatewise(json).subscribe((data: any) => {
	      var response = data._body;
	      var obj = JSON.parse(response);      
	      if (obj.status == 200) {
	        this.jsontoexcel.exportAsExcelFile(obj.result, 'file Name');  
	        this.tostr.success(obj.message);   
	        this.close_report();
	      }else{   
	      this.tostr.error(obj.message);     
	        if(obj.message.includes("authToken"))
	        {
	          this.router.navigate(['/signin/'+obj.message]);
	        }
	      }      
    	});
  }
 
  downloaddata(ref_report_number)
  {
    var json = 
    {
      ref_report_number:ref_report_number
    }    
    this.client.downloadcodSheetByRefNo(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
        this.cod_sheet_data=obj.result;
        this.jsontoexcel.exportAsExcelFile(obj.result, 'file Name');         
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }
  showRecoveryShipment(modal, ref_report_number){
    var json = 
    {
      ref_report_number:ref_report_number
    }    
    this.client.recoveryshipment(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
        this.productDtails=obj.result;             
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
    this.recovery_ship = this.modalService.show(modal,{
      class:"productmodel",
    })
  }

close_ref()
{
  this.recovery_ship.hide();
}

check_all_transaction(modal,ref_report_number){
  var json = 
  {
    ref_report_number:ref_report_number
  }    
  this.client.checkAllTransaction(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
        this.all_transaction_data=obj.result;             
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });

     this.all_transaction = this.modalService.show(modal,{
      class:"",
    })
  }


  close_transaction()
  {
    this.all_transaction.hide();
  }


}
