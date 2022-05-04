import { Component, OnInit,OnDestroy, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-in-process',
  templateUrl: './in-process.component.html',
  styleUrls: ['./in-process.component.css']
})
export class InProcessComponent implements OnInit,OnDestroy {

@Output() process_count:EventEmitter<any> = new EventEmitter
 
  product_details:FormArray;
  Loader:any;
   a:any;
  Table_process_tab:any[]=[];
  str:any;
  splitted:any;
  Order_status:any;

  total:any;
  success:any;
  process:any;
  failed:any;
  count:any;
  procesJson:any={}
  upd_indx :any;
  mydata:any=[];
  dataPaymode:any[] = [
  {
    id:"1",
    name:"cod",
  },
  {
    id:"2",
    name:"online",
  }
  ]; 
ajaxongoing = false;
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
     private xls:JsonToExcelService,
    ) { 
  //  this.getProcessData();
  }

  ngOnInit(): void {
    this.getProcessData();
  }

filter_count:any;
    getProcessData(page_no=1)
  {
    if(this.ajaxongoing){
        return;
    }
    this.ajaxongoing = true;
    if(page_no == 1){
    this.Table_process_tab = [];
  }
    this.Loader  = this.loader.show();
    this.procesJson ={
      limit:"20",
      page_no:page_no,
      start_date:"",
      end_date:"",
      pick_mobile:"",
      del_mobile:"",
      order_by:"",
      avn_service:"",
      status_code:"",
      active_tab:"",
      order_id:"",
      payment_mode:"",

    };
    this.client.All_orders(this.procesJson).subscribe((data: any) => {
      this.ajaxongoing = false;
      var response = data._body;
      this.Loader  = this.loader.hide();       
      var obj = JSON.parse(response);
      if (obj.status == 200) {
      
         this.Order_status = obj.result.shipyaari_status;
         //this.Table_process_tab=obj.result.processorderlist.processorderdetails;
         this.total = obj.result.processorderlist.total;
         this.success = obj.result.processorderlist.success_order;
         this.process = obj.result.processorderlist.processing_order;
         this.failed = obj.result.processorderlist.failed_order;

           this.mydata = obj.result.processorderlist.processorderdetails;  
           //tackno
           for(let i:number = 0; i < this.mydata.length; i++)
           {
             this.mydata[i].tackno = "";
           }
           this.Table_process_tab = this.Table_process_tab.concat(this.mydata) 
           this.changeTableSelection(this.Table_process_tab); 

           this.filter_count = obj.result.ordercount.totalprocessorder;
           this.process_count.emit(this.filter_count);     
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

   onScrollInprocessorder() {     
    if(this.count >= this.procesJson.page_no)
    {
      this.procesJson.page_no++;
      //console.log(this.allorderJson.page_no++)
      this.getProcessData(this.procesJson.page_no);
    }
  }


  listCheck:any[] = [];
changeTableSelection(data)
  {

     for(let i:number = 0; i < this.listCheck.length; i++)
      {
          this.listCheck.pop();
      }
     var num:number;
      
       for(let i:number = 0; i < data.length; i++)
       {
         num = data[i].id;
         this.listCheck.push(num);
       }
       var x =  this.listCheck.filter((value,index) => this.listCheck.indexOf(value) === index)
       this.listCheck = x;
       //console.log(this.listCheck);    
  }


edit_bulk_modal:BsModalRef;
status_label:any;
form_data:any = 0;
type:any;
edit_bulk(modal, status, id, type,index_val)
{ 
  this.proces_flag = 0;
  this.Loader  = this.loader.show(); 
  this.type = type;
  this.form_data = 0;
    var a = this.bulk_update.get('product_details') as FormArray;
   for(let j in a){
      a.removeAt(parseInt(j));
   }
  this.bulk_update.reset();
  this.status_label = status;
  var json = 
  {
      id:id,
      type:type
  }
  this.client.edit_bulk(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.Loader  = this.loader.hide(); 
           this.upd_indx = index_val;
           this.bulk_update.get('id').setValue(obj.result.userdetails.id);
           this.bulk_update.get('order_number').setValue(obj.result.userdetails.order_id);
           this.bulk_update.get('ship_date').setValue(obj.result.userdetails.ship_date);
           this.bulk_update.get('no_of_package').setValue(obj.result.productdetaildata.length);
           this.bulk_update.get('partner_name').setValue(obj.result.userdetails.partner_name);
           this.bulk_update.get('avn_service').setValue(obj.result.userdetails.avn_package);
           this.bulk_update.get('paymode').setValue(obj.result.userdetails.PaymentMode);
           this.bulk_update.get('total_inv_val').setValue(obj.result.userdetails.TotalInvoiceValue);
           this.bulk_update.get('pick_name').setValue(obj.result.userdetails.pickup_company_name);
           this.bulk_update.get('pick_contact').setValue(obj.result.userdetails.pickup_contact_no);
           this.bulk_update.get('pick_pincode').setValue(obj.result.userdetails.pickup_pincode);
           this.bulk_update.get('pick_landmark').setValue(obj.result.userdetails.pickup_landmark);
           this.bulk_update.get('pick_add1').setValue(obj.result.userdetails.pickup_address1);
           this.bulk_update.get('pick_add2').setValue(obj.result.userdetails.pickup_address2);
           this.bulk_update.get('del_name').setValue(obj.result.userdetails.customer_name);
           this.bulk_update.get('del_email').setValue(obj.result.userdetails.customer_email);
           this.bulk_update.get('del_contact').setValue(obj.result.userdetails.customer_phone);
           this.bulk_update.get('del_pincode').setValue(obj.result.userdetails.delivery_pincode);
           this.bulk_update.get('del_add1').setValue(obj.result.userdetails.delivery_address1);
           this.bulk_update.get('del_add2').setValue(obj.result.userdetails.delivery_address2);
           this.form_data = null;
           var mydata = null;
            mydata = obj.result.productdetaildata;
             this.form_data = mydata.length
            this.add_row(mydata.length);
           for(let i:number = 0; i < mydata.length; i++)
           {
              
             var dim = mydata[i].Dimension;
             var dim = dim.split("x");
             var l = dim[0];
             var w = dim[1];
             var h = dim[2];
             mydata[i].l = l;
             mydata[i].h = h;
             mydata[i].w = w;

           }
         
        // console.log(mydata);
           this.bulk_update.get('product_details').setValue(this.existing_Data(mydata));
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
   this.edit_bulk_modal = this.modalService.show(modal,
  {
    class:"modal-xl",
  })

 

}

close_bulk()
  {
    this.edit_bulk_modal.hide();
  }

existing_Data(a:any)
{
  var count = 0;
  var formArray = [];
  a.forEach(s => {
    formArray.push({
       Prod_name:s.ProductName,
       sku:s.SKU,
       l:s.l,
       w:s.w,
       h:s.h,
       weight:s.Weight,
       qty:s.Qty,
       inv_val:s.InvoiceValue,
    });
    count++;
  });
  return formArray;
}  

get_prod_details() : FormGroup
{
  return this.fb.group({
     Prod_name:new FormControl(''),
     sku:new FormControl(''),
     l:new FormControl(''),
     w:new FormControl(''),
     h:new FormControl(''),
     weight: new FormControl(''),
     qty:new FormControl(''),
     inv_val:new FormControl(''),
  })
}


 bulk_update = new FormGroup({
   id: new FormControl(''),
   order_number: new FormControl(''),
    ship_date: new FormControl(''),
    no_of_package: new FormControl(''),
    partner_name: new FormControl(''),
    avn_service: new FormControl(''),
    paymode: new FormControl(''),
    total_inv_val: new FormControl(''),
   
      pick_name: new FormControl(''),
      pick_contact: new FormControl(''),
      pick_pincode: new FormControl(''),
      pick_landmark: new FormControl(''),
      pick_add1: new FormControl(''),
      pick_add2: new FormControl(''),

  
      del_name: new FormControl(''),
      del_email: new FormControl(''),
      del_contact: new FormControl(''),
      del_pincode: new FormControl(''),
      del_add1: new FormControl(''),
      del_add2: new FormControl(''),
   
    product_details: this.fb.array([this.get_prod_details()]),
 });


 add_row(x:number)
 {
   //console.log(x);

   var a = this.bulk_update.get('product_details') as FormArray;
     for(var i:number = 0; i < x; i++)
     {
       a.push(this.get_prod_details());
     }

 }


get_finalPorduct()
{
   
  var formArray = [];
  this.prod_data.forEach(s => {
    formArray.push({
      productName:s.Prod_name,
      SKU:s.sku,
      Dimension:s.Dimension,  
      weight:s.weight,           
      qty:s.qty,
      total:s.inv_val,
    });
  });
  return formArray;

}


prod_data:any;
Submit(index_val) {
  this.proces_flag = 1;
  var a = this.bulk_update.get('product_details').value; 
  for(let i:number = 0; i<a.length; i++) { a[i].Dimension = a[i].l+"x"+a[i].w+"x"+a[i].h; }
  this.prod_data = a;
  this.Loader  = this.loader.show();
  var data = [];
  var json =  {
       typ:this.type,
       pickup_id:this.bulk_update.get('id').value,
       order_id:this.bulk_update.get('order_number').value,
       client_gst:"",
       seller_gst:"",
       ship_date:this.bulk_update.get('ship_date').value,
       paymentMode:this.bulk_update.get('paymode').value,
       totalInvoiceValue:this.bulk_update.get('total_inv_val').value,
       selectCouriercompany:this.bulk_update.get('partner_name').value,
       avn_package:"",
       NoOfPackages:this.bulk_update.get('no_of_package').value,
       pickup_address: {
         pickup_company_name: this.bulk_update.get('pick_name').value,
         pickup_contact_no: this.bulk_update.get('pick_contact').value,
         pickup_pincode:this.bulk_update.get('pick_pincode').value,  
         pickup_landmark:this.bulk_update.get('pick_landmark').value,     
         pickup_address1 : this.bulk_update.get('pick_add1').value,
         pickup_address2: this.bulk_update.get('pick_add2').value    
        }, delivery_address : {
        customer_name :this.bulk_update.get('del_name').value,    
        customer_email:this.bulk_update.get('del_email').value, 
        customer_phone : this.bulk_update.get('del_contact').value, 
        delivery_pincode : this.bulk_update.get('del_pincode').value, 
        delivery_address1:this.bulk_update.get('del_add1').value,        
        delivery_address2:this.bulk_update.get('del_add2').value 
      },
     productdetails: this.get_finalPorduct(),
    }
  this.client.in_process_update(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
           this.Loader  = this.loader.hide();
           this.close_bulk(); 
           this.tostr.success(obj.message);
           this.process_data(index_val,2);
           // this.getProcessData();
           //alert("success");     
      }
       else
      {
        this.tostr.error(obj.message); 
        //alert("fail");    
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}


download_error_sheet()
{
  
  this.client.in_proces_errorsheet(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
           this.Loader  = this.loader.hide();    
             this.xls.exportAsExcelFile(obj.result,"file");
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

clear_record()
{
  this.proces_flag = 0;
  this.Loader = this.loader.show();
  this.client.in_process_clear(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
           this.Loader  = this.loader.hide(); 
            this.getProcessData();      
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

ngOnDestroy(){
  try{
  this.bulk_update.reset();
  }
  catch(e){
    console.log('des',e);
  }
}

onclick_next()
{
  this.proces_flag = 0;
  this.getProcessData();
}


proces_flag:any  = 0;
process_data(val,is_edit=1) {
  if(is_edit !=3){
    this.proces_flag = 1;
    if(this.listCheck.length > val){
      this.Table_process_tab[val].process_class = "1";
      if(this.Table_process_tab[val].type == "b2b"){ this.onclick_process_b2b(this.listCheck[val], val,is_edit) }
      else { this.onclick_process(this.listCheck[val], val,is_edit); }
    }
  }
}



  onclick_process(data, count,is_edit){
    var json =  { id:data }
    var n_cnt = parseInt(count) + 1;
     if(is_edit == 2){
      is_edit = parseInt(is_edit) + 1;
    }
    
    
    this.client.process_process(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       if(obj.result != "") {
           this.Table_process_tab[count].tackno = obj.result.tracking_number;
           this.Table_process_tab[count].charge = obj.result.amt;
           this.Table_process_tab[count].process_class = "2";
          } else {
            this.Table_process_tab[count].process_class = "3";
          }
          this.process_data(n_cnt,is_edit);
      } else if(obj.status == 401){
        this.process_data(n_cnt,is_edit);
        this.Table_process_tab[count].process_class = "3";
      } else {
        if(obj.message.includes("authToken")) {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
    
  }

  onclick_process_b2b(data, count,is_edit) {
    var json = { id:data }
    var n_cnt = parseInt(count) + 1;
    if(is_edit == 2){
      is_edit = parseInt(is_edit) + 1;
    }
    
    this.client.process_process_b2b(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        if(obj.result != "") {
          this.Table_process_tab[count].tackno = obj.result.tracking_number;
          this.Table_process_tab[count].charge = obj.result.amt;
          this.Table_process_tab[count].process_class = "2";
        } else{
          this.Table_process_tab[count].process_class = "3";
        }
        this.process_data(n_cnt,is_edit);
      } else if(obj.status == 401){
        this.process_data(n_cnt,is_edit);
        this.Table_process_tab[count].process_class = "3";
      } else {
        //this.Loader = this.loader.hide();
        if(obj.message.includes("authToken")) {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
    
    
  }
}