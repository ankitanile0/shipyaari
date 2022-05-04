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
  selector: 'app-all-ticket',
  templateUrl: './all-ticket.component.html',
  styleUrls: ['./all-ticket.component.css']
})
export class AllTicketComponent implements OnInit {
Loader:any;
ticketList:any;
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
  	) { }

  ngOnInit(): void {
  	this.get_data();
  }

go_to_create()
{
  this.router.navigate(['/createticket']);
}

back()
{
  this.router.navigate(['/supportcenter/']);
}

go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}

buttonFlag:any = 0;
reopen_status:any;
get_data()
{
  var json = 
  {
    type:this.supporty_type,
    priority:this.priority,
    status:this.status 
  }
	this.client.all_ticket(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide();
         this.ticketList = obj.result.all_support_tkts;

          var list_data =  obj.result.all_support_tkts;
          for(let i:number = 0; i < this.ticketList.length; i++)
          {
          	var datetime = this.ticketList[i].created;
          	datetime = datetime.split(" ");
          	
          	list_data[i].date = datetime[0]
          	list_data[i].time = datetime[1]
          }
          this.ticketList = list_data;

          
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

go_to_mail_ticket(id)
{
  this.router.navigate(['/mailsupport/'+id]);
}

go_to_chat_ticket(id)
{
  this.router.navigate(['/chatsupport/'+id]);
}

filter_flag:any = 0;
priority:any = null;
supporty_type:any = null;
status:any = null;
filter(type)
{
  this.get_data();
  this.filter_flag = 1;
}

reset_filter()
{
  this.priority = null;
  this.supporty_type = null;
  this.status = null;
  this.get_data();
  this.filter_flag = 0;
}
 

}
