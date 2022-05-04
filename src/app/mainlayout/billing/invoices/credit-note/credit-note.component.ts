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
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.css']
})
export class CreditNoteComponent implements OnInit {

Loader:any;
trackingID:any;
p:any;
userID:any;
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
	this.userID = localStorage.getItem('roleid');
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
		  tab_type: "credit_note"
	}

	this.client.all_invoices(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.list = obj.result.credit_note;
          // var list_data =  obj.result.rechargeandpayment;
          // for(let i:number = 0; i < this.list.length; i++)
          // {
          // 	var datetime = this.list[i].transaction_date;
          // 	datetime = datetime.split(" ");
          	
          // 	list_data[i].date = datetime[0]
          // 	list_data[i].time = datetime[1]
          // }

          // this.list = list_data;
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

download_receipt(ref_id,user_id)
{
	
	var json =
	{
		invoice_no:ref_id,//mandetory
 	    column:user_id//not mandatory
	}
	this.client.invoice_recept(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          //this.list = obj.result.credit_note;
         window.open(obj.result);
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

}
