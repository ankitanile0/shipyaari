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
  selector: 'app-temmp',
  templateUrl: './temmp.component.html',
  styleUrls: ['./temmp.component.css']
})
export class TemmpComponent implements OnInit {
id:any;

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
  	this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.get_track_data();
  }


track_data:any;
track_no:any;
cycle:any;
get_track_data()
{
	var json =
	{
		tracking_number:this.id
	}
	this.client.get_track_details(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.track_data = obj.result.result;
          this.track_no = obj.result.tracking_number;
          this.cycle = obj.result.cycle;

          this.orderID = this.track_data.client_order_id;
          this.name = this.track_data.customer_name; 
          this.contact = this.track_data.customer_contact_no; 
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

notifymodal:BsModalRef;
notifyModal(modal)
{
  this.notifymodal = this.modalService.show(modal,
  {
    class:"",
  })
}

closeNotify()
{
  this.notifymodal.hide();
}

orderID:any
name:any;
message:any;
reason:any;
contact:any;
submit(f)
{
  if(f.valid)
  {
    var json = {
    tracking_number:this.track_no,
    customer_name:this.name,
    customer_contact_no:this.contact,
    client_order_id:this.orderID,
    issue:this.reason,
    comment:this.message
    }
    this.client.submit_notify(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.tostr.success(obj.message);
         this.closeNotify();
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

mobile:any;
latestMobile:any;
latestTrackno:any;
submitMobile(g)
{
  if(g.valid)
  {
    var json = {
     mobileno:this.mobile,
     tracking_number:this.track_no
   }
   this.client.update_mobile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        // this.tostr.success(obj.message);
       
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

otp:BsModalRef;
otpModal(modal)
{
  if(this.mobile != '' && this.mobile.length == 10)
  {
    this.otp = this.modalService.show(modal,
    {
      class:"modal-sm",
    })
  }
}

closeotpModal()
{
  this.otp.hide();
}

onetimepass:any;

submitotp()
{
  if(this.onetimepass != '' && this.onetimepass.length == 4)
  {
  var json = {
    mobileno:this.mobile,
    tracking_number:this.track_no,
    mobileOtp:this.onetimepass,
  }
  this.client.verify_otp(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        // this.tostr.success(obj.message);
        this.tostr.success(obj.message);
        this.closeotpModal();
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
  else{
    this.tostr.error("Enter Valid Otp");
  }
}

buyitagin()
   {
     var json = 
     {
         customer_name:this.name,
         customer_contact_no:this.contact,
         tracking_number:this.track_no,
         client_order_id:this.orderID,
     }
     this.client.buy_it_again(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       
        this.tostr.success(obj.message);
        
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
