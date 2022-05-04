import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errorMessage:any;
  username:any = "";
  password: any;
  Loader: string;
  isTextFieldType:boolean;
  msg:any;
  msg1:string;
  msg2:string;
  username2:any = null;
  email_otp:any;
  new_password:any;
  con_new_password:any;
  constructor(
    private client:ClientService,
    private loader:LoaderService,
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService
  ) { }

 ngOnInit(): void {
    
    this.route.params.subscribe( params => {
      if('msg' in params && params['msg'] != ''){
      
        if(params['msg'] == 'Invalid authToken, Invalid is Token!'){
          localStorage.removeItem('token');
          window.location.href = "https://seller.shipyaari.com/client/siteadmin"
        }
          setTimeout(() => {
            if(params['msg'].includes('successfully') || params['msg'].includes('Successfully') )
            {
              this.alertService.success(params['msg']);  
            }else{
              this.alertService.error(params['msg']); 
            }
          })
      }
       if(localStorage.getItem('token') != null && localStorage.getItem('token') != "" &&  localStorage.getItem('token') != undefined)
     {
       this.router.navigate(['/dashboard']);
       return
     }

  } );
   
  }
  go_to_register()
  {
    this.router.navigate(['/register']);
  }
  submit(f){    
    if(f.valid){
      var json={
        "username":this.username,
        "password":this.password
      }
      this.client.Login(json)
          .subscribe(
            (data:any) => {
                var response= data._body; 
                var obj=JSON.parse(response);
               // console.log(obj);
                 if (obj.status == 200) {
                  localStorage.setItem('token',obj.result.app_token);
                  localStorage.setItem('roleid',obj.result.user_id);
                  localStorage.setItem('to',obj.result.to_date);
                  localStorage.setItem('from',obj.result.from_date);
                   this.router.navigate(['/dashboard']);
                   this.Loader=this.loader.hide();
                   this.clearForm();
                   this.username = ""
                   this.password = ""
                 } 
                 else {                  
                     this.alertService.error(obj.message);
                     this.msg = obj.message;
                     this.Loader=this.loader.hide();
                 }
              }
          ); 
    }
  }
   clearForm() {
    let form_ :any = document.getElementById("loginForm");
    form_.reset();
  }
  getforgotpassword(f){
    if(f.valid)
    {
      this.Loader = this.loader.show();
        let json = 
        {
          "email": this.username2    
        }   
        this.client.forgot_password(json).subscribe((data: any) => {
          this.Loader = this.loader.hide();
          var response = data._body;
          var obj = JSON.parse(response);
        //  console.log(obj);
          f.reset();
          if (obj.status == 200) {  
             this.flag = 2;        
          } else {                  
            this.alertService.error(obj.message);       
          }    
        });
    }
  } 
  togglePasswordFieldType()
  {
    this.isTextFieldType = !this.isTextFieldType;
  }
  flag:any = 0;
  goto_forget_pass()
  {
    this.flag = 1;
  }
  go_to_login()
  {
    this.flag = 0;
  }
  clickMethod() {
    if(this.username2 != null){
      confirm('OTP sent succssfully!');   
    }else{
    }   
  }
  //change password function 
  getchangepass(f){
     if(f.valid)
      {        
         this.Loader = this.loader.show();
          let json:any = 
          {
              "otp":this.email_otp,
              "new_password": this.new_password,
              "new_conf_pass": this.con_new_password
          }          
          this.client.change_password_while_for(json).subscribe((data: any) => {
            this.Loader = this.loader.hide();
            var response = data._body;
            var obj = JSON.parse(response);
          //  console.log(obj);
            f.reset();
            if (obj.status == 200) {  
              this.flag = 0;
              this.alertService.error(obj.message);     
            } else{  
              this.alertService.error(obj.message);  
            }    
          });
      }
  }
}


