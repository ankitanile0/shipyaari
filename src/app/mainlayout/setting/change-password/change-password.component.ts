import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
Loader:string;
  currentpassword:any = '';
  newpassword:any = '';
  confpassword:any = '';
  constructor(
    private fb:FormBuilder,
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,  
    private http: HttpClient,
    private tostr:ToastrService,
    private loader:LoaderService 
  ) {}

  ngOnInit(): void {
  } 

  go_to_label_setting(){this.router.navigate(['/labelsetting/']);} 
  go_to_change_pass(){this.router.navigate(['/changepassword/']);}


  onSubmit(f)
  {
    if(f.valid)
    {
        this.Loader = this.loader.show();
        let json:any ={
          old_pass:this.currentpassword,
          new_pass:this.newpassword,
          confirm_pass:this.confpassword   
        };
        this.client.changePassword(json).subscribe((data: any) => {
          this.Loader = this.loader.hide();
          var response = data._body;
          var obj = JSON.parse(response);         
          if (obj.status == 200) { 
             // f.reset();
            this.tostr.success(obj.message);
          }else{           
            this.alertService.error(obj.message);
            this.tostr.error(obj.message);
            if(obj.message.includes("authToken"))
            {
                this.router.navigate(['/signin/'+obj.message]);
            }
          }    
        });
       
    }
  }

flag:any;
check_Pass()
{
  if( this.newpassword != '' && this.confpassword != '')
  {
    if(this.newpassword != this.confpassword)
      {
        this.flag = 1;
      }
      else{
        this.flag = 0;
      }
  }
  else
  {
      this.flag = 1;
  }
  
}

pincodedata:any;
downloadpincode()
  {
    //alert("hi");
    let json:any ={};
    this.client.downloadpincode(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {          
           this.pincodedata=obj.result;
           //window.open(this.pincodedata); 
           window.open("https://dev.shipyaari.com/angularapi/pincode_download"); 
      }else{
        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }


}
