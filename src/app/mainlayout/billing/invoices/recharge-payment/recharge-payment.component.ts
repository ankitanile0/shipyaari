import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recharge-payment',
  templateUrl: './recharge-payment.component.html',
  styleUrls: ['./recharge-payment.component.css']
})
export class RechargePaymentComponent implements OnInit {


Loader:any;
trackingID:any;
p:any;

drange:any;

  constructor(
  	private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
     private tostr:ToastrService,
      private http: HttpClient,
  	) { }

  ngOnInit(): void {
  	this.get_data();
  }

list:any;
  get_data()
{
  this.Loader = this.loader.show();
	var json = 
	{
		  start_page: "",
		  limit: "1000",
		  page_no: "",
		  order_by: "",
		  tab_type: "recharge_and_payment_log",
      start_date:this.start_date,
      end_date:this.end_date
	}

	this.client.all_invoices(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.list = obj.result.rechargeandpayment;
          var list_data =  obj.result.rechargeandpayment;
          for(let i:number = 0; i < this.list.length; i++)
          {
          	var datetime = this.list[i].transaction_date;
          	datetime = datetime.split(" ");
          	
          	list_data[i].date = datetime[0]
          	list_data[i].time = datetime[1]
          }

          this.list = list_data;
          this.Loader = this.loader.hide();
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


fileter_flag:any = 0;
end_date:any;
start_date:any;
filter()
{
  this.fileter_flag = 1;
  var temp:string = this.drange;
    var strin:string  = JSON.stringify(temp)
    var replacedata = strin.replace(/[{()}]/g, '');
      replacedata  = replacedata.replace(/['"]+/g, '');
      replacedata  = replacedata.replace("[", '');
      replacedata  = replacedata.replace("]", '');
      var a  = replacedata.split('T');
     var b = a[1].split(',');
     this.end_date =  b[1];
     this.start_date = a[0];
    console.log(this.end_date +"  "+ this.start_date );
  this.get_data();
}

reset_filter()
{
  this.fileter_flag = 0;
  this.trackingID = '';
  this.end_date = '';
  this.start_date = '';
  this.get_data();
}

}