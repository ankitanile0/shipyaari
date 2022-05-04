import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';


@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

  Loader:string;
  Reg_Mail_Switch: boolean = false;
  Reg_Phone_Switch:  boolean = false;
  Account_mail_switch: boolean = false;
  Acc_Phone_Switch: boolean = false;
  Ops_Mail_Switch:  boolean = false;
  Ops_Phone_Switch:  boolean = false;
   Buyitmail:  boolean = false;
  Feedbackmail:  boolean = false;

  Email:any;
  Contact_Number: any;
  Account_Email: any;
  Account_Phone_No: any;
  Operation_Email: any;
  Operation_Mobile: any;
 

 switch1:boolean = true;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private tostr:ToastrService,
    private loader:LoaderService,
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData()
  {
    let json:any ={
      user_id:localStorage.getItem("roleid"),
      app_token:localStorage.getItem("token"),
      type:"communication"
    };
    this.client.getProfile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Email=obj.result.communicationdetails.email;
         this.Reg_Mail_Switch = this.getBoolean(obj.result.communicationdetails.reg_mail_switch);
         this.Contact_Number = obj.result.communicationdetails.contact_number ;
         this.Reg_Phone_Switch = this.getBoolean(obj.result.communicationdetails.reg_phone_switch); 
         this.Account_Email = obj.result.communicationdetails.account_email ; 
         this.Account_mail_switch = this.getBoolean(obj.result.communicationdetails.acc_mail_switch);
         this.Account_Phone_No = obj.result.communicationdetails.account_phone_no ; 
         this.Acc_Phone_Switch = this.getBoolean(obj.result.communicationdetails.acc_phone_switch); 
         this.Operation_Email = obj.result.communicationdetails.operation_email ; 
         this.Ops_Mail_Switch = this.getBoolean(obj.result.communicationdetails.ops_mail_switch); 
         this.Operation_Mobile = obj.result.communicationdetails.operation_mobile ; 
         this.Ops_Phone_Switch = this.getBoolean(obj.result.communicationdetails.ops_phone_switch); 
         this.Buyitmail= this.getBoolean(obj.result.communicationdetails.buyitmail); 
         this.Feedbackmail= this.getBoolean(obj.result.communicationdetails.feedbackmail);  
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }

    });
  }

getBoolean(value){
   switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default: 
            return false;
    }
  }




  submit(f)  {   
      this.Loader = this.loader.show();
      var json={
        "user_id":localStorage.getItem("roleid"),
        "app_token":localStorage.getItem("token"),
        "email":this.Email,
        "reg_mail_switch":this.Reg_Mail_Switch,
        "contact_number":this.Contact_Number,
        "reg_phone_switch":this.Reg_Phone_Switch,
        "account_email":this.Account_Email,
        "acc_mail_switch":this.Account_mail_switch,
        "account_phone_no":this.Account_Phone_No,
        "acc_phone_switch":this.Acc_Phone_Switch,
        "operation_email":this.Operation_Email,
        "ops_mail_switch":this.Ops_Mail_Switch,
        "operation_mobile":this.Operation_Mobile,
        "ops_phone_switch":this.Ops_Phone_Switch,
        "buyitmail":this.Buyitmail,
        "feedbackmail":this.Feedbackmail,
         }
      
console.log(json);

      this.client.updating_communication_details(json)
          .subscribe(
            (data:any) => {
              this.Loader = this.loader.hide();
                var response= data._body; 
                console.log(response);
                var obj=JSON.parse(response);
                if (obj.status == 200) {
                     this.tostr.success(obj.message);
               } else {                    
                   this.tostr.error(obj.message);
                 }
                 if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
                  
              },
          );
          
    }
     
     



}
