import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { DateFormatService } from 'src/app/services/date-format.service';
@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css']
})
export class PassbookComponent implements OnInit {

Loader:any;

  constructor(
private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private loader:LoaderService,
    private http: HttpClient,
    private tostr:ToastrService,
    private modalService: BsModalService,
    private json_to_excel:JsonToExcelService,
    private datechange:DateFormatService,
  	) {
  	this.get_passbook_data(); 
  }

  ngOnInit(): void {
  }
  
go_to_home()
  {
    this.router.navigate(['/dashboard/']);
  }

passbokList:any;

  Parent:any;
  Id:any;
  Name:any;
  email:any;
  Address:any;
  GST_No:any;
  Unbill_amount:any;
  Outsanding_amount:any;
  Wallet_amount:any;
  Account_Type:any;
  Account_open_date:any;
  Account_Expiry_Date:any;
  Plan_Opted:any;
  Deposit:any;
  Total_Amount_paid:any;

  get_passbook_data()
  {
    this.Loader  = this.loader.show();
  	 var json = 
  {

  }
  this.client.fetch_passbook(localStorage.getItem("token")).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) { 
          this.Loader  = this.loader.hide();               
          this.Parent = obj.result.info[0].parent_id;
			  this.Id = obj.result.info[0].user_id;
			  this.Name = obj.result.info[0].full_name;
			  this.email = obj.result.info[0].email;
			  this.Address = obj.result.info[0].addr;
			  this.GST_No = obj.result.info[0].gst_number;
			  this.Unbill_amount = obj.result.info[0].unbill_amt;
			  this.Outsanding_amount = obj.result.info[0].unbill_amt;
			  this.Wallet_amount = obj.result.info[0].balance_amount;
			  this.Account_Type = obj.result.info[0].AccountType;
			  this.Account_open_date = obj.result.info[0].plan_purchase_date;
			  this.Account_Expiry_Date = obj.result.info[0].expiry_due_date;
			  this.Plan_Opted = obj.result.info[0].plan;
			  this.Deposit = obj.result.info[0].balance_amount;
			  this.Total_Amount_paid = obj.result.info[0].tot_paid_amt;

        this.Unbill_amount = parseFloat(this.Unbill_amount).toFixed(2);
        this.Outsanding_amount = parseFloat(this.Outsanding_amount).toFixed(2);
        this.Wallet_amount = parseFloat(this.Wallet_amount).toFixed(2);
        this.Deposit =  parseFloat(this.Deposit).toFixed(2);
        this.Total_Amount_paid =  parseFloat(this.Total_Amount_paid).toFixed(2);

			  this.passbokList = obj.result.result;
        var mydata = obj.result.result;
        for(let i:number = 0; i < mydata.length; i++)
        {
          mydata[i].balance = parseFloat(mydata[i].balance).toFixed(2); 
           mydata[i].credited = parseFloat(mydata[i].credited).toFixed(2); 
            mydata[i].debited = parseFloat(mydata[i].debited).toFixed(2); 
             mydata[i].redeem_points_amt = parseFloat(mydata[i].redeem_points_amt).toFixed(2); 
              mydata[i].slab_amt = parseFloat(mydata[i].slab_amt).toFixed(2); 
               mydata[i].wallet_amt = parseFloat(mydata[i].wallet_amt).toFixed(2); 
        }
        this.passbokList = mydata;
			  // var credit = [];
			  //  credit = obj.result.result;
			  // var temp;
			  // var debit;
			  // var wallAmt;
			  // for(var i:number = 0; i < credit.length; i++)
			  // {
			  // 	//for credit
			  // 	temp = credit[i].credited;
			  // 	temp = parseFloat(temp);
			  // 	temp = temp.toFixed(2);
			  // 	credit[i].credited =  temp;

			  // 	//for Debit
			  // 	debit = credit[i].debited;
			  // 	debit = parseFloat(debit);
			  // 	debit = debit.toFixed(2);
			  // 	credit[i].debited =  debit;

			  // 	//for Wallet Amount
			  // 	wallAmt = credit[i].wallet_amt;
			  // 	wallAmt = parseFloat(wallAmt);
			  // 	wallAmt = wallAmt.toFixed(2);
			  // 	credit[i].wallet_amt =  wallAmt;
			  	
			  // }
			  //  this.passbokList = credit;
          }
          else
          {   
          this.Loader  = this.loader.hide(); 
            if(obj.message.includes("authToken"))
               {
                 this.router.navigate(['/signin/'+obj.message]);
               }
          } 
    });
  }

dRange:any = '';
end_date:any;
start_date:any;
flag:any = 0;
passbook_date_wise()
{

  if(this.dRange == '')
  {
     this.tostr.error("Please Select Date");
   }
   else
   {
      
      var daterange:any; 
      var temp:string = this.dRange;
      daterange = this.datechange.changeDateFormate(temp);     
      this.end_date = daterange[1];
      this.start_date = daterange[0];
      console.log(this.end_date+' '+this.start_date );  


     //console.log(this.start_date+" "+this.end_date);
     var json = 
     {
          from_date:this.start_date, //not mandatory
          to_date:this.end_date //not mandatory

     }
     this.client.filter_date_passbook(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {
            this.flag = 1;

var mydata = obj.result;
        for(let i:number = 0; i < mydata.length; i++)
        {
          mydata[i].balance = parseFloat(mydata[i].balance).toFixed(2); 
           mydata[i].credited = parseFloat(mydata[i].credited).toFixed(2); 
            mydata[i].debited = parseFloat(mydata[i].debited).toFixed(2); 
             mydata[i].redeem_points_amt = parseFloat(mydata[i].redeem_points_amt).toFixed(2); 
              mydata[i].slab_amt = parseFloat(mydata[i].slab_amt).toFixed(2); 
               mydata[i].wallet_amt = parseFloat(mydata[i].wallet_amt).toFixed(2); 
        }
        this.passbokList = mydata;




        //    this.passbokList = obj.result;
        // var credit = [];
        //  credit = obj.result;
        // var temp;
        // var debit;
        // var wallAmt;
        // for(var i:number = 0; i < credit.length; i++)
        // {
        //   //for credit
        //   temp = credit[i].credited;
        //   temp = parseFloat(temp);
        //   temp = temp.toFixed(2);
        //   credit[i].credited =  temp;

        //   //for Debit
        //   debit = credit[i].debited;
        //   debit = parseFloat(debit);
        //   debit = debit.toFixed(2);
        //   credit[i].debited =  debit;

        //   //for Wallet Amount
        //   wallAmt = credit[i].wallet_amt;
        //   wallAmt = parseFloat(wallAmt);
        //   wallAmt = wallAmt.toFixed(2);
        //   credit[i].wallet_amt =  wallAmt;
        // }
        //  this.passbokList = credit;                
            this.Loader  = this.loader.hide(); 
          }
          else
          {    this.Loader  = this.loader.hide(); 
            if(obj.message.includes("authToken"))
               {
                 this.router.navigate(['/signin/'+obj.message]);
               }
          } 
    });
   }
}

export_date_wise()
{
  if(this.dRange == '')
  {
     this.tostr.error("Please Select Date");
   }
   else
   {
      var temp:string = this.dRange;
    var strin:string  = JSON.stringify(temp)
    var replacedata = strin.replace(/[{()}]/g, '');
      replacedata  = replacedata.replace(/['"]+/g, '');
      replacedata  = replacedata.replace("[", '');
      replacedata  = replacedata.replace("]", '');
      var a  = replacedata.split('T');
     var b = a[1].split(',');
     this.end_date =  b[1];
     this.start_date = a[0];
     //console.log(this.start_date+" "+this.end_date);
     var json = 
     {
          from_date:this.start_date, //not mandatory
          to_date:this.end_date //not mandatory

     }
     this.client.export_passbook_sheet(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {
            this.json_to_excel.exportAsExcelFile(obj.result, "file name");
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
}

reset_flag()
{
  this.flag=0;
  this.end_date='';
  this.start_date='';
  this.dRange='';
  this.get_passbook_data();
}


transaction_history_List:any;
transction:BsModalRef;
sample_date:any;
view_date_wise(modal, date)
  {
    this.sample_date = date;
    var json = 
    {
      seldate:date
    }
     this.client.fate_wise_fetch(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {
            //this.transaction_history_List = obj.result;
            var mydata = obj.result;
        for(let i:number = 0; i < mydata.length; i++)
        {
          mydata[i].balance = parseFloat(mydata[i].balance).toFixed(2); 
           mydata[i].credited = parseFloat(mydata[i].credited).toFixed(2); 
            mydata[i].debited = parseFloat(mydata[i].debited).toFixed(2); 
             //mydata[i].redeem_points_amt = parseFloat(mydata[i].redeem_points_amt).toFixed(2); 
              //mydata[i].slab_amt = parseFloat(mydata[i].slab_amt).toFixed(2); 
               mydata[i].wallet_amt = parseFloat(mydata[i].wallet_amt).toFixed(2); 
        }
        this.transaction_history_List = mydata;
          }
          else
          {    
            if(obj.message.includes("authToken"))
               {
                 this.router.navigate(['/signin/'+obj.message]);
               }
          } 
    });

     this.transction = this.modalService.show(modal,
     {
       class:"modal-xl",
     })
  }
 
close_trans()
{
  this.transction.hide();
}


}
