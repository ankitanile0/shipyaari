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
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-affted-pincode',
  templateUrl: './affted-pincode.component.html',
  styleUrls: ['./affted-pincode.component.css']
})
export class AfftedPincodeComponent implements OnInit {
    json:any ={
      order_id:"",
      limit:"20",
      page_no:1,
      start_date:"",
      end_date:"",
      order_by:"",
      tab_type:"aff_pincode",
      mobile_no:"",
      payment_mode:"",
      tracking_no:"",
      manifast_id:"",
      status:[],
      courier_id :[],
    };
    Loader:any;
    all_list:any=[];
    p:any;
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
      private excelService:JsonToExcelService
    ){}
  ngOnInit(): void {
    this.getIntransitData();
  }
  onScroll() {    
    this.json.page_no++;
    this.getIntransitData();      
  }
  go_to_home()
  {
    this.router.navigate(['/dashboard/']);
  }
  getIntransitData()
  {
    this.Loader = this.loader.show();   
    this.client.Tracking(this.json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {       
        this.all_list = this.all_list.concat(obj.result.trackingdata);          
      }
      else{       
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

download_report()
{
  this.client.tracking_pin_report(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         //this.all_list = obj.result.trackingdata;
       
         this.excelService.exportAsExcelFile(obj.result, 'export-to-excel');
        //this.Loader = this.loader.hide();
        
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

export_pincode(pin)
{
  var json = 
  {
      pincode:pin
  }
  this.client.tracking_pin_export(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         //this.all_list = obj.result.trackingdata;
       
         this.excelService.exportAsExcelFile(obj.result, 'export-to-excel');
        //this.Loader = this.loader.hide();
        
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
