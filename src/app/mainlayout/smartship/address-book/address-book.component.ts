import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {
  total_pick_pages:any=[];
  totalpickuppages:any;
  delijson:any={};
  pickupjson:any ={};
  totalpagesdelivery:any;
  //modalService
  viewPickupDetails:BsModalRef;
  viewDeliveryDetails:BsModalRef;
  addpickupModal:BsModalRef;
  addDelModal:BsModalRef;
  editPickModal:BsModalRef;
  editDeliModal:BsModalRef;
  gst_number1:any;

  p:any;
  Loader:string;
  Table_ModalPickUpAddr:any=[];
  Table_Delivery_Addr:any = [];
  Table_PickUpAddr:any=[];
  PickUpId:any=[];
  Pickup_Company_Name:any;
  Delivery_Address_Name:any;
  Landmark:any;
  Pickup_Address1:any;
  Pickup_Address2:any;
  City:any;
  State_Name:any;
  Country_Name:any;
  Pickup_Pincode:any;
  Contact_persons:any;
  Pickup_Phone:any;

  //city contry state
  countryList:any;
  statelist:any;
  citylist:any;

  del_ID:any ;
  del_Delivery_Address_Name: any;
 del_Contact_Name: any;
 del_Landmark: any;
 del_Address_1: any;
 del_Address_2: any;
 del_City:any;
 del_State:any;
 del_Country:any;
 del_Pincode:any;
 del_Contact_Persons: any;
 del_Phone: any;

city:any;
contact_number: any;
contact_person:any;
pickup_address1: any;
pickup_address2: any;
pickup_landmark: any;
pickup_pincode: any;
state_name: any;

active_tab:any = "pickup";

  constructor(
    private fb:FormBuilder,
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
     this.getData(''); 
     this.Get_Country();

     this.route.queryParams
     
      .subscribe(params => {
        if('act' in params){
          this.active_tab = params.act;
        }
        if('ref' in params){
          let act_tab = this.active_tab;
          this.active_tab = '';
          setTimeout(() => {
            this.active_tab = act_tab;
          })
        }
      }
    );


  }

go_to_template(){this.router.navigate(['/template/']);} 
go_to_add_book(){this.router.navigate(['/addressbook/']);}
go_to_module(){this.router.navigate(['/modules/']);} apidoc
//go_to_api_doc(){this.router.navigate(['/apidoc/']);}
go_to_api_doc(){window.open("https://documenter.getpostman.com/view/12163140/TVK5dMUb");}

  
   //get data list
  getData(address_type){
    if(address_type == 'delivery'){
      //this.Table_Delivery_Addr = [];
       this.delijson ={
        mobile_no:"",
        limit:"20",
        page_no:1,
        order_by:"",
        start_page:"",
        end_date:"",
        address_type:'delivery',
         ajaxongoing:false,
      };
      this.Table_Delivery_Addr=[]
      this.addrbook_delivery_Data()
    }
    else{
      this.Table_PickUpAddr = [];
      this.pickupjson ={
        mobile_no:"",
        limit:"20",
        page_no:1,
        order_by:"",
        start_page:"",
        end_date:"",
        address_type:'',
        ajaxongoing:false,
      };     
      this.addrbook_pickupdata_Data();
    }   
  }
  onScroll() {     
    if(this.totalpickuppages >= this.pickupjson.page_no)
    {
      this.pickupjson.page_no++;
      this.addrbook_pickupdata_Data();
    }
  }
  onScrollDelivery() {     
    if(this.totalpagesdelivery >= this.delijson.page_no && !this.delijson.ajaxongoing)
    {
      this.delijson.page_no++;
      this.addrbook_delivery_Data();
    }
  }
  //Pickup
  addrbook_pickupdata_Data()
  {
    this.Loader = this.loader.show();  
    this.client.smartshipyaari_addressbook(this.pickupjson).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        if (obj.result.pickupaddr[0]!=undefined){
           this.totalpickuppages = obj.result.total_pick_pages;        
          this.Table_PickUpAddr = this.Table_PickUpAddr.concat(obj.result.pickupaddr);  
        }       
      }else{         
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
      
    });
  }
  //Delivery
  addrbook_delivery_Data()
  {
   this.Loader = this.loader.show();   
    this.client.smartshipyaari_addressbook(this.delijson).subscribe((data: any) => {
      this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {     
        if (obj.result.deliveredaddr[0]!=undefined){
          this.totalpagesdelivery = obj.result.total_deli_pages;
          this.Table_Delivery_Addr = this.Table_Delivery_Addr.concat(obj.result.deliveredaddr);
        }        
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
    country_id:this.Addcountry,
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
    state_id:this.Addstate
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


  viewPickupDetailsmodal(modal, id)
{
  var json = 
  {
    id:id,
    type :"pickup"
  }
   this.client.viewDetailsAddressBook(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.city = obj.result.city;
        this.contact_number = obj.result.contact_number;
        this.contact_person = obj.result.contact_person;
        this.pickup_address1 = obj.result.pickup_address1;
        this.pickup_address2 = obj.result.pickup_address2;
        this.pickup_landmark = obj.result.pickup_landmark;
        this.pickup_pincode = obj.result.pickup_pincode;
        this.state_name = obj.result.state_name;
        this.gst_number1 = obj.result.gst_number;
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


viewDeliveryModal(modal, id)
{
   var json = 
  {
    id:id,
    type :"delivery"
  }
   this.client.viewDetailsAddressBook(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.city = obj.result.city;
        this.contact_number = obj.result.mobile_number;
        this.contact_person = obj.result.name;
        this.pickup_address1 = obj.result.address1;
        this.pickup_address2 = obj.result.address2;
        this.pickup_landmark = obj.result.landmark;
        this.pickup_pincode = obj.result.delivery_pincode;
        this.state_name = obj.result.state;
        this.Edit_delivery_email = obj.result.delivery_email;
      }
      else
      {
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }
    });

  this.viewDeliveryDetails = this.modalService.show(modal,
  {
    class:"",
  })
}

closeDeliveryDetails()
{
  this.viewDeliveryDetails.hide();
}


DeactivePickup(id)
{
  this.Loader = this.loader.show();
    var json = 
    {
        id:id,
        type :"pickup",
        status :"deactivate",
    }
    this.client.ActiveDeactiveAddBook(json).subscribe((data: any) => {
      var response = data._body;
       this.Loader = this.loader.hide();
      var obj = JSON.parse(response);
      if (obj.status == 200) {       
        this.tostr.success("Address Activated Successfully");
        this.addrbook_pickupdata_Data();
        this.getData('');
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


ActivePickup(id)
{
  this.Loader = this.loader.show();
    var json = 
    {
        id:id,
        type :"pickup",
        status :"activate",
    }
    this.client.ActiveDeactiveAddBook(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      this.Loader = this.loader.hide();
      if (obj.status == 200) {        
        this.tostr.success("Address Deactivated Successfully");
        this.addrbook_pickupdata_Data();
         this.getData('');
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
  this.statelist= "";
  this.citylist= "";
}

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

AddPickup(add)
{
  if(add.valid)
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
    pickup_country:this.Addcountry,
    pickup_state:this.Addstate, 
    pickup_city:this.Addcity,
    gst_number:this.gst_number
 }
 this.client.add_pickup_Address(json).subscribe((data:any) =>{
   var response = data._body;
    this.Loader = this.loader.hide();
   var obj = JSON.parse(response);
   if(obj.status == 200)
   {
     this.tostr.success(obj.message);    
     this.addrbook_pickupdata_Data();
     this.closeAddPickup();
      this.getData('');
      //this.countryList = "";
   }
   else
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

Edit_pickup_name:any;
Edit_pickup_company_name:any;
Edit_contact_person:any;
Edit_contact_number:any;
Edit_pickup_email:any;
Edit_pickup_pincode:any;
Edit_pickup_landmark:any;
Edit_pickup_address1:any;
Edit_pickup_address2:any;
Edit_gst_number:any;
Edit_pickup_state:any;
Edit_pickup_id:any;
Edit_pickup_country:any;
Edit_pickup_city:any; 

Pick_country_list:any;
Pick_State_list:any;
pick_city_list:any;

getCountry()
{
    this.client.get_country(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Pick_country_list = obj.result;
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


getState()
{
  var json = 
  {
    country_id:this.Edit_pickup_country
  }
  this.client.get_state(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Pick_State_list = obj.result;
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


get_City()
{
  var json = 
  {
    state_id:this.Edit_pickup_state
  }
  this.client.get_city(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.pick_city_list = obj.result;
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

editPickup(modal,id)
{

  var json = 
  {
    id:id,
    type :"pickup"
  }
   this.client.viewDetailsAddressBook(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.Edit_pickup_name = obj.result.pickup_name;
          this.Edit_pickup_company_name = obj.result.pickup_company_name;
          this.Edit_contact_person = obj.result.contact_person;
          this.Edit_contact_number = obj.result.contact_number;
          this.Edit_pickup_email = obj.result.pickup_email;
          this.Edit_pickup_pincode = obj.result.pickup_pincode;
          this.Edit_pickup_landmark = obj.result.pickup_landmark;
          this.Edit_pickup_address1 = obj.result.pickup_address1;
          this.Edit_pickup_address2 = obj.result.pickup_address2;
          this.Edit_gst_number = obj.result.gst_number;
          this.Edit_pickup_state = obj.result.pickup_state;
          this.Edit_pickup_id = obj.result.pickup_id;
          this.Edit_pickup_country = obj.result.pickup_country;
          this.Edit_pickup_city = obj.result.pickup_city;
          this.getCountry();
          this.getState();
          this.get_City();
      }
      else
      {
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }
    });

  this.editPickModal = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

closeEditPickModal()
{
  this.editPickModal.hide();
}



ActiveDelivery(id)
{
  this.Loader = this.loader.show();
    var json = 
    {
        id:id,
        type :"delivery",
        status :"activate",
    }
    this.client.ActiveDeactiveAddBook(json).subscribe((data: any) => {
      var response = data._body;
      this.Loader = this.loader.hide();
      var obj = JSON.parse(response);
      if (obj.status == 200) {      
        this.tostr.success("Address Deactivated Successfully");
        this.addrbook_delivery_Data();
        this.getData('delivery')
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

DeactivateDelivery(id)
{
  
  this.Loader = this.loader.show();
    var json = 
    {
        id:id,
        type :"delivery",
        status :"deactivate",
    }
    this.client.ActiveDeactiveAddBook(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      this.Loader = this.loader.hide();
      if (obj.status == 200) {      
        this.tostr.success("Address Activated Successfully");
       this.addrbook_delivery_Data();
        this.getData('delivery')
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


delivname:any; 
companyname: any;
contactname: any;
delivcontact:any;
delivemail:any;
delivpincode:any;
address1:any;
address2:any;
delLandmark:any;
 

addDeliveryAddress(modal)
{
  this.addDelModal = this.modalService.show(modal,
  {
    class:"modal-xl",
  });
}

closeAddDelivery()
{
  this.addDelModal.hide();
  this.Addstate = '';
  this.Addcity = '';
}

onSubmitDelivery(add)
{
  if(add.valid)
  {
    this.Loader = this.loader.show();
  var json =
  {
    delivery_address_name:this.delivname,
    delivery_contact_person_name:this.contactname,
    delivery_company_name:this.companyname,
    delivery_contact_number:this.delivcontact,
    delivery_email:this.delivemail,
    delivery_pincode:this.delivpincode,
    delivery_landmark:this.delLandmark,
    delivery_addr1:this.address1,
    delivery_addr2:this.address2,
    delivery_country:this.Addcountry,
    delivery_state:this.Addstate,
    delivery_city:this.Addcity
  }
  this.client.add_delivery_Address(json).subscribe((data:any) => {
      this.Loader = this.loader.hide();
    var response = data._body;
    var obj = JSON.parse(response);
    if(obj.status == 200)
    {    
      this.tostr.success(obj.message);
      this.closeAddDelivery();
      this.getData('delivery')
      
    }
    else
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

//variables for edit pickup Address



  get_address_by_pin()
  {
    // var json = 
    // {
    //   pincode:this.Edit_pickup_pincode,
    // }
    // this.client.getAddressBypin(json).subscribe((data: any) => {
    //   var response = data._body;
    //   var obj = JSON.parse(response);
    //   if (obj.status == 200) {
    //     this.Edit_pickup_state = obj.result.state;
    //     this.Edit_pickup_country = obj.result.country;
    //     this.Edit_pickup_city = obj.result.city;
    //   }
    //   else
    //   {
    //     if(obj.message.includes("authToken"))
    //       {
    //         this.router.navigate(['/signin/'+obj.message]);
    //       }
    //   }
    // });
  }


onSubmitUpdatePick(up)
{
  if(up.valid)
  {
  this.Loader = this.loader.show();
   var json =
   {
      pickup_id:this.Edit_pickup_id,
      pickup_name:this.Edit_pickup_name,
      contact_person:this.Edit_contact_person,
      pickup_company_name:this.Edit_pickup_company_name,
      contact_number:this.Edit_contact_number,
      pickup_email:this.Edit_pickup_email,
      pickup_pincode:this.Edit_pickup_pincode,
      pickup_landmark:this.Edit_pickup_landmark,
      pickup_address1:this.Edit_pickup_address1,
      pickup_address2:this.Edit_pickup_address2,
      pickup_country:this.Edit_pickup_country,
      pickup_state:this.Edit_pickup_state,
      pickup_city:this.Edit_pickup_city,
      gst_number:this.Edit_gst_number,
      default_check:"",
    }
    //console.log(json);
    this.client.update_pick_add(json).subscribe((data: any) => {
       this.Loader = this.loader.hide();
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {       
        this.tostr.success(obj.message);
        this.addrbook_pickupdata_Data();
        this.closeEditPickModal();
        this.addrbook_delivery_Data();
        this.getData('');
      }
      else
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


//variables for edit delivery Address
Edit_address1:any;
Edit_address2:any;
Edit_Del_city:any;
Edit_client_id:any;
Edit_company_name: any;
Edit_country: any;
Edit_delivery_address_name: any;
Edit_delivery_email:any;
Edit_delivery_pincode: any;
Edit_email: any;
Edit_id: any;
Edit_landmark: any;
Edit_mobile_number: any;
Edit_name: any;
Edit_state: any;

Del_country_list:any;
Del_state_list:any;
Del_City_list:any;

get_Country()
{
    this.client.get_country(localStorage.getItem("token")).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Del_country_list = obj.result;
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


get_State()
{
  var json = 
  {
    country_id:this.Edit_country
  }
  this.client.get_state(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Del_state_list = obj.result;
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


get__City()
{
  var json = 
  {
    state_id:this.Edit_state
  }
  this.client.get_city(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.Del_City_list = obj.result;
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


editDelivery(modal,id)
{
  var json = 
  {
    id:id,
    type :"delivery"
  }
   this.client.viewDetailsAddressBook(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.Edit_address1 = obj.result.address1;
          this.Edit_address2 = obj.result.address2;
          this.Edit_Del_city = obj.result.city_id;
          this.Edit_client_id = obj.result.client_id;
          this.Edit_company_name = obj.result.company_name;
          this.Edit_country = obj.result.country;
          this.Edit_delivery_address_name = obj.result.delivery_address_name;
          this.Edit_delivery_email = obj.result.delivery_email;
          this.Edit_delivery_pincode = obj.result.delivery_pincode;
          this.Edit_email = obj.result.email;
          this.Edit_id = obj.result.id;
          this.Edit_landmark = obj.result.landmark;
          this.Edit_mobile_number = obj.result.mobile_number;
          this.Edit_name = obj.result.name;
          this.Edit_state = obj.result.state_id;
         this.get_Country();
         this.get_State();
         this.get__City();
      }
      else
      {
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }
    });

    this.editDeliModal = this.modalService.show(modal,
      {
        class:"modal-xl",
      })
   }

     get_address_by_pin1()
  {
    var json = 
    {
      pincode:this.Edit_delivery_pincode,
    }
    this.client.getAddressBypin(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Edit_state = obj.result.state;
        this.Edit_country = "India";
        this.Edit_Del_city = obj.result.city;
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


close_editDelivery()
{
  this.editDeliModal.hide();
}

onSubmitUpdateDel(f)
{
  this.Loader = this.loader.show();
  if(f.valid){
  this.Loader = this.loader.show();
  var json = 
  {
    delivery_id:this.Edit_id,
    delivery_address_name:this.Edit_delivery_address_name,
    delivery_contact_person_name:this.Edit_name,
    delivery_company_name:this.Edit_company_name,
    delivery_contact_number:this.Edit_mobile_number,
    delivery_email:this.Edit_delivery_email,
    delivery_pincode:this.Edit_delivery_pincode,
    delivery_landmark:this.Edit_landmark,
    delivery_addr1:this.Edit_address1,
    delivery_addr2:this.Edit_address2,
    delivery_country:this.Edit_country,
    delivery_state:this.Edit_state,
    delivery_city:this.Edit_Del_city,
}
 this.client.update_Del_add(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      this.Loader = this.loader.hide();
      if (obj.status == 200) {       
        this.tostr.success(obj.message);
        this.addrbook_delivery_Data();
        this.close_editDelivery();
        this.getData('delivery')
      }
      else
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

  delete_del(id)
  {
    if(confirm("Are you sure you want to delete this address ?")) {   
        this.Loader = this.loader.show();
        var json:any =
        {
          id: id,
          type: "delivery",
        }
        this.client.delete_add_book_delivery(json).subscribe((data: any) => {
        var response = data._body;
        this.Loader = this.loader.hide();
        var obj = JSON.parse(response);
        if (obj.status == 200) {      
            this.tostr.success(obj.message);
            this.addrbook_delivery_Data();
            this.getData('delivery')
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
  

}

