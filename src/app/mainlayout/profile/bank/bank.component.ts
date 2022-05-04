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
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  Loader:any;
  Account_Holder_Name:any;
  Bank_Name: any;
  Bank_Branch_Name: any;
  Account_Type: any = " ";
  Ifsc_Code: any;
  Account_Number: any;
  Cheque_Number:any;
  Cheque_File: any;

  url1:any;

  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private loader:LoaderService,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private http:HttpClient,
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
      type:"bank_details"
    };
    this.client.getProfile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
  
         this.Account_Holder_Name=obj.result.bankdetails.account_holder_name;
         this.Bank_Name=obj.result.bankdetails.bank_name ;
         this.Bank_Branch_Name=obj.result.bankdetails.bank_branch_name ;
         this.Account_Type=obj.result.bankdetails.account_type ; 
         this.Ifsc_Code=obj.result.bankdetails.ifsc_code ; 
         this.Account_Number=obj.result.bankdetails.account_number ; 
         this.Cheque_Number=obj.result.bankdetails.cheque ; 
         this.Cheque_File=obj.result.bankdetails.cheque_file ; 
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
  }

 upload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url1 = event.target.result; 
      }
    } 
  }

  resData:any;
  submit(f)  {
    var url = localStorage.getItem('apiurl');
    this.Loader = this.loader.show(); 
     const a: any = ( < HTMLInputElement > document.getElementById('cheque')).files; 
     const payload = new FormData(); 
      
        payload.append("user_id",localStorage.getItem("roleid"));
        payload.append("app_token",localStorage.getItem("token"));
        payload.append("account_holder_name",this.Account_Holder_Name);
        payload.append("bank_name",this.Bank_Name);
        payload.append("bank_branch_name",this.Bank_Branch_Name);
        payload.append("account_type",this.Account_Type);
        payload.append("ifsc_code",this.Ifsc_Code);
        payload.append("account_number",this.Account_Number);
        payload.append("cheque",this.Cheque_Number);
        payload.append("cheque_file", a[0]);
         
     this.http
      .post(url+"/profile/updatebankdetails",
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
