import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  flag:any;
  color:any;
  border:any;
  defaultvalue:any;
  RunningPlan:any;

  plandetails:BsModalRef;
  plan_group:any;
  user_plan:any;
  subscription_invoice:any;
  subscription_details:any;
  group_title:any;
  plan_invoice_history:any;

  Seletec_plan_Id:any = '';
  plantypeId:any;

  plan:any;
  duration:any;
  purchasedata:any;
  startdate:any;
  enddate:any;
  expirydate:any; 
  paiddeposit:any;
  paidsubscribe:any;
  balance:any;
  remDay:any;
  remAmount:any;
  PriceforOneDay:any;

  divShow:any = 0;
 

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
     private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  this.getProfileData()
  }

  getProfileData()
{
  let json:any ={
    user_id:localStorage.getItem("roleid"),
    app_token:localStorage.getItem("token"),
    type:"subscription_info"
  };
  this.client.getProfile(json).subscribe((data: any) => {
    var response = data._body;
    var obj = JSON.parse(response);
    if (obj.status == 200) {
     this.plan_group = obj.result.subscriptionindodetails.plan_group;
     this.user_plan = obj.result.subscriptionindodetails.user_plan;
     this.subscription_invoice = obj.result.subscriptionindodetails.subscription_invoice;
     this.subscription_details = obj.result.subscriptionindodetails.subscription_details;
     this.group_title = obj.result.subscriptionindodetails.plan_title;
     this.plan_invoice_history = obj.result.subscriptionindodetails.subscription_invoice;

      var a = obj.result.subscriptionindodetails.plan_group_array.plan;
      var b = a.split("(");
      var c = b[1].replace(")", '')
      this.duration = c;

      this.purchasedata = obj.result.subscriptionindodetails.plan_group_array.plan_purchase_date;
      this.startdate = obj.result.subscriptionindodetails.plan_group_array.start_date;
      this.enddate = obj.result.subscriptionindodetails.plan_group_array.end_date;
      this.expirydate =  obj.result.subscriptionindodetails.plan_group_array.expiry_due_date;
      this.paiddeposit = obj.result.subscriptionindodetails.plan_group_array.paid_deposite_amount;
      this.paidsubscribe = obj.result.subscriptionindodetails.plan_group_array.paid_subscription_amount;
      this.balance = obj.result.subscriptionindodetails.plan_group_array.balance_amount;
      //this.remDay= obj.result.subscriptionindodetails.plan_group_arra.remaining_days;
      this.remAmount= obj.result.subscriptionindodetails.plan_group_array.remaining_amount;
      this.PriceforOneDay= obj.result.subscriptionindodetails.plan_group_array.price_for_one_day;
      this.plantypeId = obj.result.subscriptionindodetails.plan_group;
      this.flag = obj.result.subscriptionindodetails.flag;
      this.defaultvalue = obj.result.subscriptionindodetails.plan_group[0].plan_data[0].subscription_amount;
      this.RunningPlan = obj.result.subscriptionindodetails.plan_group[0].plan_data[0].plan_type;
     
      this.selected_Plan();
    }
  });
}

openPlan(modal)
{
  this.plandetails = this.modalService.show(modal,
  {
    class:"",
  })
}

closeModal()
{
  this.plandetails.hide();
}

view_receipt(id:any)
{
 var json = 
 {
    invoice_id:id,
    type:"invoice"
 }
  this.client.subscription_receipt(json).subscribe((data:any) =>{
     var response = data._body;
    var obj = JSON.parse(response);
    if (obj.status == 200) {
      window.open(obj.result);
    }
  });
}

view_invoice(id:any)
{
  var json = 
  {
    invoice_id:id
  }
  this.client.subscription_invoice(json).subscribe((data:any) =>{
     var response = data._body;
    var obj = JSON.parse(response);
    if (obj.status == 200) {
      window.open(obj.result);
    }
  });
}


ShowDiv()
{
  this.divShow = 1;
}

HideDiv()
{
  this.divShow = 0;
}

selected_Plan()
{
   console.log("Papul " + this.RunningPlan);

  const e: any = ( < HTMLInputElement > document.getElementById('plan'));
  var id = e.options[e.selectedIndex].value;
  //console.log(id);
  //Default
  if(id == '')
  {
    this.Seletec_plan_Id = "Rs. "+this.defaultvalue;
  }
   if(id == this.RunningPlan)
  {
    this.Seletec_plan_Id = "Rs. "+this.defaultvalue;
  }
  if(id == 2)
  {
    this.Seletec_plan_Id = "Rs.27965/-";
  }
  if(id == 3)
  {
    this.Seletec_plan_Id = "Rs.20335/-";
  }
  if(id == 4)
  {
    this.Seletec_plan_Id = "Rs.27965/-";
  }
  
}

}
