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
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {

 agreementdata:any;
	agrpdfdata:any;
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
	){}

 ngOnInit(): void {
		this.agreementlist();
	}

go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}

	agreementlist()
	{
		let json:any ={
			mobile_no:"",
			limit:"100",
			page_no:"",
			order_by:""
		};
		this.client.AgreementList(json).subscribe((data: any) => {
			var response = data._body;
			var obj = JSON.parse(response);
			console.log(obj);
			if (obj.status == 200) {					
				this.agreementdata=obj.result.agreements;	  
			}else{
				
				if(obj.message.includes("authToken"))
				{
					this.router.navigate(['/signin/'+obj.message]);
				}
			}		  
		});
	}
		
	Viewetails(id){	
		this.router.navigate(['/agreetype/'+id]);		
	}
	
	downloadPdf(id)
	{
		var json = 
		{
			master_id:id
		}		
		this.client.downloadAgr(json).subscribe((data: any) => {
			var response = data._body;
			var obj = JSON.parse(response);			
			if (obj.status == 200) {
				
					window.open(obj.result);
			}else{				
				if(obj.message.includes("authToken"))
				{
					this.router.navigate(['/signin/'+obj.message]);
				}
			}		  
		});
	}
	accept_all_point(){
    this.Loader = this.loader.show();
    let json:any ={
     
    };
    this.client.accept_all_point(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
        this.Loader = this.loader.hide();
        this.tostr.success("Agreement accepted successfully");
      }else{
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
