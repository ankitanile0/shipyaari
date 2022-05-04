import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';



@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {

  RewardData:any;
  TotalRecord:any;
  Creadit_Amt:any;
  Subscription_Amt: any;
  Id: any;
  Coupon_Mode: any;
	Subtype: any;
	Is_Parent_Referral: any;
  Partner_Id: any;
  Service_Id: any;
  Payment_Mode: any;
  Shipment_Target: any;
  Coupon_Name: any;
  Start_Date: any;
  End_Date: any;
  Increase_Days: any;
  Coupon_Qty_Mode: any;
  Coupon_Type: any;
  Percentage: any;
  Offer_Amount: any;
  On_Amount: any;
  Reward_Amount: any;
  Reward_Type: any;
  Count: any;
  Email_Id: any;
  Subscription_Discount: any;
  Deposit_Discount: any;
  Status: any;
  Full_Name: any;
  Referral_Code: any;
  Wallet_Recharge: any;
  Users_Plan_Id: any;
  User_Id: any;
  Referral_User_Id: any;
  Rstatus: any;
  Subscription_amt: any;
  Creadit_amt: any;
  Invoice_Referral_User_Id: any;
  Invoice_User_Id: any;
  Creadit_Amt_Referral: any;  
  Table_RewardData:any[]=[];
  reward_table:any;


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

  getProfileData()
  {
    let json:any ={
      user_id:localStorage.getItem("roleid"),
      app_token:localStorage.getItem("token"),
      type:"my_reward"
    };
    this.client.getProfile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Creadit_Amt=obj.result.myreward.caldata.reward_amount;
         this.Subscription_Amt=obj.result.myreward.caldata.subscription_discount;
         this.Referral_Code=obj.result.myreward.referral_data.referral_code;
         this.Reward_Amount=obj.result.myreward.referral_data.reward_amount;
         this.Subscription_Discount=obj.result.myreward.referral_data.subscription_discount;
         this.Increase_Days=obj.result.myreward.referral_data.increase_days;
         this.Creadit_Amt=obj.result.myreward.referral_data.creadit_amt;
         this.Wallet_Recharge=obj.result.myreward.referral_data.wallet_recharge;
         this.RewardData = obj.data;
         this.reward_table = obj.result.myreward.referral_data;
         }
         // if (obj.result.ratio[0]==undefined){}
         // else{
         //   this.Table_RewardData=obj.result.ratio;
         // }
         if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
  }

}
