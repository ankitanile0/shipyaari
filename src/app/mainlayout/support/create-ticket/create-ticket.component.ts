import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { DomSanitizer } from '@angular/platform-browser';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

mainType:any;
Loader:any;
ticketList:any;
index:number = 1;
text:any;
html:any = '';
subject:any;
cc:any;
file1:any;
file2:any;
file3:any;
contact_method:any;

mail:boolean = true;
chat:boolean = false;
  constructor(
  	private client:ClientService, 
  	private route:ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
    private http: HttpClient,
    private tostr:ToastrService,
    private sanitizer: DomSanitizer
  	) { }

 ngOnInit(): void {
    
  }

go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}
 
divFlag:any = 0;
support_list:any;
issue_list:any;
category:any;
issue:any;
high:boolean = false;
medium:boolean = false;
low:boolean = false;
get_data_sale_support()
{
  this.mainType = "sales_support",
  this.high = false;
  this.medium = false;
  this.low = false;
  this.category = null;
 this.issue = null;
  this.support_list = null;
  this.issue_list = null;
  this.divFlag = 1;
  var json = 
  {
      type:"sales_support"
  }
  this.client.get_support_type(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.support_list = obj.result.support_type;


      }
      else{
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}


get_data_technical_support()
{
  this.mainType = "technical_support",
  this.high = false;
  this.medium = false;
  this.low = false;
   this.category = null;
  this.issue = null;
   this.support_list = null;
  this.issue_list = null;
  this.divFlag = 1;
  var json = 
  {
      type:"technical_support"
  }
  this.client.get_support_type(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.support_list = obj.result.support_type;


      }
      else{
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

get_data_operation_support()
{
   this.mainType = "operation_support",
  this.high = false;
  this.medium = false;
  this.low = false;
  this.category = null;
  this.issue = null;
   this.support_list = null;
  this.issue_list = null;
  this.divFlag = 1;
  var json = 
  {
      type:"operation_support"
  }
  this.client.get_support_type(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.support_list = obj.result.support_type;


      }
      else{
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

get_data_account_support()
{
  this.mainType = "account_support",
  this.high = false;
  this.medium = false;
  this.low = false;
  this.category = null;
  this.issue = null;
   this.support_list = null;
  this.issue_list = null;
  this.divFlag = 1;
  var json = 
  {
      type:"account_support"
  }
  this.client.get_support_type(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.support_list = obj.result.support_type;


      }
      else{
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}




change_type()
  {
    var categoryList = this.support_list;
    var category = this.category;
    //console.log(categoryList);
    var priority;
      var json = 
      {
          id:category
      }
      this.client.get_issue_type(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.issue_list = obj.result.support_type_issue;

         for(var i:number = 0; i < categoryList.length; i++)
         {
             if(category == categoryList[i].id)
             {
                 priority = categoryList[i].issue_priority;
             }
         }

         if(priority == "high")
         {
           this.high = true;
           this.priority(1);
         }
          if(priority == "medium")
         {
           this.medium = true;
            this.priority(2);
         }
          if(priority == "low")
         {
           this.low = true;
            this.priority(3);
         }



      }
      else{
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

priority_type:any;
priority(num:number)
{
   if(num == 1)
   {
     this.priority_type = "high"
     this.high = true;
     this.medium = false;
     this.low = false;
   }
    if(num == 2)
   {
     this.priority_type = "medium"
     this.high = false;
     this.medium = true;
     this.low = false;
   }
    if(num == 3)
   {
     this.priority_type = "low"
     this.high = false;
     this.medium = false;
     this.low = true;
   }
   console.log("priority",this.priority_type);
}

type_name:any;
type(num:number)
{
   if(num == 1)
   {
     this.type_name = "web"
     this.mail = true;
     this.chat = false;
   }

    if(num == 2)
   {
     this.type_name = "chat"
     this.mail = false;
     this.chat = true;
   }

    console.log("type",this.type_name);
}

attachflag:any = 0;
count:number = 1; 
show()
{
   this.attachflag =1
}

resData:any;
onSubmit(f)
{
    if(f.valid == true)
    {
      var url = localStorage.getItem('apiurl');
      this.Loader = this.loader.show();
      
       var a: any = undefined;
       var b: any = undefined;
       var c: any = undefined;

        a = ( < HTMLInputElement > document.getElementById('file1'));
        if(a != null){ 
          a = a.files;
        } else {
          a = " ";
        }
        b = ( < HTMLInputElement > document.getElementById('file2'));
         if(b != null) {
          b = b.files;
        }
        else {
          b = " ";
        }
        c = ( < HTMLInputElement > document.getElementById('file3'));
         if(c != null){
          c = c.files;
        }
        else {
          c = " ";
        }
     
       const payload = new FormData();
          payload.append("attachment" , a[0]);
          payload.append("attachment_1" , b[0]);
          payload.append("attachment_2" , c[0]);
          payload.append('support_type', this.mainType);
          payload.append('issue_type', this.category);
          payload.append('issue_desc', this.issue);
          payload.append('issue_subject', this.subject);
          payload.append('email_cc', this.cc);
          payload.append('issue_msg', this.html);
          payload.append('contact_type', this.type_name);
          payload.append('issue_priority', this.priority_type);

      this.http
      .post(url+"/support/create_support_tkt",
        payload, 
        { 
          headers: 
          {
            'Authorization': localStorage.getItem("token"),
            } 
        }).subscribe((data:any) => {
            this.resData = data;
            var obj = this.resData;
            if (obj.status == 200) 
            {
              this.tostr.success(obj.message);
              this.Loader = this.loader.hide();  
              this.router.navigate(['/supportcenter']);
              
            } 
            else 
            {
               this.tostr.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
    }
    else
    {
      this.tostr.error("Please Fill Proper data");
    }
}


}
