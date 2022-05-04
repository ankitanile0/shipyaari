import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

p:any;
Loader:any;
Table_Template:any;
upload:BsModalRef;
addtemplate:BsModalRef;
viewTemp:BsModalRef;
editTemp:BsModalRef;
DeleteConf:BsModalRef;
sampleExcel:any;
myfile:any;

temp_id:any;
product_description:any;
product_hsn:any;
product_price:any;
product_qty:any;
product_sku:any;
product_tax:any;
product_weight:any;
template_name:any;
product_height:any;
product_widhth:any;
product_length:any;

  constructor(
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
        this.route.params.subscribe( params => {
      if('msg' in params && params['msg'] != ''){
          setTimeout(() => {
            if(params['msg'].includes('successfully') || params['msg'].includes('Successfully') )
            {
              this.tostr.success(params['msg']);  
            }else{
              this.tostr.error(params['msg']); 
            }
          })
      }
  } );
        this.router.navigate(['/template']);
  	this.getSmartshipyaariTemplateData();
  }

go_to_template(){this.router.navigate(['/template/']);} 
go_to_add_book(){this.router.navigate(['/addressbook/']);}
go_to_module(){this.router.navigate(['/modules/']);}
//go_to_api_doc(){this.router.navigate(['/apidoc/']);}
 go_to_api_doc(){window.open("https://documenter.getpostman.com/view/12163140/TVK5dMUb");}



go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

  getSmartshipyaariTemplateData()
  {
  	this.Loader = this.loader.show();
    let json:any ={
      template_name:"",
      limit:1000,
      page_no:"",
      order_by:"",
      start_page:"",
      end_date:"",
    };
    this.client.smartshipyaari_template(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Table_Template=obj.result.templatelist;
        this.sampleExcel = obj.result.sample_excel_temp;
        this.Loader = this.loader.hide();
      }
      else
      {
      	this.Loader = this.loader.hide();
      	if(obj.message.includes("authToken"))
	      {
	        this.router.navigate(['/signin/'+obj.message]);
	      }
      }
    });
  }

  go_to_addTemplate()
  {
    this.router.navigate(['/addtemplate']);
  }

  synctemplate()
  {
  	this.getSmartshipyaariTemplateData();
  	this.tostr.success("Template sync Sucessfully");
  }

  uploadmodal(modal)
  {
  	this.upload = this.modalService.show(modal,
  	{
  		class:"modal-sm",
  	});
  }

  closeUplodaModal()
  {
  	this.upload.hide();
  }



  viewtemp(modal, id)
  {
    this.Loader = this.loader.show();
    var json = 
    {
      template_id:id
    }
    this.client.template_details(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.product_description = obj.result.product_description;
        this.product_hsn = obj.result.product_hsn;
        this.product_price = obj.result.product_price;
        this.product_qty = obj.result.product_qty;
        this.product_sku = obj.result.product_sku;
        this.product_tax = obj.result.product_tax;
        this.product_weight = obj.result.product_weight;
        this.template_name = obj.result.template_name;
        this.Loader = this.loader.hide();
      }
      else
      {
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
    this.viewTemp = this.modalService.show(modal,
    {
      class:"",
    })
  }


  CloseviewTemplate()
  {
    this.viewTemp.hide();
  }

  deleteTemplate(id)
  {
    if(confirm("Do you want to delete?")) {   
      this.Loader = this.loader.show();
      var json = 
      {
        template_id:id
      }
      this.client.template_Delete(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == 200) {
         this.tostr.success(obj.message);
          this.Loader = this.loader.hide();
          this.getSmartshipyaariTemplateData();
        }
        else
        {
          this.Loader = this.loader.hide();
            this.tostr.error(obj.message);
          if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
        }
      });
    }else{
      return false;
    }  
  }

  edit_template(modal,id)
  {
    var json = 
    {
      template_id:id
    }
    this.client.template_details(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.temp_id = obj.result.template_id;
        this.product_description = obj.result.product_description;
        this.product_hsn = obj.result.product_hsn;
        this.product_price = obj.result.product_price;
        this.product_qty = obj.result.product_qty;
        this.product_sku = obj.result.product_sku;
        this.product_tax = obj.result.product_tax;
        this.product_weight = obj.result.product_weight;
        this.template_name = obj.result.template_name;
        this.Loader = this.loader.hide();
      }
      else
      {
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
    this.editTemp = this.modalService.show(modal,
    {
      class:"modal-lg",
    });
  }

closeEdit()
{
  this.editTemp.hide();
}

submit(f)
{
  var json = 
  {    
    template_id:this.temp_id,
    template_name:this.template_name,
    prod_description:this.product_description,
    template_sku:this.product_sku,
    template_price:this.product_price,           
    template_hsn: this.product_hsn,
    template_quantity:this.product_qty,
    template_tax:this.product_tax,
    template_weight:this.product_weight,
    template_height:this.product_height,
    template_width:this.product_widhth,
    template_length:this.product_length,
   }  
   console.log(json);  
   this.client.update_template(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide();
        this.closeEdit();
        this.getSmartshipyaariTemplateData();
         this.tostr.success(obj.message);
      }
      else
      {
       // this.tostr.error(obj.message);
        this.alertService.error(obj.message);
        this.Loader = this.loader.hide();
        this.closeEdit();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}


resData:any;
submitUpload(excel)
  {
    var url = localStorage.getItem('apiurl');
    const a: any = ( < HTMLInputElement > document.getElementById('myfile')).files;
     const payload = new FormData();
     this.Loader = this.loader.show();
       payload.append("bulk_template_sheet" , a[0]);
         this.http
      .post(url+"/template/bulktemplatesheetupload",
        payload, {
          headers: {
            'Authorization': localStorage.getItem("token"),
        } }
      ).subscribe(
              (data:any) => {
                  this.resData = data;
                  var obj = this.resData;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.Loader = this.loader.hide();
                    this.closeUplodaModal(); 
                    this.getSmartshipyaariTemplateData() 
                  } 
                   else 
                   {
                     this.alertService.error(obj.message);
                     this.Loader = this.loader.hide();
                      this.closeUplodaModal(); 
                     if(obj.message.includes("authToken"))
                       {
                         this.router.navigate(['/signin/'+obj.message]);
                       }
                   }     
                },
            );
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

