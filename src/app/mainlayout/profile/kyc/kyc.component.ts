import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

  Loader:any;
  Address1:any;
  Address2: any;
  landmark: any;
  pincode: any;
  city: any;
  state: any;
  country: any = "1";
  gst_no: any;
  pancard_no: any;
  aadhaar_card_or_electric_bill:any;
  gst_file :any;
  pan_number_file :any;
  address_proof_file:any;
  kycDetailsData:any;
  Address11:any;
  Address22: any;
  landmark1: any;
  pincode1: any;
  city1: any;
  state1: any = " ";
  country1: any;
  gst_no1: any;
  pancard_no1: any;
  aadhaar_card_or_electric_bill1:any;
  gst_file1 :any;
  pan_number_file1 :any;
  address_proof_file1:any;
  Address1_kyc_details:any;
  Address2_kyc_details: any;
  landmark_kyc_details: any;
  pincode_kyc_details: any;
  city_kyc_details: any;
  state_kyc_details: any;
  country_kyc_details: any;
  gst_no_kyc_details: any;
  pancard_no_kyc_details: any;
  aadhaar_card_or_electric_bill_kyc_details:any;
  gst_file_kyc_details :any;
  pan_number_file_kyc_details :any;
  address_proof_file_kyc_details:any;
  kycDetailsData_kyc_details:any;
  profile_Name:any;
  stateList:any[] = [];

  pan_file:any='';
  addrss_file:any='';
  gstno_file:any='';

  url1:any;
  url2:any;
  url3:any;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private loader:LoaderService,
    private http: HttpClient,
    private tostr:ToastrService
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData()
  {
  
    let json:any ={
      user_id:localStorage.getItem("roleid"),
      app_token:localStorage.getItem("token"),
      type:"kyc_details"
    };
    this.client.getProfile(json).subscribe((data: any) => {
     
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
         this.Address1=obj.result.kycdetails.address ;
         this.Address2=obj.result.kycdetails.address2 ;
         this.landmark=obj.result.kycdetails.landmark ;
         this.pincode=obj.result.kycdetails.pincode; 
         this.city=obj.result.kycdetails.city_id; 
         this.state=obj.result.kycdetails.state_id ; 
         //this.country=obj.result.kycdetails.country_id; 
         this.gst_no=obj.result.kycdetails.gst_number ; 
         this.pancard_no=obj.result.kycdetails.pan_number ; 
         this.aadhaar_card_or_electric_bill=obj.result.kycdetails.address_proof ; 
         this.gst_file=obj.result.kycdetails.gst_file ;
         this.pan_number_file=obj.result.kycdetails.pan_number_file ;
         this.address_proof_file=obj.result.kycdetails.address_proof_file ;
          this.stateList = obj.result.getInsdiaStatelist;
          this.profile_Name = obj.result.profiledetails.full_name;
       //console.log(this.stateList);
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
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

    upload3(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url3 = event.target.result; 
      }
    } 
  }
  
    
resData:any;
    submit(f) 
    {
      var url = localStorage.getItem('apiurl');
      this.Loader = this.loader.show();   
      const a: any = ( < HTMLInputElement > document.getElementById('gst')).files;
      const b: any = ( < HTMLInputElement > document.getElementById('pan')).files;
      const c: any = ( < HTMLInputElement > document.getElementById('address')).files;
       const payload = new FormData();  
          payload.append("user_id" , localStorage.getItem("roleid"));
          payload.append("app_token" , localStorage.getItem("token"));
          payload.append("address" , this.Address1);
          payload.append("address2" , this.Address2);
          payload.append("landmark" , this.landmark);
          payload.append("pincode" , this.pincode);
          payload.append("city_id" , this.city);
          payload.append("state_id" , this.state);
          payload.append("country_id" , this.country);
          payload.append("gst_number" , this.gst_no);
          payload.append("pan_number" , this.pancard_no); 
          payload.append("profile_name" , this.profile_Name);
          payload.append("address_proof" , this.aadhaar_card_or_electric_bill);
          payload.append("gst_file" , a[0]);
          payload.append("pan_number_file"  , b[0]);
          payload.append("address_proof_file" , c[0]);

      this.http
      .post(url+"/profile/updatekycdetails",
        payload, {
          headers: {
            'Authorization': localStorage.getItem("token"),
        } }
      ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resData = data;
                  var obj = this.resData;
                  if (obj.status == 200) 
                  {
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

  openFile(){
   
    window.open(this.gst_file);
    
  }
    


}
