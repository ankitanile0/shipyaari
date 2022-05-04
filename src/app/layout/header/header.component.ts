import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { DateFormatService } from 'src/app/services/date-format.service';


declare var window;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Loader:String;
  Client_Id:any;
  Full_Name: any;
  Balance_Amount: any;
  User_Image:any;
  Marketing_Profile_Logo: any;
  Consignment_Wallet: any;
  Ship_Label_Image: any;
  Company_Name: any;
  Website : any;
  Contact_Number : any;
  Email : any;
  Referral_Code : any;
  yaariPonts:any;
  cons_wallet:any;
  bal_amt:any;
  point:any;
  total:any;
  slabamt:any;

  
  CheckAvail:BsModalRef;
  yaariPoints:BsModalRef;
  serviceList:any;
  serviceId:any;
  pin:any;
  checkPin:BsModalRef;
  pin_detail_list:any;
  tracking_ID:any;
  trackingData:BsModalRef;
  dailytracnsction:BsModalRef;
  transaction_history_List:any;
  recharge:BsModalRef;
  weight_List:any;
  selected_weight:any;
  searchModal:BsModalRef;
  search_data:any;
  amount_List:any;
  amount1:any = "1";

 pickup_pincode:any;
 delivery_pincode:any;
 package_id:any;
 payment_mode:any = " ";
 weight:any;
 invoice_value:any;
 length:any;
 height:any;
 width:any;
  

avn_shipping_id:any;
consignment_date:any;
contact_number:any;
customer_contact_no:any;
customer_name: any;
delivery_address: any;
delivery_date: any;
dimension: any;
id: any;
kgs:any;
no_of_packages:any;
package_content_desc:any;
package_weight: any;
pickup_address: any;
pickup_company_name: any;
pickup_contact_number: any;
service_name: any;
status_name: any;
tracking_number: any;

 coupon_w_code:any;
 coupon_w_desc:any;
 eligible_cod_amount:any;
 existCouponCheckCount:any;
 wallet_amount:any;

usercount:any;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private loader: LoaderService,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private tostr:ToastrService,
       private datechange:DateFormatService,
  ) { }

  ngOnInit(): void {
    this.getProfileData();
    this.Show_balance();
    this.getsService();
    this.get_weight();
    this.get_amount();
    this.get_data_reaharge();
    this.regular();
  }

regular()
{
  setTimeout(() => {
    this.get_data_reaharge();
}, 1000);
}



percentcount:any;
  getProfileData()
  {
   
    let json:any ={
      user_id:localStorage.getItem("roleid"),
      app_token:localStorage.getItem("token"),
      type:"my_profile"
    };
    this.client.getProfile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Client_Id=obj.result.profiledetails.client_id;
        this.Full_Name=obj.result.profiledetails.full_name;
        this.Balance_Amount=obj.result.profiledetails.balance_amount ;
        this.User_Image=obj.result.profiledetails.user_image;
        this.usercount = obj.result.userprofileper;
        this.percentcount = this.usercount.totalprofileper
        if(this.Full_Name.length > 25){
           this.Full_Name = this.Full_Name.slice(0, 20);
           this.Full_Name = this.Full_Name+'...';
        } else {
            this.Full_Name=obj.result.profiledetails.full_name;
        }
      } if(obj.message.includes("authToken")) { this.router.navigate(['/signin/'+obj.message]); }
    });
  }

getsService()
{
  this.client.get_service(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
            this.serviceList = obj.result;
            //console.log(this.serviceList);
         }
         if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
}

get_weight()
{
  this.client.get_weight(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
            this.weight_List = obj.result;
           
            //console.log(this.weight_List);
         }
         if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
}

get_amount()
{
  this.client.fetch_amount(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
            this.amount_List = obj.result;
            //console.log(this.amount_List);
          
         }
         if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
  
}

get_data_reaharge()
{
  this.client.fetch_data_for_wallet(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
           this.coupon_w_code = obj.result.coupon_w_code;
            this.coupon_w_desc = obj.result.coupon_w_desc;
            this.eligible_cod_amount = obj.result.eligible_cod_amount;
            this.existCouponCheckCount = obj.result.existCouponCheckCount;
            this.wallet_amount = obj.result.wallet_amount;
          
         }
         if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
}

  Logout(){
    var json ={
      "token":localStorage.getItem('token')
    }
    this.client.Logout(json)
    .subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
              localStorage.removeItem('token');
              localStorage.removeItem('roleid');
              //this.router.navigate(['/signin/'+obj.message]);
              window.location.href = "https://seller.shipyaari.com/client/siteadmin/users/userLogout";
              //window.open("https://seller.shipyaari.com/client/siteadmin/users/userLogout")
             
          }
          else
          {                
            this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
        },
     
    );
 }

 go_to_profile()
 {
   this.router.navigate(['/profile']);
 }

 go_to_passbook()
 {
   this.router.navigate(['/passbook']);
 }

 CheckAvalability(modal)
 {
   this.CheckAvail = this.modalService.show(modal,
   {
     class:"",
   });
 }

 closeAvail()
 {
   this.CheckAvail.hide();
 }

Show_balance()
{
  this.client.header_data(localStorage.getItem("token")).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
             this.yaariPonts = obj.result.yariinfi;
             this.yaariPonts = parseFloat(this.yaariPonts)
             this.cons_wallet = obj.result.balanceinfo.consignment_wallet;
             this.bal_amt = obj.result.balanceinfo.balance_amount;
          }
          else
          {                
            this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
        },
     
    );
}

yaariModal(modal)
{
  this.yaariPoints = this.modalService.show(modal,
  {
    class:"",
  });
}
paytm(){
  var data = {
    "coupon_w_code" : this.coupon,
    "selected_amount" : this.amount1
  };
  this.client.paytm_gateway(data).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);
          if(obj.status == 200){
            var config = {
                "root": "",
                "flow": "DEFAULT",
                "merchant":{
                    "name":"Shipyaari",
                    "logo":"<?php echo base_url(); ?>/themes/assets/images/svgs/shipyaariicon.png"
                },
                "data": {
                    "orderId": obj.result.orderid,
                    "token": obj.result.token,
                    "tokenType": "TXN_TOKEN",
                    "amount": obj.result.amount
                },
                "handler":{
                    "notifyMerchant": function (eventName, data) {
                        if(eventName == 'SESSION_EXPIRED'){
                            alert("Your session has expired!!");
                            location.reload();
                        }
                    }
                }
            };
            //this.CheckStatus(obj.result.orderid,obj.result.token,obj.result.amount);
            if (window.Paytm && window.Paytm.CheckoutJS) {
                window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                    window.Paytm.CheckoutJS.invoke();
                    
                }).catch(function onError(error) {
                });
            }
            this.ngOnInit()
          }
        },
     
    );
}
closeYaari()
{
  this.yaariPoints.hide();
}

msg:any;
num1:any;
num2:any;
sum:any;
line:String;
point_Calculator()
{
   // if(this.point < 1000001)
   //     {
        //if(this.point <= this.yaariPonts)
           if(this.point > 0)
        {
            
             if(this.point >= 0 && this.point <=10)
             {
               this.num2 = 0.2;
               this.calc(this.num2);
             }
              if(this.point >= 11 && this.point <=30)
             {
               this.num2 = 0.3;
               this.calc(this.num2);
             } 
              if(this.point >= 31 && this.point <=100)
             {
               this.num2 = 0.5;
               this.calc(this.num2);
             } 
              if(this.point >= 101 && this.point <=500)
             {
               this.num2 = 0.7;
               this.calc(this.num2);
             } 
              if(this.point >= 501 && this.point <=2500)
             {
               this.num2 = 0.9;
               this.calc(this.num2);
             } 
              if(this.point >= 2501 && this.point <=10000)
             {
               this.num2 = 1;
               this.calc(this.num2);
             }
              if(this.point >= 10001 && this.point <=50000)
             {
               this.num2 = 1.5;
               this.calc(this.num2);
             }
              if(this.point >= 50001 && this.point <=100000)
             {
               this.num2 = 2;
               this.calc(this.num2);
             }
              if(this.point >= 100001 && this.point <=1000000)
             {
               this.num2 = 2.5;
               this.calc(this.num2);
             }
             if(this.point >= 1000001)
               {
                 this.calc(this.num2);
               }
        }
}

calc(temp)
{
  console.log(this.point);
      this.msg = 1

      if(this.point >=1000001)
      {
        temp = 0;
      }

      this.num1 = this.point;
      this.sum = this.num1*temp;
      this.sum = this.sum.toFixed(2);
      this.sum = this.sum.toString();
      this.num1 = this.num1.toString();
      temp = temp.toString();
      var v = this.num1+" X "+temp+" = ₹ "+this.sum;
      this.line = JSON.stringify(v);
     // console.log(v);
      this.line = this.line.replace(/^"(.*)"$/, '$1');
        
      if(this.point == "")
      {
         this.line = "";
      }
}

redeem_Points()
{
   if(this.point <= this.yaariPonts)
        {
            var json = 
            {
              availabile_pts:this.yaariPonts,
              redeem_pts:this.point,
              blnc:this.cons_wallet,
            }
            this.client.redeem_points(json).subscribe((data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
            this.Loader = this.loader.hide();            
            this.tostr.success(obj.message);
            this.closeYaari()
            this.Show_balance()
          }
          else
          {    
            this.Loader = this.loader.hide();            
            this.tostr.error(obj.message);
            this.closeYaari()
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
         }
         else
         {
           this.msg = 3;
         }
}

resetval()
{
this.msg = 0;
this.num1="";
this.num2="";
this.sum="";
this.line="";
}

show_data:any = 0;
check_submit(f,modal)
{
  if(f.valid == true)
  {
    this.search_data = null;
    this.Loader = this.loader.show();
    this.searchModal = this.modalService.show(modal,{
    class:"modal-xl",
  })
  this.closeAvail();
  var json = {
  pickup_pincode: this.pickup_pincode,
  delivery_pincode: this.delivery_pincode,
  package_id: this.serviceId,
  payment_mode: this.payment_mode,
  weight: this.selected_weight,
  invoice_value: this.invoice_value,
  length: this.length,
  height: this.height,
  width: this.width,
  }
  this.client.search_Service(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
              this.search_data = obj.result;
             this.Loader = this.loader.hide();
          }
          else
          {    
            this.Loader = this.loader.hide();            
            this.tostr.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
 }
 else
 {
   this.tostr.error("Fill details Properly");
 }
}

close_search()
{
  this.searchModal.hide();
}




checkpin(modal)
{
  if(this.pin != null && this.pin != '' )
  {
  this.Loader = this.loader.show();
  var json = 
  {
    pincode:this.pin,
  }
  this.client.check_Pin(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
             this.pin_detail_list = obj.result;
             this.Loader = this.loader.hide();
          }
          else
          {    
            this.Loader = this.loader.hide();            
            this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });

  this.checkPin = this.modalService.show(modal,{
    class:"modal-lg",
  })
}
else{
  this.tostr.error("Please Enter Pincode");
}
 
}

closePin()
  {
  this.checkPin.hide();
  this.pin = "";
  }

trackflag:any = 0;
tracking_details(modal)
{ 
  if(this.tracking_ID != null && this.tracking_ID != '')
  {
  this.Loader = this.loader.show();
  var json = 
  {
    tracking_id:this.tracking_ID,
  }
  this.client.Track_Data(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
              this.avn_shipping_id = obj.result.avn_shipping_id;
              this.consignment_date = obj.result.consignment_date;
              this.contact_number = obj.result.contact_number;
              this.customer_contact_no = obj.result.customer_contact_no;
              this.customer_name = obj.result.customer_name;
              this.delivery_address = obj.result.delivery_address;
              this.delivery_date = obj.result.delivery_date;
              this.dimension = obj.result.dimension;
              this.id = obj.result.id;
              this.kgs = obj.result.kgs;
              this.no_of_packages = obj.result.no_of_packages;
              this.package_content_desc = obj.result.package_content_desc;
              this.package_weight = obj.result.package_weight;
              this.pickup_address = obj.result.pickup_address;
              this.pickup_company_name = obj.result.pickup_company_name;
              this.pickup_contact_number = obj.result.pickup_contact_number;
              this.service_name = obj.result.service_name;
              this.status_name = obj.result.status_name;
              this.tracking_number = obj.result.tracking_number;
              this.Loader = this.loader.hide();

              


             if(obj.message == "Data not found")
             {
               this.trackflag =1;
             }
          }
          else
          {    this.trackflag =1;
            this.Loader = this.loader.hide();            
            this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });

  this.trackingData = this.modalService.show(modal,
  {
    class:"modal-lg",
  })
}
else
{
  this.tostr.error("Please enter tracking number")
}

}

close_tracking_details()
{
  this.trackingData.hide();
  this.tracking_ID = '';
} 

transaction_history(modal)
{
  this.Loader = this.loader.show();
  this.client.today_transaction(localStorage.getItem("token")).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
              this.transaction_history_List = obj.result;
             this.Loader = this.loader.hide();
          }
          else
          {    
            this.Loader = this.loader.hide();            
            this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });

  this.dailytracnsction = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
  
}

close_transaction_history()
{
  this.dailytracnsction.hide();
}

wallet_recharge(modal)
{

  this.recharge = this.modalService.show(modal,{
    class:"",
  })
}

close_wallet_recharge()
{
  this.recharge.hide();
}

transaction_passbook()
{
  this.close_transaction_history();
  this.router.navigate(['/passbook/']);
}

trans_to_wallet()
{
  var json = 
  {
    amount_id:this.amount1
  }
  this.client.trasferto_wallet(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
           this.close_wallet_recharge();
             this.tostr.success(obj.message);
             this.ngOnInit()
          }
          else
          {    
            this.tostr.error(obj.message);
            this.Loader = this.loader.hide();            
            //this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
}

coupon:any;
validate_coupon()
{
  if(this.amount1 != "")
  {
    var json =
    {
      coupon: this.coupon,
      recharge_amount_id: this.amount1,
      existcoupon: this.existCouponCheckCount,
      returntocall: 0,
    }
    console.log(json);
    this.client.validate_coupone(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
             this.tostr.success(obj.message);
          }
          else
          {    
            this.tostr.error(obj.message);
            this.Loader = this.loader.hide();            
            //this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
  }
  else
  {
    this.tostr.error("Please Select Amount")
  }
}

Adjust_cod_amt()
{
  var json = 
  {
    amount_id:this.amount1
  }
  this.client.adjust_cod(json).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
           this.close_wallet_recharge();
             this.tostr.success(obj.message);
             this.ngOnInit()
          }
          else
          {    
            this.tostr.error(obj.message);
            this.Loader = this.loader.hide();            
            //this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
}

get_wallet_data()
{
  this.client.get_wallet_data(localStorage.getItem('token')).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
            
          }
          else
          {    
            this.tostr.error(obj.message);
           
            //this.alertService.error(obj.msg);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
}

payradio:any = false;


online()
{
  //console.log(this.payradio);
 
  //paytm_gateway
}

submitRecharge()
{
  this.ngOnInit();
}


move_to_old()
{
  this.client.move_to_old(localStorage.getItem('token')).subscribe(
      (data:any) => {
          var response= data._body; 
          var obj=JSON.parse(response);            
          if (obj.status == 200) {                
            window.location.href=obj.url;
          }
          else
          {    
            this.tostr.error(obj.message);
          }
          if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
}

}
