import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  AllCoupoun:any[]=[];
  yaaripointtable:any;
  refrealcode:any;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
  ) { }

  ngOnInit(): void {
    this.getProfileCoupounData();
  }

  getProfileCoupounData()
  {
    let json:any ={
      user_id:localStorage.getItem("roleid"),
      app_token:localStorage.getItem("token"),
      type:"my_coupons"
    };
    this.client.getProfile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        if (obj.result.coupondata.allcoupon[0]==undefined){}
         else{
           this.AllCoupoun=obj.result.coupondata.allcoupon;
           this.yaaripointtable = obj.result.YaariPointSlab;
           this.refrealcode = obj.result.companydetails.referral_code;
         }
       }
         if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
  }

}
