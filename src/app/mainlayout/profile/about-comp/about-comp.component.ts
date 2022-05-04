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
  selector: 'app-about-comp',
  templateUrl: './about-comp.component.html',
  styleUrls: ['./about-comp.component.css']
})
export class AboutCompComponent implements OnInit {

  Loader:string;
  limit:BsModalRef;
  history:BsModalRef
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
  Increaseamount:any;
  credit_limit_History:any;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
    private tostr:ToastrService,
     private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

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
         this.Marketing_Profile_Logo=obj.result.profiledetails.marketing_profile_logo ;
         this.Consignment_Wallet=obj.result.profiledetails.consignment_wallet;
         this.Ship_Label_Image=obj.result.profiledetails.ship_label_image ;
         this.Company_Name=obj.result.companydetails.company_name ;
         this.Website=obj.result.companydetails.website;
         this.Contact_Number=obj.result.companydetails.contact_number ;
         this.Email=obj.result.companydetails.email;
         this.Referral_Code=obj.result.companydetails.referral_code;
         this.credit_limit_History = obj.result.Increase_Credit_Limit_Req_Hist;
         }
    });
  }

  openModal(modal)
  {
    this.limit = this.modalService.show(modal,
    {
     class: "modal-sm",
    })
  }

  closemodal()
  {
    this.limit.hide();
  }

  submit(f)
  {
    this.Loader = this.loader.show();
    var json = {
      amount:this.Increaseamount
    }
    this.client.Increase_Limit(json).subscribe((data:any) =>
    {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.tostr.success(obj.message);      
        this.closemodal();
        this.getProfileData();
      }
      else{
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }       
      }
    });
  }

  openHistory(modal)
  {
    this.history = this.modalService.show(modal,
    {
      class:"modal-lg",
    });
  }

  closeHistory()
  {
    this.history.hide();
  }


resData:any;
  update_pic(){
   var url = localStorage.getItem('apiurl');
    const a: any = ( < HTMLInputElement > document.getElementById('profile_pic')).files;
  
       const payload = new FormData();
       this.Loader = this.loader.show();
     
          payload.append("profile_image" , a[0]);
        

      this.http
      .post(url+"/profile/updateprofilepic",
        payload, {
          headers: {
            'Authorization': localStorage.getItem("token"),
        } }
      ).subscribe(
              (data:any) => {
                  this.resData = data;
                  this.Loader = this.loader.hide();  
                  var obj = this.resData;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.getProfileData();                  
                  } 
                   else 
                   {
                     this.tostr.error(obj.message);                  
                     if(obj.message.includes("authToken"))
                       {
                         this.router.navigate(['/signin/'+obj.message]);
                       }
                   }     
                },
            );
   
    
  }

}
