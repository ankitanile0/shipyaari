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
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

Loader:String;
p:any;
ticketList:any;
faqs:any;
announcement:any;
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

go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}

get_data()
{
	this.Loader = this.loader.show();
	this.client.support(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide();
        this.ticketList = obj.result.supporttkt;
        this.faqs = obj.result.faqs;
        this.announcement = obj.result.announcement;

         var list_data =  obj.result.supporttkt;
          for(let i:number = 0; i < this.ticketList.length; i++)
          {
          	var datetime = this.ticketList[i].created;
          	datetime = datetime.split(" ");
          	
          	list_data[i].date = datetime[0]
          	list_data[i].time = datetime[1]
          }
          this.ticketList = list_data;

          var list_data =  obj.result.announcement;
          for(let i:number = 0; i < this.announcement.length; i++)
          {
          	var datetime = this.announcement[i].added_date;
          	datetime = datetime.split(" ");
          	
          	list_data[i].date = datetime[0]
          	list_data[i].time = datetime[1]
          }
          this.announcement = list_data;
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

go_to_allticket()
{
	this.router.navigate(['/allticket']);
}


go_to_mail_ticket(id)
{
  this.router.navigate(['/mailsupport/'+id]);
}

go_to_chat_ticket(id)
{
  this.router.navigate(['/chatsupport/'+id]);
}

keyword:any = "";
search_faq()
{
    if(this.keyword == "")
    {
      this.get_data();
    }
    else
    {
  var json = 
  {
    keyword:this.keyword,
  }
  this.client.search_faq(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.faqs = obj.result;
      }
      else{
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
}


}
