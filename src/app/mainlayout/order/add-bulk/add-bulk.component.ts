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

@Component({
  selector: 'app-add-bulk',
  templateUrl: './add-bulk.component.html',
  styleUrls: ['./add-bulk.component.css']
})
export class AddBulkComponent implements OnInit {

	Loader:any;
	ProcessList:any;
	max:number=100;
	SuccessList:any;
	upload:BsModalRef;
  download:BsModalRef;
	pickupList:any;
	sample_file:any;
	pickupPin:any;
	Files:any;
  Listdata:any;

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
    private excelService:JsonToExcelService,
  	) { }

  ngOnInit(): void {
  	this.get_process_data();
  	this.get_Success_data();
  	  }


      go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

go_to_order(){this.router.navigate(['/addorder/']);}
go_to_b2b(){this.router.navigate(['/b2border/']);}
go_to_add_bulk(){this.router.navigate(['/bulkorder/']);}
go_to_All_order(){this.router.navigate(['/allorder/']);}
go_to_channel(){this.router.navigate(['/channel/']);}

  get_process_data()
  {
  	 this.Loader = this.loader.show();  
  	var json =
	  	{
	  		limit:"1000",
			page_no:"",
			start_date:"",
			end_date:"",
			order_by:"",
			tab:"process",
			Batch_number:"",
			status:"",
	  	}
	  	this.client.get_add_bulk_data(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.ProcessList = obj.result.bulkorderdata;
         this.Loader = this.loader.hide();  
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
  }

  get_Success_data()
  {
  	var json =
	  	{
	  		limit:"1000",
			page_no:"",
			start_date:"",
			end_date:"",
			order_by:"",
			tab:"success",
			Batch_number:"",
			status:"",
	  	}
	  	this.client.get_add_bulk_data(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.SuccessList = obj.result.bulkorderdata;
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


  uploadModal(modal)
  {
  	this.client.bulkmodal_data(localStorage.getItem("token")).subscribe((data:any) => {
  		var response = data._body;
  		var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.pickupList = obj.result.pickuplist;
       this.sample_file = obj.result.sample_file_url;
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
  	this.upload = this.modalService.show(modal,
  	{
  		class:""
  	})
  }

download_sheet()
{
  window.open(this.sample_file);
}

  closeUploadModal()
  {
  	this.upload.hide();
  }

  resData:any;
  submit(f)
  {
  	//alert(this.pickupPin);
  	if(f.valid)
  	{
      var url = localStorage.getItem('apiurl');
  		const a: any = ( < HTMLInputElement > document.getElementById('excel_file')).files;
  	const payload = new FormData();
        this.Loader = this.loader.show();
         // payload.append("app_token" , localStorage.getItem("token"));
          payload.append("pickup_id" , this.pickupPin);
          payload.append("excel_file" , a[0]);
      this.http
      .post(url+"/addbulk/uploadBulksheet",
        payload, 
        { 
        	headers: 
        	{
            'Authorization': localStorage.getItem("token"),
            } 
        }).subscribe((data:any) => {
            this.resData = data;
            var obj = this.resData;
            if (obj.status == 200) 
            {
              this.tostr.success(obj.message);
              this.Loader = this.loader.hide();  
              this.get_process_data();
              this.closeUploadModal();
            } 
            else 
            {
               this.alertService.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
  	}
  }

  process_shipment(id)
  {
  	this.Loader = this.loader.show();
  	var json = 
  	{
    	batch_number:id
	}
	this.client.process_bulk_order(json).subscribe((data:any) => {
            var response = data._body;
  		var obj = JSON.parse(response);
            if (obj.status == 200) 
            {
            	 this.get_process_data();
               this.get_Success_data();
              this.tostr.success(obj.message);
              this.Loader = this.loader.hide();  
            } 
            else 
            {
               this.alertService.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });

  }

  download_manifest(modal,id)
  {
  	var json = 
  	{
    batch_number:id
	}
	this.client.dowload_bulk_order(json).subscribe((data:any) => {
            var response = data._body;
  		var obj = JSON.parse(response);
            if (obj.status == 200) 
            {
              this.Listdata = obj.result;
            	 this.get_process_data()
              //this.tostr.success(obj.message);
              this.Loader = this.loader.hide();  

            } 
            else 
            {
               this.alertService.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });

      this.download = this.modalService.show(modal,
      {
        class:"modal-lg"
      })
  }

  close_download()
  {
    this.download.hide();
  }

  send_to_client(id)
  {
  	var json = 
  	{
    batch_number:id
	}
	this.client.send_to_client(json).subscribe((data:any) => {
            var response = data._body;
  		var obj = JSON.parse(response);
            if (obj.status == 200) 
            {
              this.get_process_data()
              this.tostr.success(obj.message);
              this.Loader = this.loader.hide();  
            } 
            else 
            {
               this.alertService.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
  }

  down_meni(id)
  {
    var json = 
    {
       row:id
    }
    this.client.download_menifest(json).subscribe((data:any) => {
            var response = data._body;
      var obj = JSON.parse(response);
            if (obj.status == 200) 
            {
              if(obj.result != "    ")
              {
                this.tostr.success(obj.message);
              }
              else{
                this.tostr.error("Data not found");
              } 
            } 
            else 
            {
               this.tostr.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
  }

  labeldata:any;
  down_label(id)
  {
      var json = 
    {
       row:id
    }
    this.client.download_bulk_label(json).subscribe((data:any) => {
            var response = data._body;
      var obj = JSON.parse(response);
            if (obj.status == 200) 
            {
              this.labeldata = obj.result;
              this.labeldata = JSON.parse(this.labeldata);
              var pdfopen = this.labeldata.label_pdf;
               //console.log(pdfopen);
              window.open(pdfopen);
              this.tostr.success(obj.message); 
            } 
            else 
            {
               this.tostr.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
  }

groupData:any;
dataResult:any;
  down_csv(id)
  {
         var json = 
    {
       row:id
    }
    this.client.download_bulk_csv(json).subscribe((data:any) => {
            var response = data._body;
      var obj = JSON.parse(response);
            if (obj.status == 200) 
            {
              this.dataResult = obj.result;
             // this.groupData = this.organise(this.dataResult);
              this.exportAsXLSX();
              this.tostr.success(obj.message); 
            } 
            else 
            {
               this.tostr.error(obj.message);
               this.Loader = this.loader.hide();
               if(obj.message.includes("authToken"))
                 {
                   this.router.navigate(['/signin/'+obj.message]);
                 }
            }     
          });
  }

exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataResult, 'export-to-excel');
  }

}
