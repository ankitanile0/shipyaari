import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.css']
})
export class TrackingOrderComponent implements OnInit {

Loader:String;
p:any;
CountAll:any;
CountrtOorder:any;
CountrtNdrOrder:any;

active_tab:any = 'trac_rto';

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
    private tostr:ToastrService
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
  	this.getIntransitData();
  }

    go_to_home()
{
  this.router.navigate(['/dashboard/']);
}


go_to_trackingpage(){this.router.navigate(['/trackingorders/']);} 
go_to_approve_rto(){this.router.navigate(['/approverto/']);}
go_to_approve_pickup(){this.router.navigate(['/approvepickup/']);}



getIntransitData()
  {
    this.Loader = this.loader.show();
    let json:any ={
      order_id:"",
      limit:"100",
      page_no:"",
      start_date:"",
      end_date:"",
      order_by:"",
      tab_type:"all",
      mobile_no:"",
      payment_mode:"",
      tracking_no:"",
      manifast_id:"",
      status:"",
      courier_id :"",
    };
    this.client.Tracking(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       
           this.CountAll=obj.result.count_allorder;
           this.CountrtOorder=obj.result.count_rto;
           this.CountrtNdrOrder=obj.result.count_ndr;
        this.Loader = this.loader.hide();
        
      }
      else{
        this.Loader = this.loader.hide();
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

click_change(link)
{
  this.router.navigate(['/trackingorders/'], { queryParams: { act: link } });
}

all_count(data){ this.CountAll = data; }
trackrto_count(data){ this.CountrtOorder = data; }
excndr_count(data){ this.CountrtNdrOrder = data; }



}
