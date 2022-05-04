import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';

@Component({
  selector: 'app-sms-temp',
  templateUrl: './sms-temp.component.html',
  styleUrls: ['./sms-temp.component.css']
})
export class SmsTempComponent implements OnInit {

  picked: any;
  dispatch: any;
  online: any;
  delivered: any;
  smsTemplaeteData: any;
  picked1: any;
  dispatch1: any;
  online1: any;
  delivered1: any;
  picked_up_sms_template: any;
  dispatch_sms_template: any;
  online_outcod_sms_template: any;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  submit(f)  {
    if(f.valid){
      var json={
        "user_id":localStorage.getItem("roleid"),
        "app_token":localStorage.getItem("token"),
        "picked_up_sms_template":this.picked,
        "dispatch_sms_template":this.dispatch,
        "online_outcod_sms_template":this.online,
        "delivered_sms_template":this.delivered
      }
      var json1 = JSON.stringify(json);
      console.log(json1);
      this.client.sms_template_of_profile(json1)   
          .subscribe(
            (data:any) => {
                var response= data._body;                
                var obj=JSON.parse(response);
               // console.log(obj);
               // console.log(obj.status);
                 if (obj.status == 200) {                
                   //this.router.navigate(['/dashboard']);
                   window.alert(obj.message);
                 } 
                 else {
                  window.alert(obj.msg);
                  
                 }
                 if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
              },
          ); 
    }
}

getProfileData()
{
  let json:any ={
    user_id:localStorage.getItem("roleid"),
    app_token:localStorage.getItem("token"),
    type:"sms_template"
  };
  this.client.getProfile(json).subscribe((data: any) => {
    var response = data._body;
    var obj = JSON.parse(response);
    if (obj.status == 200) {
      this.picked1=obj.result.smstemplatedetails.picked_up_sms_template ;
      this.dispatch1= obj.result.smstemplatedetails.dispatch_sms_template ;
      this.online1=obj.result.smstemplatedetails.online_outcod_sms_template ;
      this.delivered1=obj.result.smstemplatedetails.delivered_sms_template ;
      /*for ng Model*/ 
      this.picked=obj.result.smstemplatedetails.picked_up_sms_template;
      this.dispatch =obj.result.smstemplatedetails.dispatch_sms_template;
      this.online =obj.result.smstemplatedetails.online_outcod_sms_template;
      this.delivered =obj.result.smstemplatedetails.delivered_sms_template;
    }
  });
}

}
