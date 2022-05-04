import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.css']
})
export class ApiDocComponent implements OnInit {

url:string;
Loader:any;
urlSafe: SafeResourceUrl;
  constructor(
    private fb:FormBuilder,
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private loader:LoaderService,
    private http: HttpClient,
    private tostr:ToastrService,
     private modalService: BsModalService,
     public sanitizer: DomSanitizer,
    ) { }

  ngOnInit(): void {
  	// https://documenter.getpostman.com/view/12163140/TVK5dMUb
  	this.url = "https://seller.shipyaari.com/client/siteadmin/clientDashboard";
  	this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

go_to_template(){this.router.navigate(['/template/']);} 
go_to_add_book(){this.router.navigate(['/addressbook/']);}
go_to_module(){this.router.navigate(['/modules/']);} apidoc
go_to_api_doc(){this.router.navigate(['/apidoc/']);}

}
