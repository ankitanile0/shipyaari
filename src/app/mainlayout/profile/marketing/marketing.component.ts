import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {

  Loader:any;
  Marketing_Profile_Logo:any;
  Ship_Label_Image: any;
  Brand_Name: any;

  url1:any;
  url2:any;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private http: HttpClient,
    private tostr:ToastrService,
    private loader:LoaderService,
  ) { }

  ngOnInit(): void {
  this.getProfileData();
  }

 upload1(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url1 = event.target.result; 
      }
    } 
  }

 upload2(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url2 = event.target.result; 
      }
    } 
  }  

  getProfileData()
  {
    let json:any ={
      user_id:localStorage.getItem("roleid"),
      app_token:localStorage.getItem("token"),
      type:"marketing"
    };
    this.client.getProfile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
         this.Marketing_Profile_Logo=obj.result.marketingdetails.marketing_profile_logo;
         this.Ship_Label_Image=obj.result.marketingdetails.ship_label_image;
         this.Brand_Name=obj.result.marketingdetails.brand_name ;
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
  }

resData:any;
  submit(f)  {
    var url = localStorage.getItem('apiurl');
    this.Loader = this.loader.show();
   const a:any = ( < HTMLInputElement > document.getElementById('logofile')).files;
   const b:any = ( < HTMLInputElement > document.getElementById('labelfile')).files;
      const payload = new FormData();
      
         payload.append("user_id" ,localStorage.getItem("roleid"));
         payload.append("app_token" ,localStorage.getItem("token"));
         payload.append("marketing_profile_logo" , a[0]);
         payload.append("ship_label_image", b[0]);
         payload.append("brand_name",this.Brand_Name);

      this.http
      .post(url+"/profile/updatemarketingdetails",
        payload, {
          headers: {
            'Authorization': localStorage.getItem("token"),
        } }
      ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();  
                  this.resData = data;
                  var obj = this.resData;
                if (obj.status == 200) {
                   this.tostr.success(obj.message);
                      this.getProfileData();      
                }else 
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
