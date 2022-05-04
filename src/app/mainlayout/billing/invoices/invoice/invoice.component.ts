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
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
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
	//this.userID = localStorage.getItem('roleid');
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
		  tab_type: "invoices",
      invoice_no:this.trackingID
	}
	this.client.all_invoices(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.list = obj.result.invoicedeatils;
         //console.log(this.list);
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


down_mis(data)
{
	window.open(data);
}

down_invoice(data)
{
	window.open(data);
}
gotoinvoicedetails(invoice_number)
{
    this.router.navigate(['/invoicedetails/'+invoice_number]);
}

fileter_flag:any = 0;
filter()
{
  this.fileter_flag = 1;
  this.get_data();
}

reset_filter()
{
  this.fileter_flag = 0;
  this.trackingID = '';
  this.get_data();
}

}