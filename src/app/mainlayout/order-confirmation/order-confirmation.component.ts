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
@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  Loader:string;
  orderlist:any;
  sample_url:any;
  listcountdata:any;
  my_extension_details:any;
  extension:any;
  su_cnt:any
  total:any;
  pro_cnt:any;
  f_ct:any;
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  file:any = null;
  upload:BsModalRef;
  record:BsModalRef;
  order_id:any = null;
  extensionmodal:BsModalRef;
  ext_list:BsModalRef;
  veiw_details:BsModalRef;
  status_modal:BsModalRef;
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
    private tostr:ToastrService
  ) { }

  ngOnInit(): void {
    this.orderConfirmationList();
  }
  orderConfirmationList()
  {
    //this.Loader  = this.loader.show();
    var json = 
    {
      limit:"100",
      page_no:"",
      start_date:"",
      end_date:"",
      order_by:""
    }
    this.client.orderConfirmation(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);

      if (obj.status == 200) {           
        this.orderlist=obj.result.listdata;  
        this.sample_url=obj.result.sample_url;
        this.listcountdata=obj.result.listcountdata;
        this.su_cnt = obj.result.listcountdata.su_cnt;
        this.total = obj.result.listcountdata.total;
        this.pro_cnt = obj.result.listcountdata.pro_cnt;
        this.f_ct = obj.result.listcountdata.f_ct;

        this.my_extension_details=obj.result.my_extension_details;
        this.extension=obj.result.extension;

        for(let i:number = 0; i < this.orderlist.length; i++)
         {
           this.orderlist[i].checked = false; 
         }
           
      }
       else
      {
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

download_sheet()
{
  if(this.sample_url != '')
  {
      window.open(this.sample_url);
  }
}

  upload_modal(modal)
  {
     this.upload = this.modalService.show(modal,
     {
       class:"modal-sm",
     })
  }

  close_upload()
  {
    this.upload.hide();
  }

resData:any;
  upload_sheet()
  {
    var a :any = ( < HTMLInputElement > document.getElementById('sheet')).files;
    if(a == null || a == '' || this.file == null)
    {
        this.tostr.error("Please upload File");
    }
    else
    {
        
         const payload = new FormData();
        this.Loader = this.loader.show();
         // payload.append("app_token" , localStorage.getItem("token"));
          payload.append("order_con_excel_file" , a[0]);
      this.http
      .post("https://dev.shipyaari.com/angularapi/orderconfirmation/orderConUpload",
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
              this.orderConfirmationList(); 
             this.close_upload();
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
  }

open_call_record(modal)
{
    this.record = this.modalService.show(modal,
    {
      class:"modal-sm",
    })
}

close_call_record()
{
  this.record.hide();
}

search_call()
{
  if(this.order_id == null || this.order_id == '')
  {
      this.tostr.error("Please Provide Order Id")
  }
  else
  {
    var json = 
    {
      order_id:this.order_id,
    }
    this.client.serch_call_resord(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      //console.log(obj);
      if (obj.status == 200) {   
        this.tostr.success(obj.message);
        this.close_call_record();        
      }
       else
      {
        this.tostr.error(obj.message);
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
}

open_ext_etting(modal)
{
  this.client.extention_setting(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {   
        //this.tostr.success(obj.message);
        //this.close_call_record();        
      }
       else
      {
        this.tostr.error(obj.message);
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });

    this.extensionmodal = this.modalService.show(modal,
    {
      class:"",
    })
}

close_ext_setting()
{
    this.extensionmodal.hide();
}


exten_list:any;
open_ext_list(modal)
{
  this.client.extention_Details(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {   
           this.exten_list = obj.result;
      }
       else
      {
        this.tostr.error(obj.message);
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });

    this.ext_list = this.modalService.show(modal,
    {
      class:"",
    })
}

close_ext_list()
{
    this.ext_list.hide();
}

clear_all()
{
  if(confirm("Are you sure to clear data ?")) {
   this.client.con_order_clear_bulk_record(localStorage.getItem('getItem')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {   
           this.exten_list = obj.result;
           this.tostr.success(obj.message);
           this.orderConfirmationList();
      }
       else
      {
        this.tostr.error(obj.message);
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
}

checkVal:boolean = false;
checkAllCheckBox(ev) 
{
  //console.log(this.checkVal);
  //var data;
   this.orderlist.forEach(x =>
      x.checked = ev.target.checked,   
    )


  }


 check:any[] = [];
  changeSelection()
  {
     for(let i:number = 0; i < this.check.length; i++)
      {
          this.check.pop();
      }
     var num:number;
       var a =  this.orderlist.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].id;
         this.check.push(num);
       }
       var x =  this.check.filter((value,index) => this.check.indexOf(value) === index)
       this.check = x;
       console.log(this.check);
        
  }

delete_bulk()
{
  if(this.check[0] == undefined)
  {
      this.tostr.error("Please select row");
  }
  else
  {
     if(confirm("Are you sure to delete selected rows ?")) {
       var json = 
       {
         values:this.check,
       }
       this.client.con_order_clear_bulk_record(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {   
           //this.exten_list = obj.result;
           this.tostr.success(obj.message);
           this.orderConfirmationList();
      }
       else
      {
        this.tostr.error(obj.message);
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
     }
  } 
}


feedback_list:any;
reasonlist:any;
userdata:any;
confirm_id:any;
client_order_id:any;
prod_list:any;

total_length:any[] = [];
total_height:any[] = [];
total_width:any[] = [];

final_l:any;
final_h:any;
final_w:any;


open_view(modal, id, orderid)
{
  this.confirm_id = id;
  this.client_order_id = orderid;
  var json =
  {
    id:id,
  }
  this.client.order_con_viewdata(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {   
          this.userdata = obj.result.userdetails;
          this.reasonlist = obj.result.ndr_calldispostion;
          this.feedback_list = obj.result.ndr_customerfeedback;
          this.prod_list = obj.result.productdetaildata;
          var prodList = this.prod_list;

          for(let i:number = 0; i < prodList.length; i++)
          {
              var dim = prodList[i].Dimension;
              if(dim.includes("x"))
              {
                var dim = dim.split("x");
             var l = dim[0];
             var w = dim[1];
             var h = dim[2];
             prodList[i].l = l;
             prodList[i].h = h;
             prodList[i].w = w;
              }
              else{
                var dim = dim.split("X");
             var l = dim[0];
             var w = dim[1];
             var h = dim[2];
             prodList[i].l = l;
             prodList[i].h = h;
             prodList[i].w = w;
              }
          }
             this.prod_list = prodList;
             var t_l:number = 0;
              var t_h:number = 0;
              var t_w:number = 0;
            for(let i :number = 0; i < this.prod_list.length; i++ )
            {
                this.total_length.push(this.prod_list[i].l);
                this.total_height.push(this.prod_list[i].h);
                this.total_width.push(this.prod_list[i].w);
            }

           t_l = this.total_length.map(a => parseFloat(a)).reduce(function(a, b)
            {
              return a + b;
            });

            t_h = this.total_height.map(a => parseFloat(a)).reduce(function(a, b)
            {
              return a + b;
            });


             t_w = this.total_width.map(a => parseFloat(a)).reduce(function(a, b)
            {
              return a + b;
            });
             

             this.final_l = t_l;
             this.final_h = t_h;
             this.final_w = t_w;

             console.log(this.prod_list);
      }
       else
      {
        this.tostr.error(obj.message);
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });

   this.veiw_details = this.modalService.show(modal,
   {
     class:"modal-xl",
   })
}

close_view()
{
  this.veiw_details.hide();
}

status_detals_list:any;
status_details(modal, id)
{
  var json = 
  {
    order_confirmation_id:id,
  }
  this.client.status_viewdata(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {   
          this.status_detals_list = obj.result;
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


    this.status_modal = this.modalService.show(modal,
    {
      class:"modal-xl"
    })
}

close_status()
{
    this.status_modal.hide();
}

delete(id)
{
   if(confirm("Are you sure to delete?")) {
  var json = 
  {
    id:id
  }
  this.client.order_con_delete(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
       this.tostr.success(obj.message); 
          this.orderConfirmationList();
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

reason:any;
feedback:any;
remark:any;
onSubmit(f)
{
    var json = 
    {
      client_order_id: this.client_order_id,
      order_confirmation_id:this.confirm_id,
      calldispostion:this.reason,
      cust_feedback:this.feedback,
      agent_remark:this.remark
    }
    this.client.order_con_action(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
       this.tostr.success(obj.message); 
          //this.orderConfirmationList();
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


onhold()
{
  var json = 
  {
    id:this.confirm_id,
  }
  this.client.order_con_hold(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
       this.tostr.success(obj.message); 
       this.close_view();
          //this.orderConfirmationList();
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

onreject()
{
  var json = 
  {
    id:this.confirm_id,
  }
  this.client.order_con_reject(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
       this.tostr.success(obj.message); 
       this.close_view();
          //this.orderConfirmationList();
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

onredit()
{
  var json = 
  {
    id:this.confirm_id,
  }
}

get_finalPorduct()
{

}


get_prod_data(data)
{
      var formArray = [];
      data.forEach(s => {
        formArray.push({
            productName: s.ProductName ,
            SKU:s.SKU ,
            price: "",
            weight: s.Weight,
            qty: s.Qty ,
            total:s.InvoiceValue,
        });
      });
  return formArray;
}

ExistingProduct(count, prod)
{

}


onbook()
{
 // this.userdata;
  //is.prod_list;
  var listdata = this.userdata;
  var json = 
  {
    typ: this.userdata.PackageType,
    order_id: this.userdata.order_id,
    ship_date: this.userdata.ship_date,
    paymentMode: this.userdata.PaymentMode,
    totalInvoiceValue: this.userdata.TotalInvoiceValue,
    NoOfPackages: this.userdata.NoOfPackages,
    total_line_items_price_set: "",
    total_discounts_set: "",
    total_shipping_price_set: "",
    service_type: "",
    SelectCouriercompany: "",
    pickup_address: {
        pickup_id: "",
        pickup_company_name: this.userdata.pickup_company_name,
        pickup_contact_no: this.userdata.pickup_contact_no,
        pickup_pincode: this.userdata.pickup_pincode,
        pickup_landmark: this.userdata.pickup_landmark,
        pickup_address1: this.userdata.pickup_address1,
        pickup_address2: this.userdata.pickup_address2
    },
    delivery_address: {
        customer_name: this.userdata.customer_name,
        customer_email:this.userdata.customer_email,
        customer_phone: this.userdata.customer_phone,
        delivery_pincode: this.userdata.delivery_pincode,
        delievry_landmark: this.userdata.delivery_landmark,
        delivery_address1: this.userdata.delivery_address1,
        delivery_address2: this.userdata.delivery_address2
    },
    total_price_set: "",
    product_data: [{
      package_weight: this.userdata.Package_Weight,
      package_length: this.final_l,
      package_width: this.final_h,
      package_height: this.final_w,
      total: this.userdata.TotalInvoiceValue,
      package_details:this.get_prod_data(this.prod_list),
    },]
}
console.log(json)
this.client.order_con_book(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {  
       this.tostr.success(obj.message); 
       this.close_view();
          //this.orderConfirmationList();
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
