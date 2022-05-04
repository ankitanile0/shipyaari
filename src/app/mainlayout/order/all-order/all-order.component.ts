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
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit {

  Loader:String;
  TotalProcessOrder:any;
  TotalReadytoShip:any;
  TotalReadyToPickOrder:any;
  TotalIntransitOrder:any;
  TotalinCompleteOrder:any;
  TotalCancelOrder:any;
  TotalAllOrder:any;

  b2b:BsModalRef;
  b2c:BsModalRef;

  fileb2b:any;
  fileb2c:any;

  active_tab:any = 'readytoship';

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
  	) { this.checkparams() }

  message:any;

 checkparams(){
    var url = window.location.href.split("?");  
    if(url.length == 2){
      const urlParams = new URLSearchParams(url[1]);
    const payment_status = urlParams.get('payment_status');
    const msg = urlParams.get('msg');
    console.log("payment_status",payment_status);
    console.log("msg",msg);
    this.message = msg;
    if(payment_status == "success"){
      this.tostr.success(msg); 
    } else {
      this.tostr.error(msg); 
    }
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if('msg' in params && params['msg'] != ''){
          setTimeout(() => {
                 if(params['msg'].includes('successfully') || params['msg'].includes('Successfully'))
                {
                  this.tostr.success(params['msg']);  
                }else{
                  this.tostr.error(params['msg']); 
                }
          })
      }
  });
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
    //this.router.navigate(['/allorder']);
    this.Loader = this.loader.hide();
  	this.getbadgecountData();
  }

go_to_order(){this.router.navigate(['/addorder/']);}
go_to_b2b(){this.router.navigate(['/b2border/']);}
go_to_add_bulk(){this.router.navigate(['/bulkorder/']);}
go_to_All_order(){this.router.navigate(['/allorder/']);}
go_to_channel(){this.router.navigate(['/channel/']);}

  go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

click_change(link)
{
    this.router.navigate(['/allorder/'], { queryParams: { act: link } });
  // if(link == "readytoship")
  // {
  //   this.getbadgecountData();
  // }
}



    getbadgecountData()
  {
  	this.Loader = this.loader.show();
    let json:any ={
      limit:"",
      page_no:"",
      start_date:"",
      end_date:"",
      order_by:"",
      avn_service:"",
      status_code:"",
      active_tab:"",
      order_id:"",
    
    };
    this.client.All_orders(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
           this.TotalProcessOrder=obj.result.ordercount.totalprocessorder;
           this.TotalReadytoShip=obj.result.ordercount.totalreadytoship;
           this.TotalReadyToPickOrder=obj.result.ordercount.totalreadytopickorder;
           this.TotalIntransitOrder=obj.result.ordercount.totalintransitorder;
           this.TotalinCompleteOrder=obj.result.ordercount.totalincompleteorder;
           this.TotalCancelOrder=obj.result.ordercount.totalcancelorder;
           this.TotalAllOrder=obj.result.ordercount.totalallorder;
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

  b2bsheet:any;
  b2csheet:any;
  open_b2b(modal)
  {
    this.client.download_b2b_sample(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.b2bsheet = obj.result;
      }
      else
      {
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
    this.b2b = this.modalService.show(modal,
    {
      class:"modal-sm"
    })
  }
  close_b2b()
  {
    this.b2b.hide();
  }

  dowload_b2b()
{
  window.open(this.b2bsheet);
}

resData:any;
  submit(f)
  {
      if(f.valid)
    {
      var url = localStorage.getItem('apiurl');
     const a: any = ( < HTMLInputElement > document.getElementById('b2bexcel_file')).files;
    const payload = new FormData();
        this.Loader = this.loader.show();
         // payload.append("app_token" , localStorage.getItem("token"));
          payload.append("b2bexcel_file" , a[0]);
      this.http
      .post(url+"/orders/upload_b2b",
        payload, 
        { 
          headers: 
          {
            'Authorization': localStorage.getItem("token"),
            } 
        }).subscribe((data:any) => {
            this.Loader = this.loader.hide();  
            this.resData = data;
            var obj = this.resData;
            if (obj.status == 200) 
            {
              this.tostr.success(obj.message);           
              this.getbadgecountData();
              this.close_b2b();
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

  open_b2c(modal)
  {

    this.client.download_b2c_sample(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.b2csheet = obj.result;
      }
      else
      {
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });

    this.b2c = this.modalService.show(modal,
    {
      class:"modal-sm"
    })
  }

dowload_b2c()
{
  window.open(this.b2csheet);
}

  close_b2c()
  {
    this.b2c.hide();
  }


resData1:any;
  submit_b2c(g)
  {
    if(g.valid)
    {
      var url = localStorage.getItem('apiurl');
      const a: any = ( < HTMLInputElement > document.getElementById('b2cexcel_file')).files;
      const payload = new FormData();
      this.Loader = this.loader.show();       
      payload.append("b2cexcel_file" , a[0]);
      this.http.post(url+"/orders/uploadb2c",
      payload, 
      { 
        headers: 
        {
          'Authorization': localStorage.getItem("token"),
        } 
      }).subscribe((data:any) => {
         this.Loader = this.loader.hide();  
          this.resData1 = data;
          var obj = this.resData1;
          if (obj.status == 200) 
          {
            this.tostr.success(obj.message);
            this.close_b2c();
            this.router.navigate(['/allorder/'], { queryParams: { act: 'processing_orders',ref:'y'}});
          }else 
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

parent_count(data){ this.TotalReadytoShip = data; }
process_count(data){ this.TotalProcessOrder = data; }
readypic_count(data){ this.TotalReadyToPickOrder = data; }
intransit_count(data){ this.TotalIntransitOrder = data; }
complete_count(data){ this.TotalinCompleteOrder = data; }
cancell_count(data){ this.TotalCancelOrder = data; }
All_order_count(data){ this.TotalAllOrder = data; }

}
