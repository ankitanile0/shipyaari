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
  selector: 'app-agreement-type',
  templateUrl: './agreement-type.component.html',
  styleUrls: ['./agreement-type.component.css']
})
export class AgreementTypeComponent implements OnInit {

  agreementtypedata:any;
  master_id:any;
  Loader:string;
  agr_type_id:any;
  constructor(
    private fb:FormBuilder,
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,  
    private http: HttpClient,
    private tostr:ToastrService,
    private loader:LoaderService,     
  ) { }
  ngOnInit(): void {  
    this.route.params.subscribe( params => {
      if('id' in params && params['id'] != ''){
         this.master_id = params['id'];
      }
    }); 
    this.agreementtypelist(this.master_id);
  }

go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}
  
  agreementtypelist(master_id)
  {
    let json:any ={
      mobile_no:"",
      limit:"100",
      page_no:"",
      order_by:"",
      master_id:master_id
    };
    this.client.AgreementTypeList(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {          
        this.agreementtypedata=obj.result.mastertypes;    
      }else{
        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }
  returnpage(master_id){
    this.router.navigate(['/agree/']);    
  }
  Viewetails(type_id){ 
    this.router.navigate(['/agreetypever/'+type_id]);    
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
