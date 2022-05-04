import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
Loader:any;
  constructor(
    private client:ClientService,
    private loader:LoaderService,
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.show_data();
  }

go_to_login()
{
  this.router.navigate(['/signin']);
}


planID:any;
parentId:any;
show_data()
{
  var json = 
  {

  }
  this.client.register(json).subscribe(
    (data:any) => {
        var response= data._body; 
        var obj=JSON.parse(response);
        console.log(obj);
         if (obj.status == 200) {
         this.parentId = obj.result.parent_id;
         this.planID = obj.result.plan_id;
         } 
         else {                  
             this.alertService.error(obj.message);
             this.Loader=this.loader.hide();
         }
      }
  ); 
}

username:any;
companyname:any;
emailid:any;
mobile:any;
gst:any;
reffral:any;
agreement:any;


onSubmit(f)
  {
   
     
      this.Loader=this.loader.show();
      var json = 
      {
        full_name:this.username,
        company_name: this.companyname,
        email: this.emailid,
        phone_number: this.mobile,
        gstin_number: this.gst,
        referal_number: this.reffral,
        plan_id:this.planID,
        parent_id:this.parentId,
        leadId: "",
        agreement: ""
      }
      this.client.cleint_register(json).subscribe(
        (data:any) => {
        this.Loader=this.loader.hide();
        var response= data._body; 
        var obj=JSON.parse(response);       
        if (obj.status == 200) {
           this.router.navigate(['/signin/'+obj.message]);
        } 
        else {                  
          this.alertService.error(obj.message);            
        }
      }
      ); 
    }
  
}
