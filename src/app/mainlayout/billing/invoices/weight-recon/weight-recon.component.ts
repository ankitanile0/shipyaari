import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weight-recon',
  templateUrl: './weight-recon.component.html',
  styleUrls: ['./weight-recon.component.css']
})
export class WeightReconComponent implements OnInit {

Loader:any;
trackingID:any;
p:any;
str:any;
splitted:any;
  constructor(
      private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,
    private modalService: BsModalService,
    private loader:LoaderService,
     private tostr:ToastrService,
      private http: HttpClient,
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
      tab_type: "wt_conciln",
      tracking_no:this.trackingID
  }

  this.client.all_invoices(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.list = obj.result.wt_cociln;
          var list_data =  obj.result.wt_cociln;
          for(let i:number = 0; i < this.list.length; i++)
          {
            var oldwt = this.list[i].oldweight;
            var newwt  = this.list[i].newweight;
            list_data[i].diffwt = newwt - oldwt;
            this.str =this.list[i].avn_shipping_id;
            this.splitted = this.str.split("-", 2);  
            var client_consignment_id =this.splitted[1];        
            this.list[i].client_consignment_id =  client_consignment_id;
          }

          this.list = list_data;
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