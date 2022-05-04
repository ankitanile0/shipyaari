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
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.css']
})
export class TrackDetailsComponent implements OnInit {
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

   // this.id="283943663868";

    this.get_track_data();
  }


copy_url()
{
  // var url:any = window.location.href;
  // console.log(url);
  // url.select();
  // document.execCommand('copy');
  // url.setSelectionRange(0, 0);

var dummy = document.createElement('input'),
text = window.location.href;

document.body.appendChild(dummy);
dummy.value = text;
dummy.select();
document.execCommand('copy');
document.body.removeChild(dummy);
alert("Url Copied !!")

}

track_data:any;
track_no:any;
cycle:any;
edd_date:any;
edd_year:any;
edd_month:any;
edd_dayName:any;
curr_status:any;
partner_name:any;
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
          this.curr_status = obj.result.result.current_status;
          this.partner_name = obj.result.result.courier_name;
          var estimatedDate = obj.result.result.estimate_date_con;
          var datenumber = obj.result.result.estimate_date;
          
          var split_date = datenumber.split("-");
          var month = split_date[1];
          this.edd_month = this.getMonthName(month);
          if(split_date[2].length > 2)
          {
          this.edd_year = split_date[2];
          this.edd_date = split_date[0];
          }
          else{
          this.edd_year = split_date[0];
          this.edd_date = split_date[2]; 
          }
          
          var day = estimatedDate.split("("); 
           day = day[1].split(")");
           this.edd_dayName = this.getDayName(day[0]); 
          console.log(day);
          
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

getMonthName(data:any)
{
  if(data == '01')
  { 
    data = "January"  
    return data;
  }
  if(data == '02')
  { 
    data = "February"  
    return data;
  }
  if(data == '03')
  { 
    data = "March"  
    return data;
  }
  if(data == '04')
  { 
    data = "April"  
    return data;
  }
  if(data == '05')
  { 
    data = "May"  
    return data;
  }
  if(data == '06')
  { 
    data = "June"  
    return data;
  }
  if(data == '07')
  { 
    data = "July"  
    return data;
  }
  if(data == '08')
  { 
    data = "August"  
    return data;
  }
  if(data == '09')
  { 
    data = "September"  
    return data;
  }
  if(data == '10')
  { 
    data = "October"  
    return data;
  }
  if(data == '11')
  { 
    data = "November"  
    return data;
  }
  if(data == '12')
  { 
    data = "December"  
    return data;
  }  
}

getDayName(day)
{
  if(day == "Sun")
  {
    day = "Sunday"; return day;
  }
  if(day == "Mon")
  {
    day = "Monday"; return day;
  }
  if(day == "Tue")
  {
    day = "Tuesday"; return day;
  }
  if(day == "Wed")
  {
    day = "Wednesday"; return day;
  }
  if(day == "Thu")
  {
    day = "Thursday"; return day;
  }
  if(day == "Fri")
  {
    day = "Friday"; return day;
  }
  if(day == "Sat")
  {
    day = "Saturday"; return day;
  }
}


}

