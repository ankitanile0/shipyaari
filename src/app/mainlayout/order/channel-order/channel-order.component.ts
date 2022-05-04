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
  selector: 'app-channel-order',
  templateUrl: './channel-order.component.html',
  styleUrls: ['./channel-order.component.css'],
  styles: [
    `
:host >>> .popover {
 max-width: 100% !important;
  color: #fff;
}

  `
  ]
})
export class ChannelOrderComponent implements OnInit {

Loader:String;
p:any;
channel_orders:any;

delPin:any;
pickPin:any;
length:any;
width:any;
height:any;
weight:any;
insurance:any;
channelList:any;
zohoKey:any;
bulkList:any;
zoho_flag:any;

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
  	this.channel_orders_List();
    this.get_courier_list();
    this.get_service();
    this.set_insurnce();
    //this.set_pickup();
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

go_to_edit(id)
{
    this.router.navigate(['/editshipment/'+id]);
}

//html=`<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;

ListData:any = 
[{
  OrderID:"",
  Channel:"",
  cust_Name:"",
  paymode:"",
  orderStatus:"",
  orderDate:"",
  delAddress:"",
  price:"",
  productDetails:[{
    name:"",
    sku:"",
    qty:"",
    price:""
  }]
}]


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

   statList:any[]=
  [
    {name:"Processing", value:"processing" },
    {name:"Pending", value:"pending"},
    {name:"Paid", value:"paid"},
    {name:"On-hold", value:"on-hold"},
    {name:"Complete", value:"complete"},
  ]

str:any;
splitted:any;
timesplit:any;
Pick_list:any;
  channel_orders_List()
  {
    this.channel_orders=[];
  	this.Loader  = this.loader.show();
  	var json = 
  	{
  	limit:"500",
		page_no:"",
		order_by:"",
    order_id:this.filterId,
    channel_name:this.channelchek,
    payment_mode:this.paymode,  
    start_date:this.start_date,
    end_date:this.end_date,
    total_price:this.amount,
    status:this.stat,
  	}
  	this.client.channel_orders(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) {           
       //this.channel_orders = obj.result.process_order;
       this.channelList = obj.result.channellist
       this.zoho_flag = obj.result.zoho_connect;
      // alert(this.zoho_flag)
       if(obj.result.zoho_connect.client_key == null)
       {}
       else
       {
         this.zohoKey = obj.result.zoho_connect.client_key;
       }
        var mydata = obj.result.process_order;   
           for(var i=0; i < mydata.length; i++){    
               this.str =mydata[i].order_date;
               this.splitted = this.str.split(" ", 2);           
               var date_value=this.splitted[0];
               var time_value=this.splitted[1];
               mydata[i].date_value =  date_value; 
               mydata[i].time_value =  time_value;  
               //console.log(this.timesplit[0]); 
           }
           //this.channel_orders = mydata;
        for(var i:number = 0; i < mydata.length; i++)
        {
         var item = mydata[i].shipping_address;
         var name = JSON.parse(item);
         
         if(mydata[i].module_name == 'Woocommerce')
         {
          mydata[i].fname = name.first_name;
          mydata[i].lname = name.last_name;
          mydata[i].d_add = name.address1;
          mydata[i].d_city = name.city;
          mydata[i].d_state = name.state;
          mydata[i].d_pin = name.postcode;
         }
         else
         {
          mydata[i].fname = name.first_name;
          mydata[i].lname = name.last_name;
          mydata[i].d_add = name.address1;
          mydata[i].d_city = name.city;
          mydata[i].d_state = name.state;
          mydata[i].d_pin = name.zip;
         }
        } 
        //this.channel_orders = mydata;
        for(var i:number = 0; i < mydata.length; i++)
        {
          var prod = mydata[i].product_details;
          prod = JSON.parse(prod);
          mydata[i].proddata = prod;
          //console.log(prod);
        }   
         for(let i:number = 0; i < mydata.length; i++)
         {
           mydata[i].checked = false; 
         }
         this.Pick_list = obj.result.pickupdetails;
         this.pickup_id = this.Pick_list[0].pickup_id;
         this.set_pickup();
         this.Loader  = this.loader.hide();
         this.channel_orders = mydata;
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

modaldata:BsModalRef;
addreID:any;
fetchAddress(modal, id)
{
  this.addreID=id
  var json = 
  {
      adr_id:id
  }
  this.client.channel_order_fetch_add(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) {           
          this.add_delivery.get('fname').setValue(obj.result.first_name);
          this.add_delivery.get('lname').setValue(obj.result.last_name);
          this.add_delivery.get('company').setValue(obj.result.company);
          this.add_delivery.get('email').setValue(obj.result.email);
          this.add_delivery.get('conatact').setValue(obj.result.phone);
          this.add_delivery.get('add1').setValue(obj.result.address_1);
          this.add_delivery.get('add2').setValue(obj.result.address_2);
          this.add_delivery.get('pin').setValue(obj.result.postcode);
          this.add_delivery.get('city').setValue(obj.result.city);
          this.add_delivery.get('state').setValue(obj.result.state);
      }
       else
      {
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });

  this.modaldata = this.modalService.show(modal,
  {
    class:"modal-lg"
  })
} 

add_delivery = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("",Validators.required),
    company: new FormControl("" ),
    email: new FormControl("",[Validators.required, Validators.email]),
    conatact: new FormControl("",Validators.required),
    add1: new FormControl("",Validators.required),
    add2: new FormControl(""),
    pin: new FormControl("",Validators.required),
    city: new FormControl("",Validators.required),
    state: new FormControl("",Validators.required),
})

set_insurnce()
{
   this.ins_form.get('ins').setValue('no');
}

set_pickup()
{
  //console.log(this.Pick_list);
   this.pinform.get('pickPin').setValue(this.pickup_id);
}

submit()
{ 
    var json = 
    {
        adr_id:this.addreID,
        first_name:this.add_delivery.get('fname').value,
        last_name:this.add_delivery.get('lname').value,
        company:this.add_delivery.get('company').value,
        address_1:this.add_delivery.get('add1').value,
        address_2:this.add_delivery.get('add2').value,
        city:this.add_delivery.get('city').value,
        state:this.add_delivery.get('state').value,
        postcode:this.add_delivery.get('pin').value,
        email:this.add_delivery.get('email').value,
        phone:this.add_delivery.get('conatact').value,
    }
    console.log(json);
    this.client.update_Del_Address(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) {           
           this.tostr.success(obj.message); 
           this.closeFetch(); 
           this.channel_orders_List();
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

closeFetch()
  {
    this.modaldata.hide();
  } 

pinform = new FormGroup({pickPin:new FormControl})
ins_form = new FormGroup({ins:new FormControl})
dimform = new FormGroup({
  weight:new FormControl,
  length:new FormControl,
  height:new FormControl,
  width:new FormControl
})

sendData:any;
fetchData:any;
fetchfinal:BsModalRef;
ship_now(modal, orderid, delPin)
{
  //console.log(this.channel_orders)
  this.tempId = orderid;
  this.Loader  = this.loader.show();
  var length;
  var width;
  var height;
  var weight;

    for(let i:number = 0; i < this.channel_orders.length; i++)
    {
      if(orderid == this.channel_orders[i].id)
      {
          length = this.channel_orders[i].l;
          width = this.channel_orders[i].w;
          height = this.channel_orders[i].h;
          weight = this.channel_orders[i].weight;
      }
    }
  // console.log(this.dimform.value);
  var data = 
  {
     order_id: orderid,
     insurance:this.ins_form.get('ins').value,
     pickup_address:this.pinform.get('pickPin').value,
     d_pincode: delPin,
     weight: weight,
     length: length,
     width: width,
     height:height,
  }

  var json =
  {

    order_id:orderid,  
    insurance:this.ins_form.get('ins').value,
    weight:weight,     
    length:length,
    width:width,
    height:height,
    pickup_pincode:this.pinform.get('pickPin').value,
    delivery_pincode:delPin,
  }
  this.sendData = data;
  console.log(json)
  this.client.Channel_ship_now(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
        this.fetchData = obj.result;
      this.Loader  = this.loader.hide();
      // var encodebulk = JSON.stringify(this.fetchData);
       //console.log(encodebulk);
       //window.open()
      this.openFetch(modal);          
           //this.tostr.success(obj.message); 
           //this.channel_orders_List();   
         this.dimform.reset();  
      }
       else
      {
         this.Loader  = this.loader.hide();
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

openFetch(modal)
{
  this.fetchfinal = this.modalService.show(modal,
    {
      class:"modal-xl",
    })
}

closefetchsubmit()
{
  this.fetchfinal.hide();
}

checkVal:boolean = false;
checkAllCheckBox(ev) 
{
  //console.log(this.checkVal);
  //var data;
   this.channel_orders.forEach(x =>
      x.checked = ev.target.checked,   
    )
  }

listCheck:any[] = [];
changeTableSelection()
  {
    this.checkVal = false;
     for(let i:number = 0; i < this.listCheck.length; i++)
      {
          this.listCheck.pop();
      }
     var num:number;
       var a =  this.channel_orders.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].id;
         this.listCheck.push(num);
       }
       var x =  this.listCheck.filter((value,index) => this.listCheck.indexOf(value) === index)
       this.listCheck = x;
      console.log(this.listCheck);    
  }

  remove_order()
  {
     this.Loader  = this.loader.show(); 
    var json = 
    {
      ids:this.listCheck
    }
    this.client.channe_remove_order(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
      this.Loader  = this.loader.hide();          
           this.tostr.success(obj.message); 
           this.channel_orders_List();
           //this.closeFetch();    

      }
       else
      {
         this.Loader  = this.loader.hide();
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

 process:BsModalRef;
  process_modal(modal)
  {
    if(this.listCheck.length > 0)
    {
        this.process = this.modalService.show(modal,{
      class:"",
        })
    }
    else
    {
      this.tostr.error("Please Select Row")
    }
    
  }

  close_process()
  {
    this.process.hide();
  }

cour_list:any;
get_courier_list()
{
  this.client.get_partner_list().subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
      this.Loader  = this.loader.hide();          
           this.cour_list = obj.result;
           this.courier_id =  this.cour_list[0].user_id;
           console.log(this.courier_id);
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

serv_list:any;
get_service()
{
  this.client.get_service(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
      this.Loader  = this.loader.hide();          
           this.serv_list = obj.result;
           this.service_id = this.serv_list[0].avn_service_id;
           console.log(this.service_id);
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

pickup_id:any ;
service_id:any;
courier_id:any;
toweight:any;
towidth:any;
toheight:any;
tolength:any;
toinsurance:any = "no";

submit_process(f)
{
  if(f.valid)
  {
  this.Loader  = this.loader.show(); 
  var a = (< HTMLInputElement > document.getElementById('insurance')).value;
  var json = 
  {

    ids:this.listCheck,
    pickup_id:this.pickup_id,
    service_id:this.service_id,
    partner_id:this.courier_id,
    weight:this.toheight,
    height:this.toweight,
    length:this.tolength,
    width:this.towidth,
    insurance:a
  }
  this.client.channel_process(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
      this.Loader  = this.loader.hide(); 
      this.tostr.success(obj.message);          
           this.channel_orders_List();
           this.close_process();
      }
       else
      {
        this.tostr.error(obj.message); 
        this.Loader  = this.loader.hide(); 
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
}

push()
{
  this.Loader  = this.loader.show(); 
  this.tostr.success("gathering Information"); 
  var json = 
  {
     channel_name:"magento"
  }
  this.client.channel_push(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
      this.Loader  = this.loader.hide(); 
      this.tostr.success(obj.message);          
           this.channel_orders_List();
      }
       else
      {
        this.tostr.error(obj.message); 
        this.Loader  = this.loader.hide(); 
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

sync()
{
  this.Loader  = this.loader.show();
  this.client.channel_sync(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;     
      this.Loader  = this.loader.hide();
      var obj = JSON.parse(response);         
      if(obj.status == 200) { 
      this.tostr.success(obj.message);          
      this.channel_orders_List();
      }
       else
      {
        this.tostr.error(obj.message); 
        //this.Loader  = this.loader.hide(); 
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}


tempId:any;
final_ship(partner:number, service:number)
{
  var encodebulk = JSON.stringify(this.fetchData);
   this.Loader  = this.loader.show(); 
   var json ={
    partner_id:partner,
    service_id: service,
     post_data:this.sendData,
  }
  this.client.channel_ship_modal(json).subscribe((data: any) => {
      var response = data._body;     
      var obj = JSON.parse(response);         
      if (obj.status == 200) { 
      this.Loader  = this.loader.hide(); 
      this.tostr.success(obj.message);
        this.closefetchsubmit();          
           this.channel_orders_List();
      }
       else
      {
        this.tostr.error(obj.message); 
        this.Loader  = this.loader.hide(); 
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

zoho()
{
  window.open("https://accounts.zoho.com/oauth/v2/auth?scope=ZohoInventory.FullAccess.all&amp;client_id="+this.zohoKey+"&amp;response_type=code&amp;access_type=offline&amp;redirect_uri=https://dev.shipyaari.com/angularapi/zoho/redirecturl&amp;prompt=consent")
}

channelchek:any[] = [];
checkValchannel:boolean = false;
changechannelSelection()
  {
    this.checkValchannel = false;
     for(let i:number = 0; i < this.channelList.length; i++)
      {
          this.channelchek.pop();
      }
     var num:number;
       var a =  this.channelList.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].module_name;
         this.channelchek.push(num);
       }
       var x =  this.channelchek.filter((value,index) => this.channelchek.indexOf(value) === index)
       this.channelchek = x;
      //console.log(this.channelchek);    
  }


payFilter(data)
{
  this.payval = data;
  this.filter();
}

stat:any;
status_filter(data)
{
    this.stat = data;
    this.filter();
}

payval:any;
paymode:any = '';
filterflag:number = 0;
filterId:any;
dRange:any;
end_date:any;
start_date:any;
amount:any;

filter()
{  
    this.filterflag = 1;
    if(this.filterId != null)
    {
      this.channel_orders_List();
    }
    if(this.channelchek != null)
    {
        this.channel_orders_List();
    }
    if(this.payval != null)
    {
      if(this.payval == "online")
      {
        this.paymode = "online";
        this.channel_orders_List();
      }
      else
      {
        this.paymode = "cod";
        this.channel_orders_List();
      }
     }

    //for date range
 
  if(this.amount != "")
  {
    this.amount = this.amount.toString();
    this.channel_orders_List();
  } 
  if(this.stat != null)
  {
    this.channel_orders_List();
  }    
}

date_filter()
{
   this.filterflag = 1;
   if(this.dRange != null)
  {
    var temp:string = this.dRange;
    var strin:string  = JSON.stringify(temp)
    var replacedata = strin.replace(/[{()}]/g, '');
      replacedata  = replacedata.replace(/['"]+/g, '');
      replacedata  = replacedata.replace("[", '');
      replacedata  = replacedata.replace("]", '');
      var a  = replacedata.split('T');
      var b = a[1].split(',');
      this.end_date =  b[1];
      this.start_date = a[0];
      this.channel_orders_List();
      //alert("hi");
  } 
}

reset_filter()
{
  this.stat = null;
  this.amount = null;
  this.dRange = null;
  this.end_date =  null;
  this.start_date = null;
  this.filterflag = 0;
  this.filterId = [];
  this.channelchek=null;
  this.payval=null;
  this.paymode=null;
  this.channel_orders_List();
}

}

