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
import * as _ from 'lodash';

@Component({
  selector: 'app-b2border',
  templateUrl: './b2border.component.html',
  styleUrls: ['./b2border.component.css']
})
export class B2borderComponent implements OnInit {

 Loader:any;
 bsValue = new Date();
   bsRangeValue: Date[];
   maxDate = new Date();
   minDate = new Date();	

shipment_date:any;
service_flag:any;
add_b2b_shipment:FormGroup;
delivery_address:FormGroup;
pickup_address:FormGroup;
product_details:FormArray;
PickupAddlist:any;
PickAddId:any;
Delivery_Pincode:any;
City:any;
State:any;
Country :any;
tableModal:BsModalRef;
Mobile_Number:any;

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
  	) { 
this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
  	 this.Get_Country();
  	this.order_form();
  	this.get_order_Data()
  }

  go_to_order(){this.router.navigate(['/addorder/']);}
go_to_b2b(){this.router.navigate(['/b2border/']);}
go_to_add_bulk(){this.router.navigate(['/bulkorder/']);}
go_to_All_order(){this.router.navigate(['/allorder/']);}
go_to_channel(){this.router.navigate(['/channel/']);}

  go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

mainTable:any[] = [
    {
      id : '',
      childArr: [
        {
        

        }
      ]
    }
  ];

order_form()
{

  this.add_b2b_shipment = this.fb.group({

  	//del address
    phone_no: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    gst_no: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")]),
    order_id: new FormControl('', Validators.required),
    d_f_name: new FormControl('', Validators.required),
    l_name: new FormControl(''),
    email: new FormControl(''),
    d_landmark: new FormControl(''),
    address1: new FormControl('', Validators.required),
    address2: new FormControl(''),
    d_pincode: new FormControl ('', Validators.required),
    City: new FormControl(''),
    State: new FormControl(''),
    Country: new FormControl(''),

    //Pick Address
    pick_address: new FormControl('', Validators.required),
    gst: new FormControl(''),
    from_contact_number: new FormControl(''),
	  from_company_name: new FormControl(''),
    from_address: new FormControl(''),
	  from_address2: new FormControl(''),
	  from_landmark: new FormControl(''),
	  from_pincode: new FormControl(''),
    
    //package details
    ship_date: new FormControl ('', Validators.required),
    no_of_packages: new FormControl(''),
    insurance: new FormControl(''),
    cod: new FormControl(''),
    
    grand_total: new FormControl(''),
    service_name: new FormControl(''),
    Courier_name: new FormControl(''),
    Serv_id:new FormControl(''),
    part_id:new FormControl(''),
    product_details:this.fb.array([this.get_product_data()]),
  })
}

get_product_data() : FormGroup
{
    return this.fb.group
    ({
		prod_name:new FormControl('', Validators.required),
		box: new FormControl('', Validators.required),
		weightBox: new FormControl('', Validators.required),
		inv_val_per_box: new FormControl('', Validators.required),
		total: new FormControl(''),	
		l:new FormControl('', Validators.required),
		h:new FormControl('', Validators.required),
        w:new FormControl('', Validators.required),
	    total_weiht: new FormControl(''),
	    billable_weight: new FormControl('', Validators.required),
    })
}


  //Add new address form
add_new_address= new FormGroup({
  Pickup_Name: new FormControl('', Validators.required,),
  Pickup_Company_Name: new FormControl('', Validators.required,),
  Contact_Person_Name: new FormControl('', Validators.required,),
  Pickup_Contact_Number: new FormControl('', [Validators.required,Validators.minLength(10)]),
  Pincode: new FormControl('', Validators.required,),
  City: new FormControl,
  State: new FormControl,
  Country: new FormControl,
  Landmark: new FormControl('', Validators.required,),
  Address1: new FormControl('', Validators.required,),
  Address2: new FormControl,
  GST_Number: new FormControl
})

//get Pickup Address
get_order_Data()
{
  this.client.get_order_data(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.PickupAddlist = obj.result.pickup_address;
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

get_del_address_by_mobile()
{
  //alert("ok");
  //var mobile = this.add_shipment.get('customer_contact_no');
  var json = {
    phone_no:this.Mobile_Number,
    //phone_no:"7972282079",
  }
  this.client.del_add_details_mobile(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        //this.cust_comp = obj.result.company_name;
        //this.cust_name = obj.result.name;
        //console.log(this.cust_name);
         // var name = obj.result.name;
         // name = name.replace(' ',',');
         // name = name.split(',');
        //console.log(name);
        // this.add_shipment.get('customer_contact_no').setValue(obj.result.mobile_number);
         this.add_b2b_shipment.get('l_name').setValue(obj.result.lastname);
         this.add_b2b_shipment.get('d_f_name').setValue(obj.result.firstname);
         this.add_b2b_shipment.get('email').setValue(obj.result.custemail);
         this.add_b2b_shipment.get('d_landmark').setValue(obj.result.landmark);
         this.add_b2b_shipment.get('address1').setValue(obj.result.address1);
         this.add_b2b_shipment.get('address2').setValue(obj.result.address2);
         this.add_b2b_shipment.get('d_pincode').setValue(obj.result.postcode);
         this.add_b2b_shipment.get('City').setValue(obj.result.city);
         this.add_b2b_shipment.get('State').setValue(obj.result.state);
         var country = obj.result.country;
         //alert(country)
         if(country == 1)
         {
           this.add_b2b_shipment.get('Country').setValue("India");
         }
         else
         {
           this.add_b2b_shipment.get('Country').setValue(country);
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

//get pick addressDetails
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
        this.add_b2b_shipment.get('gst').setValue(obj.result.gst_number);
        this.add_b2b_shipment.get('from_company_name').setValue(obj.result.pickup_company_name);
        this.add_b2b_shipment.get('from_contact_number').setValue(obj.result.contact_number);
        this.add_b2b_shipment.get('from_pincode').setValue(obj.result.pickup_pincode);
        this.add_b2b_shipment.get('from_landmark').setValue(obj.result.pickup_landmark);
        this.add_b2b_shipment.get('from_address').setValue(obj.result.pickup_address1);
        this.add_b2b_shipment.get('from_address2').setValue(obj.result.pickup_address2);
        //this.add_b2b_shipment.get('pickup_id').setValue(obj.result.pickup_id);
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
    pincode:this.add_b2b_shipment.get('d_pincode').value,
  }
  this.client.getAddressBypin(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) 
      {
         this.add_b2b_shipment.get('City').setValue(obj.result.city);
         this.add_b2b_shipment.get('State').setValue(obj.result.state);
         this.add_b2b_shipment.get('Country').setValue(obj.result.country);
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



  addMainTable()
  {
    var a = this.add_b2b_shipment.get('product_details') as FormArray;
     a.push(this.get_product_data());
  }

  removeMainTable(i: number)
  {
    var a = this.add_b2b_shipment.get('product_details') as FormArray;
    a.removeAt(i);
  }

  isShown: boolean = false ; // hidden by default
  rad_serv:any = [
  { avn_service_id: "28", service_name: "Economy B2B"}];
  tempdata:any;


check:boolean = false;
  toggleShow() {
  	this.check = true;
  	var serviceData = [];
  	var listdata;
    this.isShown = ! this.isShown;
    var paymode  = this.add_b2b_shipment.get('cod').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
    var json = 
    {
      service_type:"Courier_services",
      payment_mode:paymode,
    }
   
    this.client.get_orderRadio(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       
      }
    });

  }

serv_Id:any;
rad_part:any;
  fetch_part()
  {
    //this.add_shipment.get('part_id').setValue('');
  	this.service_flag = false;
   var paymode  = this.add_b2b_shipment.get('cod').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
   var id = this.serv_Id;
  
   //alert(id);
    var json = 
    {
      service_id:this.add_b2b_shipment.get('Serv_id').value,
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

aval_serv_table:any;
total_applicable_charges:any;
tbaleTDData:any;
message_label:any;
Change_partner_service()
{
	this.rad_part = ' ';
  this.aval_serv_table = null; 
  var ServiceID = this.add_b2b_shipment.get('Serv_id').value;
  var PartnerID = this.add_b2b_shipment.get('part_id').value;
  //console.log(ServiceID+"  "+PartnerID) 
  this.fetch_rate("Courier_services" ,ServiceID ,PartnerID );
} 


weight_Array()
{
  var weight_arr= [];
  var a = this.add_b2b_shipment.get('product_details') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('weightBox').value);
     }
return weight_arr;  
}

height_Array()
{
  var weight_arr= [];
  var a = this.add_b2b_shipment.get('product_details') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('h').value);
     }
return weight_arr;  
}

width_Array()
{
  var weight_arr= [];
  var a = this.add_b2b_shipment.get('product_details') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('w').value);
     }
return weight_arr;  
}

length_Array()
{
  var weight_arr= [];
  var a = this.add_b2b_shipment.get('product_details') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('l').value);
     }
return weight_arr;  
}

inv_Array()
{
  var weight_arr= [];
  var a = this.add_b2b_shipment.get('product_details') as FormArray;
  for(let i:number = 0; i < a.length; i++)
     {
       weight_arr.push(a.controls[i].get('total').value);
     }
return weight_arr;  
}


open_Modal(modal)
{
	this.tableModal = this.modalService.show(modal,
	{
		class:"modal-lg"
	})
}

close_Modal()
{
	this.tableModal.hide();
}


fetch_rate(name, serid, partid)
{
	this.Loader = this.loader.show();
	this.service_flag= true;
	var paymode  = this.add_b2b_shipment.get('cod').value; if(paymode == true){ paymode = "cod"; }else{ paymode ="online";}
    var insurance = this.add_b2b_shipment.get('insurance').value; if(insurance == true){ insurance =1; }else{ insurance =0;}
    var a = this.add_b2b_shipment.get('product_details') as FormArray;
      var json = 
      {
        p_pincode: this.add_b2b_shipment.get('d_pincode').value,
        d_pincode: this.add_b2b_shipment.get('from_pincode').value,
        payment_mode:paymode,
        no_of_packages:a.length,
        insurrance: insurance,
        service_type: name,
        service_id: serid,
        partner_id: partid,    
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
      	this.Loader = this.loader.hide();
         this.aval_serv_table = obj.result.result;
         this.total_applicable_charges = obj.result.total_applicable_charges;
         this.tbaleTDData = obj.result.pkrate_data;

          var weight;
          var total;
          var a = this.add_b2b_shipment.get('product_details') as FormArray;
          if(a.length > 1)
          {
	          for(var i:number =0; i < a.length; i++)
	          {
	              weight = this.tbaleTDData[i].billable_weight;
	              a.controls[i].get('billable_weight').setValue(weight);
	          }
	          var weight;
			  var total;
			  var cour_name;
			  var a = this.add_b2b_shipment.get('product_details') as FormArray;
			    
			           weight = this.tbaleTDData[0].billable_weight;
			           this.fetch_partner_ID = this.aval_serv_table[0].partner_id;
			           this.fetch_service = this.aval_serv_table[0].service_name;
			           cour_name = this.aval_serv_table[0].courier_name; 
			           this.choose_ser_part = cour_name+"@"+this.fetch_service;
			           a.controls[0].get('billable_weight').setValue(weight);
			           console.log("papil"+ this.fetch_service+ " "+this.choose_ser_part );

        }
        else
        {
        	  var weight;
			  var total;
			  var cour_name;
			  var a = this.add_b2b_shipment.get('product_details') as FormArray;
			     
			           weight = this.tbaleTDData[0].billable_weight;
			           this.fetch_partner_ID = this.tbaleTDData[0].partner_id;
			           this.fetch_service = this.tbaleTDData[0].service_name;
			           cour_name = this.tbaleTDData[0].courier_name; 
			           this.choose_ser_part = cour_name+"@"+this.fetch_service;
			           a.controls[0].get('billable_weight').setValue(weight);
			          
			        }
			        this.Loader = this.loader.hide();

        this.service_flag =false;
      }
      else
      {
       this.Loader = this.loader.hide();
       this.service_flag = true;
        this.message_label = obj.message;
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
} 

fetch_partner_ID:any;
fetch_service:any;
choose_ser_part:any;
set_billable_weight(weight, total, partID, serName, courName)
{
   var cour_name;
   var a = this.add_b2b_shipment.get('product_data') as FormArray;
   for(var i:number = 0; i <= a.length; i++)
   {
      a.controls[i].get('billable_weight').setValue(weight);
     // a.controls[i].get('total').setValue(total);
   }

   this.fetch_partner_ID = partID;
   this.fetch_service = serName;
   cour_name = courName;
   this.choose_ser_part = cour_name+"@"+this.fetch_service;
   console.log(this.choose_ser_part + " "+this.fetch_partner_ID )
}


get val()
{
	return this.add_b2b_shipment.get('product_details') as FormArray
}

calculate_All(item)
	{
		item.get('billable_weight').setValue(1);
		this.add_b2b_shipment.get('grand_total').setValue(1)
		var total_weight = (item.get('box').value * item.get('weightBox').value);
		item.get('total_weiht').setValue(total_weight);

		var total_price = (item.get('box').value * item.get('inv_val_per_box').value);
		item.get('total').setValue(total_price);

		var g_total = 0;
		var totalArray =[];
		var a = this.add_b2b_shipment.get('product_details') as FormArray; 
		for(var i:number = 0; i < a.length; i++)
		{
			totalArray.push(a.controls[i].get('total').value);
		}
		for(var j in totalArray) { 
        		g_total += totalArray[j];
    		}
		this.add_b2b_shipment.get('grand_total').setValue(g_total);
		//console.log(totalArray);
	}


Get_product_data()
{
  var count = 0;
  var a:any = this.add_b2b_shipment.get('product_details').value;
  var formArray = [];
  var b;
  a.forEach(s => {
    	formArray.push({
     	prod_name: s.prod_name,
		prod_price: s.inv_val_per_box,
		qty: s.box,
		package_weight: s.weightBox,
		package_length: s.l,
		package_height: s.h,
		package_width: s.w
    });
    count++;
  })
   return formArray;
}

	//Submit new address from 
onSubmit() {
	this.Loader = this.loader.show();
	var a = this.add_b2b_shipment.value;
	var pack = this.add_b2b_shipment.get('product_details') as FormArray;
  var paymode = a.COD;
 if(paymode == true){ paymode = "cod" } else { paymode = "online"}
  var insurance;
 if(a.insurance == true){ insurance = "yes" } else { insurance = "no"}
 var json = 
 {

	order_id: a.order_id,
	ship_date: a.ship_date,
	insurance: insurance,
	no_of_packages: pack.length,
	package_type: "",
	total_invoice_value: a.grand_total,
	payment_mode: paymode,
	 total_line_items_price_set: "",
	total_discounts_set: "",
	total_shipping_price_set: "",
	service_type: "courier_services",
	choose_service_parter: this.choose_ser_part,
	delivery_address: {
		to_f_name: a.d_f_name,
		to_l_name: a.l_name,
		to_customer_gstin: a.gst_no,
		to_company_name: a.d_f_name+" "+a.l_name,
		to_customer_email: a.email,
		to_customer_contact_no: a.phone_no,
		to_pincode: a.d_pincode,
		to_landmark: a.d_landmark,
		to_address: a.address1,
		to_address2: a.address2
	},
	pickup_address: {
		pickup_id: this.PickAddId,
		form_gstin_no: a.gst,
		from_contact_number: a.from_contact_number,
		from_company_name: a.from_company_name,
		from_address: a.from_address,
		from_address2: a.from_address2,
		from_landmark: a.from_landmark,
		from_pincode: a.from_pincode
	},
	product_details:this.Get_product_data(),
  }
 
  console.log(json);
 // alert(json);
  this.client.add_b2b_order(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.alertService.success(obj.message);
       this.Loader = this.loader.hide();
       this.router.navigate(['/allorder/'+obj.message]);
       
      }
      else
      {
      	this.Loader = this.loader.hide();
      	this.alertService.error(obj.message);
      	if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
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
    id:this.add_b2b_shipment.get('pick_address').value,
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

check_date()
{
	var a = this.add_b2b_shipment.value
	//this.shipment_date = JSON.stringify(a);
	console.log(a.ship_date);
	console.log(this.shipment_date);
}


}