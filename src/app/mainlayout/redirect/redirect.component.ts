import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import {  Input } from '@angular/core'

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
data:any;
  constructor(
  	 private client:ClientService , 
    private route:ActivatedRoute , 
    private router: Router ,
    private alertService: AlertService,
    private loader:LoaderService
  	) { this.checkparams();}

  ngOnInit(): void {
  	localStorage.setItem('token', this.data)
  }


checkparams(){
    var url = window.location.href.split("?");  
    if(url.length == 2){
     const urlParams = new URLSearchParams(url[1]);
    const token = urlParams.get('token');
    const userid = urlParams.get('uuid');
   // console.log("token",token);
    //console.log("uid",userid);
   	localStorage.setItem('token', token);
   	localStorage.setItem('roleid', userid);
   	this.router.navigate(['/dashboard/']);
    }
  }

}


