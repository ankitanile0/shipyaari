import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';
import { DateFormatService } from 'src/app/services/date-format.service';

@Component({
  selector: 'app-shipping-charge',
  templateUrl: './shipping-charge.component.html',
  styleUrls: ['./shipping-charge.component.css']
})
export class ShippingChargeComponent implements OnInit {
  dateRange:any
  Loader:any;
  trackingID:any;
  p:any;
  str:any;
  splitted:any;
  billing:BsModalRef;
  end_date1:any;
  start_date1:any;
  constructor(
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
    private tostr:ToastrService,
    private jsontoexcel:JsonToExcelService,
    private http: HttpClient,
    private datechange:DateFormatService,
    ) { }

  ngOnInit(): void {
    this.get_data();
  }

list:any;
  get_data()
{
  this.Loader = this.loader.show();
  var json = 
  {
      start_page: "",
      limit: "1000",
      page_no: "",
      order_by: "",
      tab_type: "",
      tracking_no:this.trackingID
  }

  this.client.all_invoices(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.list = obj.result.shipping_Charges;

        for (var i=0; i < this.list.length; i++){                
            this.str =this.list[i].ShipyaariID;
            this.splitted = this.str.split("-", 2);  
            var client_consignment_id =this.splitted[1];        
            this.list[i].client_consignment_id =  client_consignment_id;
        }
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
detailsModal:BsModalRef;
datalist:any;
prodlist:any;
detailsmodal(modal, id:number)
    {
      //alert(id)

      var json = 
      {
        consignment_id:id,
      }
      this.client.order_details_modal(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.datalist = obj.result.consignmentdetails;
        this.prodlist = obj.result.consignmentdetails.productdata;
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


       this.detailsModal = this.modalService.show(modal,
       {
         class:"modal-xl",
       }) 
    }

 close_modal()
 {
   this.detailsModal.hide();
 }  

go_to_tracking(id:number)
{
  var url = '/track/'+id;
  window.open(url);
}
open_billing(modal){
  this.billing=this.modalService.show(modal,{
    class:"modal-sm"

  });
}
  close_billing()
  {
    this.billing.hide();
  }

  searchbillingdata(f)
  {
    var date = this.dateRange;
    if(date == null || date == '')
    { 
       this.tostr.error("Please enter date");
    }else{      
      var daterange:any; 
      var temp:string = this.dateRange;
      daterange = this.datechange.changeDateFormate(temp);     
      this.end_date1 = daterange[1];
      this.start_date1 = daterange[0];
      console.log(this.end_date1+' '+this.start_date1 ); 
      var json = 
      {
        from_date:this.start_date1,
        to_date:this.end_date1
       
      }
      console.log(json);
      this.client.searchbillingdata(json).subscribe((data: any) => {
         var response = data._body;
         var obj = JSON.parse(response);
        if (obj.status == 200) {
          this.jsontoexcel.exportAsExcelFile(obj.result, 'file Name'); 
          this.tostr.success(obj.message);  
          this.close_billing();
        }else {
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


fileter_flag:any = 0;
filter()
{
  this.fileter_flag = 1;
  this.get_data();
}

reset_filter()
{
  this.fileter_flag = 0;
  this.trackingID = '';
  this.get_data();
}

}