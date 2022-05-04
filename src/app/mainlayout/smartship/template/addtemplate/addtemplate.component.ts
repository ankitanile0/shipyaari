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


@Component({
  selector: 'app-addtemplate',
  templateUrl: './addtemplate.component.html',
  styleUrls: ['./addtemplate.component.css']
})
export class AddtemplateComponent implements OnInit {
	Loader:any;
	 template:FormGroup;
	 //templaterow:FormArray;

	 

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
  	) { }

  ngOnInit(): void {
  	this.loadform();
  }

  go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

go_to_template(){this.router.navigate(['/template/']);} 
go_to_add_book(){this.router.navigate(['/addressbook/']);}
go_to_module(){this.router.navigate(['/modules/']);}
//go_to_api_doc(){this.router.navigate(['/apidoc/']);}
 go_to_api_doc(){window.open("https://documenter.getpostman.com/view/12163140/TVK5dMUb");}

  gototemplate()
  {
  	this.router.navigate(['/template']);
  }

loadform()
  {
  	this.template = this.fb.group({

  		templaterow:this.fb.array([this.get_template()],[Validators.required])
  	})
  }

  get_template() : FormGroup
  {
    return this.fb.group({
    template_name: new FormControl('', [Validators.required, ]), 
    prod_description: new FormControl('', [Validators.required, ]), 
    template_sku: new FormControl(''),
    template_hsn: new FormControl(''),
    template_price: new FormControl('', [Validators.required ,Validators.pattern('^[0-9]+$')]),
    template_quantity: new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$')]),
    template_tax: new FormControl(''),
    template_weight: new FormControl('', [Validators.required])
    }); 
  }

   get f() { return this.template.controls.templaterow; }

 get templaterow() : FormArray  {
    return this.template.get('templaterow')  as FormArray;
  }

  addMainTable()
  {
    var a = this.template.get('templaterow') as FormArray;
    a.push(this.get_template());
  }

  removeMainTable(i: number)
  {
    var a = this.template.get('templaterow') as FormArray;
    a.removeAt(i);
  }

  onSubmit() {
    //alert("111")
  	this.Loader = this.loader.show();
  	var templateform = JSON.stringify(this.template.value);

  	var json = {
  		templateform
  	}

    console.log(templateform);
    this.client.Addtemplate(templateform).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj =JSON.parse(response);
      if (obj.status == 200) {
      	this.router.navigate(['template/'+obj.message]);
      	this.tostr.success(obj.message);      	
      }
      else
      {      	
        this.tostr.error(obj.message);    
      	if(obj.message.includes("authToken"))
	      {
	        this.router.navigate(['/signin/'+obj.message]);
	      }
      }
    });
  }

  submitUpload(excel)
  {
    
  }
  SyncProducts()
  {
    var json = {}    
    this.client.synctemplate(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
        console.log(obj);
        this.tostr.success(obj.message);
      }
      else
      {  
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
}
