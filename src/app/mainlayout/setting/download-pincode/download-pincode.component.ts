import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';

@Component({
  selector: 'app-download-pincode',
  templateUrl: './download-pincode.component.html',
  styleUrls: ['./download-pincode.component.css']
})
export class DownloadPincodeComponent implements OnInit {

 pincodedata:any;
  Loader:string;
  constructor(
    private fb:FormBuilder,
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,  
    private http: HttpClient,
    private tostr:ToastrService,
    private loader:LoaderService 
  ) { }

  ngOnInit(): void {
    this.downloadpincode();
  }
  downloadpincode()
  {
    //alert("hi");
    let json:any ={};
    this.client.downloadpincode(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {          
           this.pincodedata=obj.result;
           //window.open(this.pincodedata); 
           window.open("https://dev.shipyaari.com/angularapi/pincode_download"); 
      }else{
        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }

}
