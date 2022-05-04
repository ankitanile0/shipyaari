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
  selector: 'app-chat-support',
  templateUrl: './chat-support.component.html',
  styleUrls: ['./chat-support.component.css']
})
export class ChatSupportComponent implements OnInit {

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

chat_reply:any;

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

  go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}

  back()
{
  this.router.navigate(['/supportcenter/']);
}


reopen_status:any;
button_flag:any = 0;

  get_chat(id)
  {
    var json = 
    {
      tkt_id:id,
      type:"chat"
    }
    this.client.view_ticket(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        
        this.reopen_status = obj.result.userdata.status;
        if(this.reopen_status == 2)
        {
          this.button_flag = 1;
        }
        else
        {
          this.button_flag = 0;
        }

        this.userdata = obj.result.userdata;
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
        this.chatdata = this.chatdata;
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

  download(data)
  {
    window.open(data);
  }

resData:any;
  onSubmit(f)
  {
    var url = localStorage.getItem('apiurl');
    var a: any = undefined;
    a = ( < HTMLInputElement > document.getElementById('attach'));
        if(a != null){ 
          a = a.files;
        } else {
          a = " ";
        }
    if(f.valid == true)
    {
      const payload = new FormData();
          payload.append("attachment1" , a[0]);
          payload.append("msg" , this.chat_reply);
          payload.append("Contact_type" , "chat");
          payload.append('tktid', this.tkt_id);
          this.http
      .post(url+"/support/send_chat_reply",
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
              this.get_chat(this.id);
              //this.tostr.success(obj.message);
              //this.Loader = this.loader.hide();  
              //this.router.navigate(['/supportcenter']);
              this.chat_reply="";
              a = undefined;
            } 
            else 
            {
               this.tostr.error(obj.message);
               //this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
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
