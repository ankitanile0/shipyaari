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
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
	Loader:any;
	count:any = "";
  active_tab:any = 'shipping_charges';
  constructor(
  	private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
     private http: HttpClient,
    private tostr:ToastrService,
  	) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if('act' in params){
          this.active_tab = params.act;
        }
        if('ref' in params){
          let act_tab = this.active_tab;
          this.active_tab = '';
          setTimeout(() => {
            this.active_tab = act_tab;
          })
        }
      }
    );
    this.Loader = this.loader.hide();
  	this.get_data();
  }


  go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

go_to_cod(){this.router.navigate(['/cod/']);} 
go_to_all_inv(){this.router.navigate(['/allinvoices/']);}
go_to_reports(){this.router.navigate(['/reports/']);}

get_data()
{
  this.Loader = this.loader.show();
	this.client.all_invoices(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          
          this.count = obj.result.countdata;
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

click_change(link)
{
  this.router.navigate(['/allinvoices/'], { queryParams: { act: link } });
}

}
