import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert';
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import {  Input } from '@angular/core'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';

@Component({
  selector: 'app-paytmcallback',
  templateUrl: './paytmcallback.component.html',
  styleUrls: ['./paytmcallback.component.css']
})
export class PaytmcallbackComponent implements OnInit {

  constructor(
  	private client:ClientService, 
    private loader:LoaderService,
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
     private tostr:ToastrService,
  	) { this.checkparams();	 }

  ngOnInit(): void {
  }

  go_to_dashboard()
  {
  	this.router.navigate(['/dashboard/']);
  }

  message:any;
  checkparams(){
  	var url = window.location.href.split("?");  
  	if(url.length == 2){
	  	const urlParams = new URLSearchParams(url[1]);
		const payment_status = urlParams.get('payment_status');
		const msg = urlParams.get('msg');
		//console.log("payment_status",payment_status);
		//console.log("msg",msg);
    this.router.navigate(['/dashboard/'+msg]);
		this.message = msg;
		if(payment_status == "success"){
			this.tostr.success(msg); 
		} else {
			this.tostr.error(msg); 
		}
  	}
  }
}
