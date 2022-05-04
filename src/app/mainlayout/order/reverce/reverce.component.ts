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
  selector: 'app-reverce',
  templateUrl: './reverce.component.html',
  styleUrls: ['./reverce.component.css']
})
export class ReverceComponent implements OnInit {

id:any;

   Loader:any;
   bsValue = new Date();
   bsRangeValue: Date[];
   maxDate = new Date();
   minDate = new Date();

	 submitted = false;
  packageData:BsModalRef;
  packageData1:BsModalRef;
  add_shipment:FormGroup;
	product_data:FormArray;
	package_details:FormArray;
	add_new_address:FormGroup;
  service_flag:boolean = false;
  identical:boolean = true;
  insurance:boolean = true;
  pin:any;
  message_label:any;
  fetch_partner_ID:any

checkedRadio:boolean = false;

aval_serv_table:any;
tbaleTDData:any;

consignmentdata:any;
mainProd:any;
finalMainProd:any;


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
  	) 
  { 
  	this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  	this.getAddOrderData();
  	//this.Order_Form();
  }

go_to_order(){this.router.navigate(['/addorder/']);}
go_to_b2b(){this.router.navigate(['/b2border/']);}
go_to_add_bulk(){this.router.navigate(['/bulkorder/']);}
go_to_All_order(){this.router.navigate(['/allorder/']);}
go_to_channel(){this.router.navigate(['/channel/']);}

  ngOnInit(): void {
    this.Get_Country();
  	this.Order_Form();
    this.get_order_Data();
    this.get_template_list();
    this.fetch_data();
  	//console.log(this.add_shipment.value);
    //this.Mobile_Number=643;
  }

  set_row_value()
{
  var a = this.add_shipment.get('product_data') as FormArray;
  for(let i:number = 0; i < a.length; i++)
  { 
    var count= 0;
    var price=[];
    var row_total;
     var b = <FormArray> a.controls[i].get('package_details').value;
    // console.log(b);
     for(let j:number = 0; j < b.length; j++)
     {
         price.push(b[j].total);
     }
       row_total=price.reduce((a, b) => a + b, 0);
     a.controls[i].get('row_total').setValue(row_total,{emitEvent:false});
     //console.log("price",row_total);
  }
}


  go_to_home()
{
  this.router.navigate(['/dashboard/']);
}
 
fetch_data()
{
	var json =
	{
		consignment_id:this.id,
	}
	this.client.reverse_shipment(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Loader = this.loader.hide();
       this.deliveryAddress = obj.result.delivery_addresses;
       this.PickupAddlist = obj.result.pickup_address; 
       this.consignmentdata = obj.result.consignment;
       this.mainProd = obj.result.product;
       var p:any;
        for(let i:number = 0; i < this.mainProd.length; i++ )
           {
             p = JSON.parse(this.mainProd[i].product_data);
           }
         
           console.log("count",p.package_details.length);
             for(let k:number = 0; k < p.package_details.length; k++)
             {
               if(k > 0)
               {

                  this.addChildTable(0, 'any'); 
               }
               
             }
         
       this.set_data(this.consignmentdata, p);
      
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


set_data(data, mainProd)
{
  console.log(mainProd);
  var pick_gst = this.PickupAddlist[0].gst_number;
  var name = data.customer_name;
  name = name.split(" ");
  var fname = name[0];
  var lname = name[1];
  var orderId = data.client_order_id+"_copy";
  this.add_shipment.patchValue({
    // username:"",
    //customer
    // customer_contact_no:data.customer_contact_no,

  username:"",
  insurance:"",
  order_id:orderId,
  from_company_name:"",
  from_contact_number:"",
  from_pincode:"",
  from_landmark:"",
  from_address:"",
  from_address2:"",
  from_gst:pick_gst,//new
  f_com_name:this.PickupAddlist[0].pickup_id,//new
  pickup_id:"",//new
  to_pincode:data.delivery_pincode,
  to_landmark:data.delivery_landmark,
  to_address:data.delivery_addr,
  to_address2:data.delivery_addr2,
  to_state:data.delivery_state,//new
  to_city:data.delivery_city,//new
  to_country:data.delivery_country,//new
  to_company:"",//new
  customer_lname:lname,//new
  customer_name:fname,
  customer_email:data.customer_email,
  customer_contact_no:data.customer_contact_no,
  ship_date:new Date(),
  package_type:"",
  package_content:"",
  package_content_desc:"",
  total_invoice_value:"",
  created_by: "",
  payment_mode:"",
  package_name:"",
  partner_id:"",
  service_type:"",
  Cheapest:"",//new
  Best:"",//new
  Service:"",//new
  Courier:"",//new
  choose_service_parter:"",
  no_of_packages:data.no_of_packages,
  total_price_set:data.total_invoice_value,
  channel:"",
  identical:this.identical,//new
  Insurance:"",//new
  COD:"",//new
  reverse:"",
  gst_no:"",//new
  eway_bill_no:"",//new
  retailerName:"",//new
  Serv_id:"",//new
  part_id:"",//new
  cour_part_id:"",//new
  serv_serv_id:"",//new
  product_data:this.ExistingPackage(mainProd)
  })
  this.get_Pic_address();
  //console.log(this.add_shipment);

   setTimeout( ()=> {
     this.calucate_row_intv();
     this.set_row_value();
  } )


}

 ExistingPackage(a:any)
 {
  
   console.log(a);
    var formArray = [];
       formArray.push({
          package_weight:a.package_weight,
          package_length:a.package_length,
          package_width:a.package_width,
          package_height:a.package_height,
          total_weight:a.package_weight,
          package_details:this.existing_prods(a.package_details, a.package_weight),
        });
  return formArray;
 }

 existing_prods(prods:any, wt:any)
 {
   console.log(prods);
   var formArray = [];
  prods.forEach(s => {
    formArray.push({
      name:s.name,
      sku:s.sku,
      hsn:s.hsn,
      weight:wt,
      qty:s.qty,
      tax:s.tax,
      discount:s.discount,
      price:s.price,           
      total:s.total,
    });
  });
  return formArray;
 }



Order_Form()
{
	this.add_shipment = this.fb.group(
		{
	username:new FormControl(''),
	insurance:new FormControl(''),
	order_id:new FormControl('',Validators.required),
	from_company_name:new FormControl(''),
	from_contact_number:new FormControl(''),
	from_pincode:new FormControl(''),
	from_landmark:new FormControl(''),
	from_address:new FormControl(''),
	from_address2:new FormControl(''),
	from_gst:new FormControl(''),//new
    f_com_name:new FormControl('',Validators.required),//new
    pickup_id:new FormControl(''),//new
	to_pincode:new FormControl('',Validators.required),
	to_landmark:new FormControl(''),
	to_address:new FormControl('',Validators.required),
	to_address2:new FormControl(''),
	to_state:new FormControl(''),//new
	to_city:new FormControl(''),//new
	to_country:new FormControl(''),//new
	to_company:new FormControl(''),//new
	customer_lname:new FormControl(''),//new
	customer_name:new FormControl('',Validators.required),
	customer_email:new FormControl(''),
	customer_contact_no:new FormControl('',[Validators.required,Validators.maxLength(10), Validators.minLength(10)]),
	ship_date:new FormControl('',Validators.required),
	package_type:new FormControl(''),
	package_content:new FormControl(''),
	package_content_desc:new FormControl(''),
	total_invoice_value:new FormControl(''),
	created_by: new FormControl(''),
	payment_mode:new FormControl(''),
	package_name:new FormControl(''),
	partner_id:new FormControl(''),
	service_type:new FormControl(''),
  Cheapest:new FormControl(''),//new
  Best:new FormControl(''),//new
  Service:new FormControl(''),//new
  Courier:new FormControl(''),//new
	choose_service_parter:new FormControl(''),
	no_of_packages:new FormControl('',Validators.required),
	total_price_set:new FormControl(''),
	channel:new FormControl(''),
	identical:new FormControl(''),//new
	Insurance:new FormControl(''),//new
	COD:new FormControl(''),//new
	gst_no:new FormControl(''),//new
	eway_bill_no:new FormControl(''),//new
	retailerName:new FormControl(''),//new
  Serv_id:new FormControl(''),//new
  part_id:new FormControl(''),//new
  cour_part_id:new FormControl(''),//new
  serv_serv_id:new FormControl(''),//new
	product_data:this.fb.array([this.create_product_data()]),
	})


}

create_product_data(): FormGroup
  {
    return this.fb.group({
		package_weight:new FormControl(''),
		package_length:new FormControl('',Validators.required),
		package_width:new FormControl('',Validators.required),
		package_height:new FormControl('',Validators.required),
		total:new FormControl('',Validators.required),
		total_weight:new FormControl('',Validators.required),
		billabe_weight:new FormControl('',Validators.required),
    row_total:new FormControl(''),
		package_details:this.fb.array([this.create_package_data()])
    });
  }

create_package_data(): FormGroup
  {
    return this.fb.group({
    name:new FormControl('',Validators.required),
		price:new FormControl('',Validators.required),
		total: new FormControl(''),
		qty:new FormControl('',Validators.required),
		sku: new FormControl(''),
		hsn: new FormControl(''),
		discount:new FormControl(''),
		tax: new FormControl(''),
		weight:new FormControl('',Validators.required),
    wt:new FormControl(''),
    pkgname:new FormControl(''),
    });
  }

get f() { return this.add_shipment.controls; }

   a='';
  
  childArr:any[] = [
    {
     id : ''
     }
   ];

  mainTable:any[] = [
    {
      id : '',
      childArr: [
        {
          
        }
      ]
    }
  ];
  Pickup_Company_Name:any;
  Pickup_Name:any;
  Gst_Number:any;
  Pickup_Id:any;
  Delivery_Address_Name:any;
  Name:any;
  Email:any;
  Mobile_Number:any;
  Delivery_Pincode:any;
  Company_Name:any;
  Landmark:any;
  Address1:any;
  Address2:any;
  Country:any;
  State:any;
  City:any;
  Delivery_Email:any;

  deliveryAddress:any;
  PickupAddlist:any;
  template_List:any;

get prod_Data()
{
    return this.add_shipment.get('product_data') as FormArray;
}

get_order_Data()
{
  this.client.get_order_data(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.deliveryAddress = obj.result.delivery_addresses;
       //this.PickupAddlist = obj.result.pickup_address;
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

get_service_list()
{

}

delAddId:any;
cust_name:any;
cust_comp:any;
get_del_address()
{
  this.add_shipment.get('customer_contact_no');
  var json = {
    addres_id:this.delAddId,
  }
  this.client.del_add_details(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.cust_comp = obj.result.company_name;
        this.cust_name = obj.result.name;
        console.log(this.cust_name);
        var name = obj.result.name;
        name = name.replace(' ',',');
        name = name.split(',');
        //console.log(name);
         this.add_shipment.get('customer_contact_no').setValue(obj.result.mobile_number);
         this.add_shipment.get('customer_lname').setValue(name[1]);
         this.add_shipment.get('customer_name').setValue(name[0]);
         this.add_shipment.get('customer_email').setValue(obj.result.email);
         this.add_shipment.get('to_landmark').setValue(obj.result.landmark);
         this.add_shipment.get('to_address').setValue(obj.result.address1);
         this.add_shipment.get('to_address2').setValue(obj.result.address2);
         this.add_shipment.get('to_pincode').setValue(obj.result.delivery_pincode);
         this.add_shipment.get('to_city').setValue(obj.result.city);
         this.add_shipment.get('to_state').setValue(obj.result.state);
         var country = obj.result.country;
         if(country == 1)
         {
           this.add_shipment.get('to_country').setValue("India");
         }
         
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

PickAddId:any;
from_com_name:any;
get_Pic_address()
{
  var json = 
  {
    pickup_id:this.PickAddId,
  }
  this.client.pick_add_details(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.add_shipment.get('from_gst').setValue(obj.result.gst_number);
        //this.from_com_name = obj.result.pickup_company_name;
        this.add_shipment.get('from_company_name').setValue(obj.result.pickup_company_name);
        this.add_shipment.get('from_contact_number').setValue(obj.result.contact_number);
        this.add_shipment.get('from_pincode').setValue(obj.result.pickup_pincode);
        this.add_shipment.get('from_landmark').setValue(obj.result.pickup_landmark);
        this.add_shipment.get('from_address').setValue(obj.result.pickup_address1);
        this.add_shipment.get('from_address2').setValue(obj.result.pickup_address2);
        this.add_shipment.get('pickup_id').setValue(obj.result.pickup_id);
         
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


get_template_list()
{
  this.client.templatelist(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.template_List = obj.result; 
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

tempaleteVal:any;
templateID:any;
fetch_template(i:number,j:number, aa)
{
   var a = this.add_shipment.get('product_data') as FormArray;
   var b = <FormArray> a.controls[i].get('package_details');
  var json =
  {
    template_id:b.controls[j].get('pkgname').value,
  } 
  //console.log(json);
  this.client.template_data(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       var price = obj.result.product_price;
       var qty = obj.result.product_qty;
       var tax = obj.result.product_tax;
       var weight = obj.result.product_weight;
          b.controls[j].get('name').setValue(obj.result.template_name);
          b.controls[j].get('price').setValue(price);
          b.controls[j].get('qty').setValue(qty);
          b.controls[j].get('sku').setValue(obj.result.product_sku);
          b.controls[j].get('hsn').setValue(obj.result.product_hsn);
          b.controls[j].get('tax').setValue(tax);
          b.controls[j].get('weight').setValue(weight);
          this.calculate(aa);
          this.calculate_weight(aa);
          this.calculate(aa);
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

get_add_by_pin()
{
  var json =
  {
    pincode:this.Delivery_Pincode,
  }
  this.client.getAddressBypin(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.City = obj.result.city;
         this.State = obj.result.state;
         this.Country = obj.result.country;
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


//Add new address form
Pickup_data()
{
	this.add_new_address = new FormGroup
		({
		  Pickup_Name: new FormControl('', Validators.required,),
		  Pickup_Company_Name: new FormControl('', Validators.required,),
		  Contact_Person_Name: new FormControl('', Validators.required,),
		  Pickup_Contact_Number: new FormControl('', [Validators.required,Validators.minLength(10)]),
		  Pincode: new FormControl('', Validators.required,),
		  City: new FormControl(''),
		  State: new FormControl(''),
		  Country:  new FormControl(''),
		  Landmark: new FormControl('', Validators.required,),
		  Address1: new FormControl('', Validators.required,),
		  Address2: new FormControl(''),
		  GST_Number: new FormControl(''),
		})
}


//Submit new address from 
onSubmitAddress() {
  console.log(this.add_new_address.value);
}

getproduct_data()
{

}

  getCond(i:number){
  	 //console.log("papul"+i);
    let a = this.add_shipment.get('product_data') as FormArray;
    let b = <FormArray> a.controls[i].get('package_details') as FormArray;
    return b.controls;
  }

  addMainTable(){
    if(this.identical == true)
    {

    } else{
      var c ;
     var a = this.add_shipment.get('product_data') as FormArray;
    for(c = 1; c < this.a; c++)
      {
        a.push(this.create_product_data());
      }
    }
    
  }

  addChildTable(i, aa){
  
    // var a = this.add_shipment.get('product_data') as FormArray;
    // var b = <FormArray> a.controls[i].get('package_details');
    // b.push(this.create_package_data());
    
        var a = this.add_shipment.get('product_data') as FormArray;
        var b = <FormArray> a.controls[i].get('package_details');
        console.log(b.status)
        if(b.status == 'VALID')
        {
          b.push(this.create_package_data());
        }
    
  }

  removeChildTable(i: number,j:number) {
   var a = this.add_shipment.get('product_data') as FormArray;
    var b = <FormArray> a.controls[i].get('package_details');
    if (b.length > 1) {
      b.removeAt(j);
    }
  }

  removeMainTable(i: number) {
     var a = this.add_shipment.get('product_data') as FormArray;
    a.removeAt(i);
  }
  
  remTable()
  {
    var b = parseFloat(this.a);
    var bb = 1;
    var cc = b-bb; 
    for(var aa = 1 ; aa <= b; aa++)
    {
      if(cc != 0)
      {
         this.removeMainTable(cc)
      }
      cc--;
    }

  var data = this.add_shipment.get('no_of_packages');
  this.pack = data;
  }
  

get val()
  {
    return this.add_shipment.get('product_data') as FormArray;
  }

Chek_Identical()
{
 this.identical = !this.identical;
 
  if(this.identical == false)
  {
    this.addMainTable();
  }
  else
  {
    this.remTable();
  }

}

pack:any = 0;
calculateAll(aa)
{

this.calculate_weight(aa);
this.calculate(aa)
}

calculate_weight(aa)
{   
   
    var p = (aa.get('qty').value * aa.get('weight').value);
    aa.get('wt').setValue(p);
    this.add_shipment.get('product_data').valueChanges.subscribe((val) => {
      this.val.controls.forEach(item => {
         let prod_weight = 0;
        for(let j in item.value.package_details)
        {
          var p =  item.value.package_details[j];
          if(p['wt'] != '')
            {
              prod_weight = prod_weight+   parseFloat(p['wt']);
              
            }
        }
        var shipment = this.a;
        if(shipment == ''){
          shipment = '1';
        }
         if(this.identical == true)
         {
           prod_weight = prod_weight * parseFloat(shipment);
           if(prod_weight == NaN)
           {
             prod_weight = 0;
           }

           item.get('total_weight').setValue(prod_weight,{emitEvent:false});
         }
         else{
           if(prod_weight == NaN)
           {
             prod_weight = 0;
           }
           item.get('total_weight').setValue(prod_weight,{emitEvent:false});
         }
        
      })
    })
  }
  

 para:any;
calculate(aa)
  {
this.para = aa;
    var val = this.add_shipment.get('identical') as FormControl;

    this.calculate_weight(aa);
    //for calculation in siingle row
    var aaa = aa.get('qty').value;
    var bbb = aa.get('price').value;
    var ccc = aa.get('discount').value;
    var total = 0;
    total = (aaa * bbb - ccc);
    if(total >= 0)
    {
      aa.get('total').setValue(total);
    }
    else{
       aa.get('total').setValue();
    }


    // for calculation in hole set of rows with final total
    this.add_shipment.get('product_data').valueChanges.subscribe((val) => {
      let f_prod=0;
      let f_weight = 0
      this.val.controls.forEach(item => {
         let product_total = 0;
         let product_weight = 0;
        for(let j in item.value.package_details)
        {
          var p =  item.value.package_details[j];
          if(p['total'] != '') 
            { product_total += parseFloat(p['total']); }
        }
        
        f_prod += product_total;
        item.get('row_total').setValue(product_total,{emitEvent:false});
        //item.get('weight').setValue(product_weight,{emitEvent:false});
      })
         
         var shipment = this.a;
          if(shipment == '')
          {
            shipment = '1';
          }
         if(this.identical == true)
         {
           f_prod = f_prod *  parseFloat(shipment);
           this.add_shipment.get('total_price_set').setValue(f_prod);
         }
         else{
           //alert("success")
           this.add_shipment.get('total_price_set').setValue(f_prod);
         }
    })
   
  }

calculaetAll()
{
  this.calculate(this.para);
  this.calculate_weight(this.para);
}



  getAddOrderData()
  {
    let json:any ={
    }
    this.client.Add_Order(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       
        this.Pickup_Company_Name=obj.result.pickup_address.pickup_company_name;
        this.Pickup_Name=obj.result.pickup_address.pickup_name;
        this.Gst_Number=obj.result.pickup_address.gst_number;
        this.Pickup_Id=obj.result.pickup_address.pickup_id;
        this.Delivery_Address_Name=obj.result.delivery_addresses.delivery_address_name;
        this.Name=obj.result.delivery_addresses.name;
        this.Email=obj.result.delivery_addresses.email;
        this.Mobile_Number=obj.result.delivery_addresses.mobile_number;
        this.Delivery_Pincode=obj.result.delivery_addresses.delivery_pincode;
        this.Company_Name=obj.result.delivery_addresses.company_name;
        this.Landmark=obj.result.delivery_addresses.landmark;
        this.Address1=obj.result.delivery_addresses.address1;
        this.Address2=obj.result.delivery_addresses.address2;
        this.Country=obj.result.delivery_addresses.country;
        this.State=obj.result.delivery_addresses.state; 
        this.City=obj.result.delivery_addresses.city;

      }
    });
  }


weight_Array()
{
  var weight_arr= [];
  var a = this.add_shipment.get('product_data') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('total_weight').value);
     }
return weight_arr;  
}

height_Array()
{
  var weight_arr= [];
  var a = this.add_shipment.get('product_data') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('package_height').value);
     }
return weight_arr;  
}

width_Array()
{
  var weight_arr= [];
  var a = this.add_shipment.get('product_data') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('package_width').value);
     }
return weight_arr;  
}

length_Array()
{
  var weight_arr= [];
  var a = this.add_shipment.get('product_data') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('package_length').value);
     }
return weight_arr;  
}

inv_Array()
{
  var weight_arr= [];
  var a = this.add_shipment.get('product_data') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('row_total').value);
     }
return weight_arr;  
}



total_applicable_charges:any;
  fetch_rate(data, serve, part)
  {
    this.Loader = this.loader.show();
     var paymode  = this.add_shipment.get('COD').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
     var identical = this.add_shipment.get('identical').value; if(identical == true){ identical =1; }else{ identical =0;}
     var insurance = this.add_shipment.get('Insurance').value; if(insurance == true){ insurance =1; }else{ insurance =0;}

      var json = 
      {
        p_pincode: this.add_shipment.get('from_pincode').value,
        d_pincode: this.add_shipment.get('to_pincode').value,
        payment_mode:paymode,
        no_of_packages:this.add_shipment.get('no_of_packages').value,
        identical: identical,
        insurrance: insurance,
        service_type: data,
        service_id: serve,
        partner_id: part,    
        weight: this.weight_Array(),
        inv_value:this.inv_Array(),
        length: this.length_Array(),
        width: this.width_Array(),
        height: this.height_Array(),
      }
      this.client.fetch_rate_order(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.toggleCheck = true;
         this.Loader = this.loader.hide();
         this.aval_serv_table = obj.result.result;
         this.total_applicable_charges = obj.result.total_applicable_charges;
         this.tbaleTDData = obj.result.pkrate_data;

          var weight;
          var total;
          var a = this.add_shipment.get('product_data') as FormArray;
          if(a.length > 1)
          {
          for(var i:number =0; i <= a.length; i++)
          {
              weight = this.tbaleTDData[i].billable_weight;
              total = this.tbaleTDData[i].total;
              
              a.controls[i].get('billabe_weight').setValue(weight);
              a.controls[i].get('total').setValue(total);
              
          }
        }
       this.auto_set_billable_weight();
       this.Loader = this.loader.hide();
      }
      else
      {
        this.service_flag = true;
        this.message_label = obj.message;
        this.tostr.error(obj.message);
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
       

  }

//Hide and show service dropdown  
check_radio:boolean;
isShown: boolean = false ; 
SerIsShow: boolean = false;
courShow:boolean = false;
bsetPrice:boolean = false;
cheap:boolean = false;

rad_part:any;
//rad_serv:any;
serv_Id:any;

toggleCheck:boolean = true;

 rad_serv = [
  { avn_service_id: "29", service_name: "Reverse"}];

toggleShow() { 
  this.aval_serv_table = '';
  this.service_flag = false;
  //this.rad_serv = null;
  this.service_flag = false;
  this.rad_part = null;
  this.radio_cour_list = null;
  this.radio_Ser_list = null;
  this.isShown = ! this.isShown;
  this.SerIsShow = false;
  this.courShow  = false;
  this.bsetPrice = false;
  this.cheap = false;
  var paymode  = this.add_shipment.get('COD').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
    var json = 
    {
      service_type:"Courier_services",
      payment_mode:paymode,
    }
    this.client.get_orderRadio(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        //this.rad_part = obj.result.partners;
        //this.rad_serv = obj.result.services;
      }
      else{
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}



fetch_part()
{
  this.add_shipment.get('part_id').setValue('');
     var a = this.add_shipment.get('product_data') as FormArray;
      // console.log(a);
     for(let i:number = 0; i < a.length; i++)
     {
        a.controls[i].get('billabe_weight').setValue('');
        a.controls[i].get('total').setValue('');
        a.controls[i].get('row_total').setValue('');
     }
    this.aval_serv_table = null;
  this.service_flag = false;
  this.service_flag = false;
  this.radio_cour_list = null;
  this.radio_Ser_list = null;

   var paymode  = this.add_shipment.get('COD').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
   var id = this.serv_Id;
  
   //alert(id);
    var json = 
    {
      service_id:this.add_shipment.get('Serv_id').value,
      payment_mode:paymode,
    }
    this.client.get_ser_partRadio(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.rad_part = obj.result;
      }
      else{
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

radio_Ser_list:any;
  service_radio()
  {
    this.aval_serv_table = '',
    this.service_flag = false;
   this.service_flag = false;
  this.rad_serv = null;
  this.rad_part = null;
  this.radio_cour_list = null;
    this.isShown = false;
    this.courShow  = false;
    this.bsetPrice = false;
    this.cheap = false;
    this.SerIsShow =! this.SerIsShow;
     
    var paymode  = this.add_shipment.get('COD').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
    var json = 
    {
      service_type:"Services",
      payment_mode:paymode,
    }
    this.client.get_orderRadio(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.radio_Ser_list = obj.result;
      }
      else{
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }



  radio_cour_list:any;
  radio_courier()
  {
    this.aval_serv_table = ''
    this.service_flag = false;
     this.service_flag = false;
    this.rad_serv = null;
    this.rad_part = null;
    this.radio_Ser_list = null;
    this.isShown = false;
    this.SerIsShow = false;
     this.bsetPrice = false;
    this.cheap = false;
    this.courShow =! this.courShow;
  
     var paymode  = this.add_shipment.get('COD').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
    var json = 
    {
      service_type:"Courier",
      payment_mode:paymode,
    }
    this.client.get_orderRadio(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.radio_cour_list = obj.result;
      }
      else{
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

Change_partner_service()
{
  var a = this.add_shipment.get('product_data') as FormArray;
      // console.log(a);
     for(let i:number = 0; i < a.length; i++)
     {
        a.controls[i].get('billabe_weight').setValue('');
        a.controls[i].get('total').setValue('');
        a.controls[i].get('row_total').setValue('');
     }
 this.service_flag = false;
  this.aval_serv_table = null; 
  var ServiceID = this.add_shipment.get('Serv_id').value;
  var PartnerID = this.add_shipment.get('part_id').value; 
  this.fetch_rate("Courier_services" ,ServiceID ,PartnerID );
}

Change_courier()
{
  this.service_flag = false;
  this.aval_serv_table = ''; 
  var ServiceID = "";
  var PartnerID = this.add_shipment.get('cour_part_id').value; 
  this.fetch_rate("Courier" ,ServiceID ,PartnerID );
}

Change_service()
{
  this.service_flag = false;
  this.aval_serv_table = ''; 
  var ServiceID = this.add_shipment.get('serv_serv_id').value; 
  var PartnerID = ""; 
  this.fetch_rate("Services" ,ServiceID ,PartnerID );
}

change_best()
{ 
  this.service_flag = false;
  this.service_flag = false;
  this.rad_part = null;
    this.isShown = false;
  this.radio_cour_list = null;
  this.radio_Ser_list = null;
  this.SerIsShow = false;
  this.courShow  = false;
  this.cheap = false;
  this.aval_serv_table = null; 
  var ServiceID = ""; 
  var PartnerID = ""; 
  this.fetch_rate("Best_Service" ,ServiceID ,PartnerID );
}

change_cheap()
{
  this.service_flag = false;
   this.service_flag = false;
  this.rad_part = null;
  this.radio_cour_list = null;
  this.radio_Ser_list = null;
  this.SerIsShow = false;
    this.isShown = false;
  this.courShow  = false;
  this.bsetPrice = false;
  this.aval_serv_table = null; 
  var ServiceID = ""; 
  var PartnerID = ""; 
  this.fetch_rate("Cheapest" ,ServiceID ,PartnerID );
}
 
openDetailsModal(modal)
{
    this.packageData = this.modalService.show(modal,
    {
      class:'modal-lg',
    })
}

closeDetailsModal()
{
   this.packageData.hide();
}


modal_courier_name:any;
modal_billable_weight:any;
modal_zone:any;
modal_price:any;
modal_delivery_charge:any;
modal_fuel_charge:any;
modal_cod_parcentage:any;
modal_other_charge:any;
modal_total_insurance:any;
modal_tax:any;
modal_total:any;


openDetailsModal1(modal, 
   courier_name, billable_weight, 
  zone, price, delivery_charge, fuel_charge, 
  cod_parcentage, other_charge, total_insurance, tax, total)
{
 
  this.modal_courier_name = courier_name;
  this.modal_billable_weight = billable_weight;
  this.modal_zone = zone;
  this.modal_price = price;
  this.modal_delivery_charge = delivery_charge;
  this.modal_fuel_charge = fuel_charge;
  this.modal_cod_parcentage = cod_parcentage;
  this.modal_other_charge = other_charge;
  this.modal_total_insurance = total_insurance;
  this.modal_tax = tax;
  this.modal_total = total;
    this.packageData1 = this.modalService.show(modal,
    {
      class:'modal-sm',
    })
}

closeDetailsModal1()
{

this.modal_courier_name = " ";
this.modal_billable_weight = " ";
this.modal_zone = " ";
this.modal_price = " ";
this.modal_delivery_charge = " ";
this.modal_fuel_charge = " ";
this.modal_cod_parcentage = " ";
this.modal_other_charge = " ";
this.modal_total_insurance = " ";
this.modal_tax = " ";
this.modal_total = " ";
   this.packageData1.hide();
}

set_billable_weight(weight, total, partID, serName, courName)
{

   var cour_name;
   var a = this.add_shipment.get('product_data') as FormArray;
   for(var i:number = 0; i < a.length; i++)
   {
      a.controls[i].get('billabe_weight').setValue(weight);
      a.controls[i].get('total').setValue(total);
   }

   this.fetch_partner_ID = partID;
   this.fetch_service = serName;
   cour_name = courName;
   this.choose_ser_part = cour_name+"@"+this.fetch_service;
  

}

set_cred()
{

}

fetch_service:any;
choose_ser_part:string;
auto_set_billable_weight()
  {
     var weight;
     var total;
     var cour_name;
     var a = this.add_shipment.get('product_data') as FormArray;
     
           weight = this.tbaleTDData[0].billable_weight;
           total = this.tbaleTDData[0].total;
           this.fetch_partner_ID = this.tbaleTDData[0].partner_id;
           this.fetch_service = this.tbaleTDData[0].service_name;
           cour_name = this.tbaleTDData[0].courier_name; 
           this.choose_ser_part = cour_name+"@"+this.fetch_service;
           //console.log(weight+"  "+total);
           a.controls[0].get('billabe_weight').setValue(weight);
           a.controls[0].get('total').setValue(total);
           
       
  }


Get_product_data()
{
  var count = 0;
  var a:any = this.add_shipment.get('product_data').value;
  var formArray = [];
  var b;
  a.forEach(s => {
    formArray.push({
      package_weight: s.total_weight,
      package_length:  s.package_length,
      package_width:  s.package_width,
      package_height: s.package_height,
      total:  s.total,
      package_details:this.Get_package_details(count,s.package_details,s.total_weight)  
    });
    count++;
  })
   return formArray;
}

Get_package_details(count:number, b:any, wt:any)
{
  var formArray = [];
  b.forEach(s => {
    formArray.push({
       name: s.name,
       price: s.price,
       total: s.total,
       qty: s.qty,
       sku: s.sku,
       hsn: s.hsn,
       discount: s.discount,
       tax:s.tax,
      
    });
  });
    count++;
   return formArray;
}


Submit()
{
	this.add_shipment.markAsTouched();
	//this.add_shipment.markAsInvalid();
  this.Loader = this.loader.show();
  var a = this.add_shipment.value;
   var del_name = a.customer_name;
  var paymode = a.COD;
 if(paymode == true){ paymode = "cod" } else { paymode = "online"}
  var identical;
  if(this.identical == true){ identical = "identical" } else { identical = ""}
  var insurance;
 if(this.insurance == true){ insurance = "yes" } else { insurance = "no"}
  var json = 
  {
  insurance: insurance,
  order_id: a.order_id,
  ship_date: a.ship_date,
  package_type: identical,
  package_content: "product",
  package_content_desc: "",
  total_invoice_value: a.total_price_set,
  created_by: localStorage.getItem('roleid'),
  payment_mode: paymode,
  package_name: "",
  partner_id: this.fetch_partner_ID,
  service_type: "Courier_services",
  choose_service_parter: this.choose_ser_part,
  no_of_packages: a.no_of_packages,
  total_price_set: "",
  channel: "API",
  pickup_address: {
    from_contact_number: a.from_contact_number,
    from_company_name: a.from_company_name,
    from_address: a.from_address,
    from_address2: a.from_address2,
    from_landmark: a.from_landmark,
    from_pincode: a.from_pincode,
    from_gst_no: a.from_gst,
  },
  delivery_address: {
    to_customer_name: del_name,
    to_customer_gstin: "",
    to_company_name: this.cust_comp,
    to_customer_email: a.customer_email,
    to_customer_contact_no:a.customer_contact_no,
    to_landmark: a.to_landmark,
    to_address: a.to_address,
    to_address2: a.to_address2,
    to_pincode: a.to_pincode,
  },
   product_data:this.Get_product_data(),
 }
 //console.log(json);
  this.client.add_order(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.tostr.success(obj.message);
         this.Loader = this.loader.hide();
          this.router.navigate(['/allorder/'+obj.message]);
      }
      else
      {
        this.alertService.error(obj.message);
       	window.scrollTo(0, 0);
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  console.log(this.add_shipment);
}  

addpickupModal:BsModalRef;
pickupname:any;
pickupcompanyname:any;
contactperson:any;
contactnumber:any;
pickupemail:any;
pickuppincode:any;
pickuplandmark:any;
pickupaddress1:any;
pickupaddress2:any;
gst_number:any;
Addstate:any;
Addcountry:any;
Addcity:any; 
addPickupAddress(modal)
{
  this.addpickupModal = this.modalService.show(modal,
  {
    class:"modal-xl",
  });
}

closeAddPickup()
{
  this.addpickupModal.hide();
}

pick_city:any;
pick_state:any;
pick_country:any;
get_add_by_pin_modal()
{
  var json =
  {
    pincode:this.pickuppincode,
  }
  this.client.getAddressBypin(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.pick_city = obj.result.city;
         this.pick_state = obj.result.state;
         this.pick_country = obj.result.country;
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


AddPickup(add)
{
  this.Loader = this.loader.show();
  var json =
  {
    pickup_name:this.pickupname, 
    contact_person:this.contactperson,
    pickup_company_name:this.pickupcompanyname,
    contact_number:this.contactnumber,
    pickup_email:this.pickupemail,
    pickup_pincode:this.pickuppincode,
    pickup_landmark:this.pickuplandmark,
    pickup_address1:this.pickupaddress1,
    pickup_address2:this.pickupaddress2,
    pickup_country:this.pick_country,
    pickup_state:this.pick_state, 
    pickup_city:this.pick_city,
    gst_number:this.gst_number
 }
 this.client.add_pickup_Address(json).subscribe((data:any) =>{
   var response = data._body;
   var obj = JSON.parse(response);
   if(obj.status == 200)
   {
     this.tostr.success(obj.message);
     this.Loader = this.loader.hide();
     this.get_order_Data();
     this.closeAddPickup();
      //this.countryList = "";
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


viewPickupDetails:BsModalRef;
       Modal_city :any;
       Modal_contact_number :any;
       Modal_contact_person :any;
       Modal_pickup_address1 :any;
       Modal_pickup_address2 :any;
       Modal_pickup_landmark :any;
       Modal_pickup_pincode :any;
       Modal_state_name:any;
  viewPickupDetailsmodal(modal)
{
  var json = 
  {
    id:this.add_shipment.get('f_com_name').value,
    type :"pickup"
  }
   this.client.viewDetailsAddressBook(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Modal_city = obj.result.city;
        this.Modal_contact_number = obj.result.contact_number;
        this.Modal_contact_person = obj.result.contact_person;
        this.Modal_pickup_address1 = obj.result.pickup_address1;
        this.Modal_pickup_address2 = obj.result.pickup_address2;
        this.Modal_pickup_landmark = obj.result.pickup_landmark;
        this.Modal_pickup_pincode = obj.result.pickup_pincode;
        this.Modal_state_name = obj.result.state_name;
      }
      else
      {
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }
    });

  this.viewPickupDetails = this.modalService.show(modal,
  {
    class:"",
  });
}

closePickupView()
{
  this.viewPickupDetails.hide();
}

countryList:any;
statelist:any;
citylist:any;
Get_Country()
{
   this.client.get_country(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.countryList = obj.result;
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

Get_State()
{
   var json = 
  {
    country_id:this.pick_country,
  }
  this.client.get_state(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.statelist = obj.result;
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

Get_City()
{
  var json = 
  {
    state_id:this.pick_state
  }
  this.client.get_city(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.citylist = obj.result;
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


Save_Product(id){
 
  var a = this.add_shipment.get('product_data') as FormArray;
  var b:any = <FormArray> a.controls[id].get('package_details').value;
  console.log("save",b);
  var temp_name:any = b[0].name;
  var temp_description:any =b[0].name;
  var temp_sku:any =b[0].sku;
  var temp_price:any =b[0].price;
  var temp_hsn:any =b[0].hsn;
  var temp_quantity:any =b[0].qty;
  var temp_tax:any =b[0].tax;
  var temp_weight:any =b[0].weight;

  if(temp_hsn==""){

    temp_hsn=0;

  }

    let json:any ={

    temp_name:temp_name,
    temp_description: temp_description,
    temp_sku: temp_sku,
    temp_price: temp_price,
    temp_hsn: temp_hsn,
    temp_quantity: temp_quantity,
    temp_tax: temp_tax,
    temp_weight: temp_weight
   
    };

    console.log(json);
    

    this.client.save_product(json).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {  
        // this.client.exportAsExcelFile(obj.result, 'file Name'); 
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


calucate_row_intv()
{

  
 // alert("hi");
  this.add_shipment.get('product_data').valueChanges.subscribe((val) => {
      let f_prod=0;
      let f_weight = 0
      this.val.controls.forEach(item => {
        let product_total = 0;
        let product_weight = 0;
        for(let j in item.value.package_details)
        {
          var p =  item.value.package_details[j];
          if(p['total'] != '') 
            { product_total += parseFloat(p['total']); }
        }

        f_prod += product_total;
        item.get('row_total').setValue(product_total,{emitEvent:false});
        //item.get('weight').setValue(product_weight,{emitEvent:false});
      })

      var shipment = this.a;
      if(shipment == '')
      {
        shipment = '1';
      }
      if(this.identical == true)
      {
        f_prod = f_prod *  parseFloat(shipment);
        this.add_shipment.get('total_price_set').setValue(f_prod);
      }
      else{
        //alert("success")
        this.add_shipment.get('total_price_set').setValue(f_prod);
      }
    })
    //console.log(this.add_shipment.value)
}



}
