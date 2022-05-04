import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-invoicedetails',
  templateUrl: './invoicedetails.component.html',
  styleUrls: ['./invoicedetails.component.css']
})
export class InvoicedetailsComponent implements OnInit {
  Loader:any;
  invoice_no:any;
  detailsdata:any=[];
  p:any;
  userID:any;

  disputeList:any[] = [
  {
    id:"1",
    name:"Weight Dispute",
    value:"weight_dispute"
  },
  {
    id:"2",
    name:"Rate Dispute",
    value:"rate_dispute"
  },
  {
    id:"3",
    name:"Other Dispute",
    value:"other_dispute"
  }
  ]

dispute_form = new FormGroup({d_type:new FormControl})

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
   this.route.params.subscribe( params => {
      if('id' in params && params['id'] != ''){
         this.invoice_no = params['id'];
      }
    }); 
    this.invoicedetaildata(this.invoice_no);
  }

  invoicedetaildata(invoice_no)
  {
    this.Loader = this.loader.show();
    var json = 
    {
      "invoice_no": invoice_no
    }
    this.client.invoicesdetails(json).subscribe((data: any) => {
        this.Loader = this.loader.hide();
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == 200) {
          this.detailsdata = obj.result;
        }
        else
        {          
          if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
        }
      });
  }
 
  go_to_home()
  {
    this.router.navigate(['/dashboard/']);
  }

  back(link)
  {
     this.router.navigate(['/allinvoices/'], { queryParams: { act: link } });
  }

  weight_modal:BsModalRef;

height:any;
width:any;
length:any;


couriername:any;
servicename:any;
totalinvoicevalue:any;
weight_disp_height:any = '';
weight_disp_width:any = '';
weight_disp_length:any = '';
pickuppincode:any;

  open_weigh_modal(modal, id)
  {
    var dimenssion;
    for(let i:number = 0; i < this.detailsdata.length; i++)
    {
      if(id == this.detailsdata[i].id)
      {
        dimenssion = this.detailsdata[i].EnteredDimensions;
        this.couriername = this.detailsdata[i].CourierName;
        this.servicename = this.detailsdata[i].ServiceType;
        this.totalinvoicevalue = this.detailsdata[i].TotalInvoiceValue;
        this.pickuppincode = this.detailsdata[i].PickupPincode;
      }
    }
    if(dimenssion.includes("x"))
    {
      dimenssion = dimenssion.split("x");
      this.height = dimenssion[0]
      this.width = dimenssion[1]
      this.length = dimenssion[2]
    }
    else
    {
      dimenssion = dimenssion.split("X");
      this.height = dimenssion[0]
      this.width = dimenssion[1]
      this.length = dimenssion[2]
    }
    this.weight_modal = this.modalService.show(modal,
    {
      class:"modal-xl",
    })
  }

calculate_weight()
{
  if(this.weight_disp_height != "" && this.weight_disp_width != "" && this.weight_disp_length != "" )
  {
    var json:any = { 
      couriername:this.couriername,
      servicename:this.servicename,
      totalinvoicevalue:this.totalinvoicevalue,
      weight_disp_height:this.weight_disp_height,
      weight_disp_width:this.weight_disp_width,
      weight_disp_length:this.weight_disp_length,
      pickuppincode:this.pickuppincode,
    }
    this.client.calculate_weight(json).subscribe((data: any) => {
        this.Loader = this.loader.hide();
        var response = data._body;
        var obj = JSON.parse(response);
        if (obj.status == 200) {
          //this.detailsdata = obj.result;
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


  close_weight()
  {
    this.weight_modal.hide();
  }

  bill_summary:BsModalRef;
  avn_id:any;
  base_charge:any;
  cgst:any;
  sgst:any;
  igst:any;
  total:any;
  open_summary(modal, avnid, basecharge, cgst, sgst, igst, total)
  {
      this.avn_id = avnid;
      this.base_charge = basecharge;
      this.cgst = cgst;
      this.sgst = sgst;
      this.igst = igst;
      this.total = total;

      //console.log(this.avn_id)
      this.bill_summary = this.modalService.show(modal,
      {
        class:""
      })
  }

  close_summary()
  {
      this.bill_summary.hide();
  }

  submit(){}


}
