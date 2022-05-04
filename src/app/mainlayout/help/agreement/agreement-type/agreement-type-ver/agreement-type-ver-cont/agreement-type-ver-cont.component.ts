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
  selector: 'app-agreement-type-ver-cont',
  templateUrl: './agreement-type-ver-cont.component.html',
  styleUrls: ['./agreement-type-ver-cont.component.css']
})
export class AgreementTypeVerContComponent implements OnInit {

  agr_type_ver_id:any;
  agreementtypeVerContents:any;
  agrdetails:any;
  agrrement_accept_id:any;
  ver_id:any;
  vercontents:any;
  contentsrep:any;
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
         this.agr_type_ver_id = params['id'];
      }
    });
    this.agreementtypeVerContentlist(this.agr_type_ver_id);
  }

  go_to_support(){this.router.navigate(['/supportcenter/']);}
go_to_agreement(){this.router.navigate(['/agree/']);}

  name:any;
  version:any;
  type:any;
  agreementtypeVerContentlist(agr_type_ver_id)
  {
    let json:any ={
      mobile_no:"",
      limit:"100",
      page_no:"",
      order_by:"",
      agr_type_ver_id:agr_type_ver_id
    };
    this.client.AgreementTypeVerCotList(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
        this.agreementtypeVerContents=obj.result.content;        
        this.agrdetails =obj.result.agrdetails;
        this.ver_id =obj.result.agrdetails.id;  
        this.name =obj.result.agrdetails.name; 
        this.version =obj.result.agrdetails.version_number;    
        this.type =obj.result.agrdetails.type;
        this.agrrement_accept_id=obj.result.agrrement_accept_id;      
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }
  returnpage(agr_type_ver_id){
    this.router.navigate(['/agreetypever/'+agr_type_ver_id]);    
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
