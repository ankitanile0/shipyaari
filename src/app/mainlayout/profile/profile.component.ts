import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


       Client_Id:any;
       Full_Name:any;
       Balance_Amount:any;
       User_Image:any;
       usercount:any;


  constructor(
  	 private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private loader: LoaderService,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private tostr:ToastrService
  	) { }

  ngOnInit(): void {
  this.getProfileData();
  }

  go_to_home()
  {
    this.router.navigate(['/dashboard/']);
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
      console.log("getProfile",obj);
      if (obj.status == 200) {
  
         this.Client_Id=obj.result.profiledetails.client_id;
         this.Full_Name=obj.result.profiledetails.full_name;
         this.Balance_Amount=obj.result.profiledetails.balance_amount ;
         this.User_Image=obj.result.profiledetails.user_image;
         this.usercount = obj.result.userprofileper;
         console.log("usercount",this.usercount);
         }
         if(obj.message.includes("authToken"))
         {
           this.router.navigate(['/signin/'+obj.message]);
         }
    });
  }

}
