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
  selector: 'app-agreement-type-ver',
  templateUrl: './agreement-type-ver.component.html',
  styleUrls: ['./agreement-type-ver.component.css']
})
export class AgreementTypeVerComponent implements OnInit {

  master_id:any;
  agreementtypeverdata:any;
  agr_type_id:any;
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
    this.route.params.subscribe( params => {
      if('id' in params && params['id'] != ''){
         this.agr_type_id = params['id'];
      }
    });
    this.agreementtypeVerlist(this.agr_type_id);
  }

go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}
  
  agreementtypeVerlist(agr_type_id)
  {
    let json:any ={
      mobile_no:"",
      limit:"100",
      page_no:"",
      order_by:"",
      agr_type_id:agr_type_id
    };
    this.client.AgreementTypeVerList(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {          
        this.agreementtypeverdata=obj.result.agrversiondetails;    
      }else{
        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }
  returnpage(agr_type_id){
    this.router.navigate(['/agreetype/'+agr_type_id]);    
  }
  Viewetails(id){   
    this.router.navigate(['/agreetypevercont/'+id]);    
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
