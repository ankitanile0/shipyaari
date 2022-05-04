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

@Component({
  selector: 'app-mail-support',
  templateUrl: './mail-support.component.html',
  styleUrls: ['./mail-support.component.css']
})
export class MailSupportComponent implements OnInit {
id:any;
Loader:any;
userdata:any;
chatdata:any;
userImage:any;
status:any;
tkt_id:any;
contact_type:any;
subject:any;
created:any;
support_type:any;
email:any;
priority:any;
issue_desc:any;
issue_type:any;
comp_name:any;
cc:any;

html:any;
file1:any;
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
    private tostr:ToastrService
  	) { 
  		this.route.params.subscribe((params) => {
      this.id = params.id;
      this.get_chat(this.id)
    });
  }

  ngOnInit(): void {
  }

back()
{
  this.router.navigate(['/supportcenter/']);
}

go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}

reopen_status:any;
button_flag:any = 0;

  get_chat(id)
  {
    var json = 
    {
      tkt_id:id,
      type:"web"
    }
    this.client.view_ticket(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.userdata = obj.result.userdata;
        this.reopen_status = obj.result.userdata.status;
        if(this.reopen_status == 2)
        {
          this.button_flag = 1;
        }
        else
        {
          this.button_flag = 0;
        }
        this.userImage = this.userdata.user_image;
        this.status = this.userdata.status;
        this.tkt_id = this.userdata.id;
        this.contact_type = this.userdata.contact_type;
        this.subject = this.userdata.subject
        this.chatdata = obj.result.chatdata;
        this.created = this.userdata.created;
        this.support_type =  this.userdata.support_type;
        this.priority = this.userdata.priority;
         this.issue_desc = this.userdata.issue_desc;
          this.issue_type = this.userdata.issue_type;
        this.comp_name = this.userdata.company_name
        this.email =  this.userdata.email;

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

attachflag:any = 0;
count:number = 1; 
show()
{
  if(this.attachflag == 0){
   this.attachflag =1
  }
  else
  {
      this.attachflag =0
  }
}

resData:any;
onSubmit(f)
{
   if(f.valid == true)
    {
      var url = localStorage.getItem('apiurl');
      //this.Loader = this.loader.show();
      
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
          payload.append("attachment1" , a[0]);
          payload.append("attachment2" , b[0]);
          payload.append("attachment3" , c[0]);
          payload.append('msg', this.html);
          payload.append('contact_type', "web");
          payload.append('tktid', this.tkt_id);
          payload.append('email_cc', this.cc);
          //payload.append('reopen_ticket ', this.cc);

      this.http
      .post(url+"/support/send_mail_reply",
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
              //this.Loader = this.loader.hide();  
              this.get_chat(this.id)
              //this.router.navigate(['/supportcenter']);
              
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

open_flag:any = 0;
close()
{
  this.open_flag = 0;
}

reply()
{
  this.open_flag = 1;
}


close_ticket(id)
{
  var json = 
  {
      ticket_id:id
  }
  this.client.close_ticket(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        
        this.tostr.success(obj.message);
        this.get_chat(this.id);
      }
      else{
        this.Loader = this.loader.hide();
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}


reopen_ticket_data(id)
{
  var json = 
  {
      ticket_id:id
  }
  this.client.reopen_ticket(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        
        this.tostr.success(obj.message);
        this.get_chat(this.id);
      }
      else{
        this.Loader = this.loader.hide();
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}



}
