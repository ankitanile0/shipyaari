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
import { DateFormatService } from 'src/app/services/date-format.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
 date:any;
reporttype:any = '';
Loader:string;
from_date:any;
to_date:any;
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
    private datechange:DateFormatService,

  ) { }

  ngOnInit(): void {
  }


go_to_cod(){this.router.navigate(['/cod/']);} 
go_to_all_inv(){this.router.navigate(['/allinvoices/']);}
go_to_reports(){this.router.navigate(['/reports/']);}

  downloadReport(f)
  {
  	if(f.valid)
  	{
    if(this.date == '' || this.date == null)
    {
      this.tostr.error("Please Enter Proper Data");
    }
    else{
      var daterange:any;    
      var temp:string = this.date;     
      daterange = this.datechange.changeDateFormate(temp);     
      this.to_date = daterange[1];
      this.from_date = daterange[0];
     
    

      this.Loader = this.loader.show();
      let json:any ={
        from_date:this.from_date,
        to_date:this.to_date,
        report_type:this.reporttype   
      };

      this.client.billingReport(json).subscribe((data: any) => {
        this.Loader = this.loader.hide();
        var response = data._body;
        var obj = JSON.parse(response);
        console.log(obj);
        if (obj.status == 200) {  
          this.excelService.exportAsExcelFile(obj.result, 'file Name'); 
          this.tostr.success(obj.message);
        }else
        {         
          this.alertService.error(obj.message);
          this.tostr.error(obj.message);
          if(obj.message.includes("authToken"))
            {
              this.router.navigate(['/signin/'+obj.message]);
            }
        }    
      });
  }

    }
    else
  {
  	this.tostr.error("Please Enter Proper Data")
  }
  }

}