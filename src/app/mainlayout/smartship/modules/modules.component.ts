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
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

Loader:String;
  wordpress_channel:any;
  opencart_channel:any;
  shopify_channel:any;
  wix_channel:any;
  zoho_channel:any;
  magento_channel:any;
  magento_channel1:any
  instamojo:any;
  channeldetails:any;
  shify_id:any;
  shify_api_key:any;
  shify_password:any;
  shify_store_name:any;
  shify_secret_key:any;         
  shify_logo:any;
  shify_check_channel:any;
  shify_url:any;

  flag_list:any = 0;
  Apiurl:any = localStorage.getItem('apiurl');
  wordpress_count:any = "" ;
  magento_count:any = "" ;
  opencar_count:any = "" ;
  shopify_count:any = "" ;
  wix_count:any = "" ;
  zoho_count:any = "" ;
  magento_count1:any = "" ;
  instamojo_count:any = "" ;
  magentov2List:any;
  magentov2_count:any = "";

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
  ) {}
  ngOnInit(): void {
    this.get_module_list();
  }
  go_to_home()
  {
    this.router.navigate(['/dashboard/']);
  }

  go_to_integrated_list()
  {
    this.flag_list = 1;
  } 

  go_to_channels()
  {
    this.flag_list = 0;
  }

  go_to_template(){this.router.navigate(['/template/']);} 
go_to_add_book(){this.router.navigate(['/addressbook/']);}
go_to_module(){this.router.navigate(['/modules/']);}
//go_to_api_doc(){this.router.navigate(['/apidoc/']);}
 go_to_api_doc(){window.open("https://documenter.getpostman.com/view/12163140/TVK5dMUb");}

  modules_Form= new FormGroup({
    website_name: new FormControl('', Validators.required,),
    channel_name: new FormControl('', [Validators.required, ]),
    store_url: new FormControl('', [Validators.required, ]),
    user_name: new FormControl('', [Validators.required,Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    api_key: new FormControl('', [Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'), Validators.minLength(1)]),
    choose_file: new FormControl('', [Validators.required,Validators.minLength(6),Validators.pattern("[1-9][0-9]{5}") ]),
  });
  get_module_list()
  {
   this.client.moduleChannelList(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.wordpress_channel=obj.result.wordpress_channel; 
        this.magento_channel=obj.result.magento_channel; 
        this.opencart_channel=obj.result.opencart_channel; 
        this.shopify_channel=obj.result.shopify_channel; 
        this.wix_channel=obj.result.wix_channel; 
        this.zoho_channel=obj.result.zoho_channel; 
        this.magento_channel1=obj.result.magento_channel; 
        this.instamojo=obj.result.instamojo; 
        this.magentov2List = obj.result.magentov2_channel;
        console.log(this.magentov2List);

            this.wordpress_count= this.wordpress_channel.length;
            this.magento_count=this.magento_channel.length ;
            this.opencar_count= this.opencart_channel.length;
            this.shopify_count=this.shopify_channel.length ;
            this.wix_count= this.wix_channel.length;
            this.zoho_count= this.zoho_channel.length;
            this.magento_count1= this.magento_channel1.length;
            this.instamojo_count= this.instamojo.length;
            this.magentov2_count = this.magentov2List.length;
            console.log(this.magento_count);

     }
     if(obj.message.includes("authToken"))
     {
       this.router.navigate(['/signin/'+obj.message]);
     }
    });
  }

    viewChannel(id,type)
    {  
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.viewChannelDetails(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
        this.channeldetails=obj.result; 
        if(obj.result.check_channel=='Shopify'){
          this.shify_id = obj.result.id;     
          this.shify_api_key = obj.result.api_key;  
          this.shify_password = obj.result.password;  
          this.shify_store_name = obj.result.store_name;  
          this.shify_secret_key = obj.result.secret_key;
          this.shify_logo = obj.result.logo;
          this.shify_check_channel = obj.result.check_channel;
          this.shify_url = obj.result.shopify_url;
        }else if(obj.result.check_channel=='Woocommerce'){

        }else if(obj.result.check_channel=='Insta-Mogo'){
          
        }else if(obj.result.check_channel=='Magento'){
          
        }else if(obj.result.check_channel=='Wix'){
          
        }else if(obj.result.check_channel=='Opencart'){
          
        }      
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  } 


shopify:BsModalRef;
magento1:BsModalRef;
magento2:BsModalRef;
woo:BsModalRef;
opencart:BsModalRef;
zoho:BsModalRef;
wix:BsModalRef;
instamojo_:BsModalRef;
presta:BsModalRef;

open_shopify(modal)
{
    this.shopify = this.modalService.show(modal,{
        class:"modal-xl",
    })
}

close_shopify()
{
   this.shopify.hide();
}

open_magento1(modal)
{
  this.magento1 = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_magentov1()
{
  this.magento1.hide();
}

open_magento2(modal)
{
  this.magento2 = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_magentov2()
{
  this.magento2.hide();
}

open_woo(modal)
{
  this.woo = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_woo()
{
  this.woo.hide();
}

open_opencart(modal)
{
  this.opencart = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_opencart()
{
  this.opencart.hide();
}

open_zoho(modal)
{
  this.zoho = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_zoho()
{
  this.zoho.hide();
}

open_wix(modal)
{
  this.wix = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_wix()
{
  this.wix.hide();
}


open_instamojo_(modal)
{
  this.instamojo_ = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_instamojo_()
{
  this.instamojo_.hide();
}

open_presta(modal)
{
  this.presta = this.modalService.show(modal,
  {
    class:"modal-xl",
  })
}

close_presta()
{
  this.presta.hide();
}

sh_storename:any;
sh_channel_name:any = "Shopify";
sh_storeurl:any;
sh_secretkey:any
sh_apikey:any;
sh_locationid:any;
sh_password:any;
//sh_channel:any = "Shopify"

resdata:any;
submit_shopify(s,type)
{
  if(s.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('shopiImage')).files;
   const payload = new FormData(); 
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Shopify");
   payload.append("shopifyapi_key" , this.sh_apikey);
   payload.append("shopify_password" , this.sh_password);
   payload.append("storename" , this.sh_storename);
   payload.append("shopifysecreate_key" , this.sh_secretkey);
   payload.append("shopify_locationid" , this.sh_locationid);
   payload.append("shopifyurl" , this.sh_storeurl);
   this.http
      .post(this.Apiurl+"/moduleschannels/integrateChannel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);  
                    this.get_module_list();
                    this.close_shopify();                  
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
  
}

m_website:any;
m_channel:any = "Magento_v1";
m_storeurl:any;
m_username:any
m_apikey:any;

submit_magento(m)
{
  if(m.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('Magento1_logo')).files;
   const payload = new FormData(); 
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Magento_v1");
   payload.append("mageV1name" , this.m_website);
   payload.append("magev1_url" , this.m_storeurl);
   payload.append("magev1_username" , this.m_username);
   payload.append("magev1_apikey" , this.m_apikey);
   payload.append("merchant_id" , "");
   payload.append("magentov1_channel" , this.m_channel);


   this.http
      .post(this.Apiurl+"/moduleschannels/integrateChannel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_magentov1();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
  
}


wooname:any;
wurl:any;
wconsumer_key:any;
wconsumer_secret:any;
woochannel:any = "Woocommerce";
submit_woo(w)
{
  if(w.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('woo_logo')).files;
   const payload = new FormData(); 
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Woocommerce");
   payload.append("wooname" , this.wooname);
   payload.append("wurl" , this.wurl);
   payload.append("wconsumer_key" , this.wconsumer_key);
   payload.append("wconsumer_secret" , this.wconsumer_secret);
   payload.append("woochannel" , this.woochannel);
  
   this.http
      .post(this.Apiurl+"/moduleschannels/integrateChannel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_woo();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
  
}

mageV2name:any;
magev2_url:any;
magev2_username:any;
magev2_password:any;
v2apikey:any;
vendor_type:any;
m2_channel:any="Magento_v2";

submit_mv2(g)
{
  if(g.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('m2_logo')).files;
   const payload = new FormData(); 
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Magento_v2");
   payload.append("mageV2name" , this.mageV2name);
   payload.append("magev2_url" , this.magev2_url);
   payload.append("magev2_username" , this.magev2_username);
   payload.append("magev2_password" , this.magev2_password);
   payload.append("v2apikey" , this.v2apikey);
   payload.append("vendor_type" , this.vendor_type);
   
  
   this.http
      .post(this.Apiurl+"/moduleschannels/integrateChannel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_magentov2();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
  
}


opencartname:any;
opencarturl:any;
opencart_key:any;
opencart_api_username:any;
opencartchannel:any = "Opencart";
destipathOpencart:any;
submit_Opencart(p)
{
  if(p.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('opencart1_logo')).files;
   const payload = new FormData(); 
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Opencart");

   payload.append("opencartname" , this.opencartname);
   payload.append("opencarturl" , this.opencarturl);
   payload.append("opencart_key" , this.opencart_key);
   payload.append("opencart_api_username" , this.opencart_api_username);
   payload.append("destipathOpencart" , this.opencartchannel);
   payload.append("opencartchannel" , this.destipathOpencart);
   
  
   this.http
      .post(this.Apiurl+"/moduleschannels/integrateChannel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_opencart();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
  
}

go_to_instamojo()
{
  window.open("https://www.instamojo.com/accounts/login?utm_campaign=reg_branded_ind_bad&utm_source=googleads&utm_medium=brand_search_terms_exact_dk&utm_content=PM&utm_term=instamojo%20login&utm_device=c&utm_matchtype=e&utm_content={search_payments}&gclid=Cj0KCQjws4aKBhDPARIsAIWH0JXDNU-CNql1Ocvhzn6QvKEdoxExtyf4nJBhFWg8dEgquPb453JDIiUaAok2EALw_wcB")
}

go_to_wix()
{
  window.open("https://dev.wix.com/api/rest/wix-stores")
}


 

  deleteChannel(id,type){  
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.deleteChannel(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
        this.tostr.success(obj.message);
        this.get_module_list();       
      }else{   
      this.tostr.error(obj.message);     
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }


  onSubmit() 
  {
    console.log(this.modules_Form.value);
  }


channellist:BsModalRef;

open_channel(modal)
{
  this.channellist = this.modalService.show(modal,
  {
      class:"modal-xl",
  })
}

close_channel()
{
  this.channellist.hide();
}

edit_shopi:BsModalRef;
edit_shopify(modal, id, type)
{  
   this.Loader = this.loader.show();
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.viewChannelDetails(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
        this.channeldetails=obj.result; 
       
          this.shify_id = obj.result.id;     
          this.sh_apikey = obj.result.api_key;  
          this.sh_password = obj.result.password;  
          this.sh_storename = obj.result.store_name;  
          this.sh_secretkey = obj.result.secret_key;
          this.sh_channel_name = obj.result.check_channel;
          this.sh_storeurl = obj.result.shopify_url;
       
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });

    this.edit_shopi = this.modalService.show(modal,
    {
      class:"modal-xl",
    })
    this.Loader = this.loader.hide();
  } 

close_edit_shopify()
{
  this.edit_shopi.hide()
}

edit_submit_shopify(ss)
{
    if(ss.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('e_shopiImage')).files;
   const payload = new FormData(); 
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Shopify");
   payload.append("shopifyapi_key" , this.sh_apikey);
   payload.append("shopify_password" , this.sh_password);
   payload.append("storename" , this.sh_storename);
   payload.append("shopifysecreate_key" , this.sh_secretkey);
   payload.append("shopify_locationid" , this.sh_locationid);
   payload.append("shopifyurl" , this.sh_storeurl);
   payload.append("id" , this.shify_id);
   this.http
      .post(this.Apiurl+"/moduleschannels/updateChanel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();  
                    this.close_edit_shopify();
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
}


edit_woo:BsModalRef;
woo_id:any;
edit_woocom(modal, id, type)
{
  this.woo_id = id;
  this.Loader = this.loader.show();
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.viewChannelDetails(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
          this.woo_id = obj.result.id;
          this.wooname = obj.result.name;
          this.wurl = obj.result.url;
          this.wconsumer_key = obj.result.key
          this.wconsumer_secret = obj.result.secret
          this.woochannel = obj.result.channel;
       
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });

    this.edit_woo = this.modalService.show(modal,
    {
      class:"modal-xl",
    })
    this.Loader = this.loader.hide();
}

close_edit_woo()
{
  this.edit_woo.hide();
}

edit_submit_woo(ww)
{
   if(ww.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('edit_woo_logo')).files;
   const payload = new FormData(); 
   payload.append("id" , this.woo_id);
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Woocommerce");
   payload.append("wooname" , this.wooname);
   payload.append("wurl" , this.wurl);
   payload.append("wconsumer_key" , this.wconsumer_key);
   payload.append("wconsumer_secret" , this.wconsumer_secret);
   payload.append("woochannel" , this.woochannel);
  
   this.http
      .post(this.Apiurl+"/moduleschannels/updateChanel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_woo();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
            },
      );
  }
}

edit_m_v1:BsModalRef;
mv1_id:any;
open_edit_m1(modal, id, type)
{ 
  this.Loader = this.loader.show();
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.viewChannelDetails(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
         this.mv1_id = obj.result.id;
         this.m_website = obj.result.name;
         this.m_channel = obj.result.check_channel;
         this.m_storeurl = obj.result.url;
         this.m_username = obj.result.mage_user;
         this.m_apikey = obj.result.mage_api;
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  this.edit_m_v1 = this.modalService.show(modal,
  {
    class:"modal-xl",
  }) 
  this.Loader = this.loader.hide();
}

close_edit_m1()
{
  this.edit_m_v1.hide();
}

edit_submit_magento(mm)
{
  if(mm.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('edit_magento_logo')).files;
   const payload = new FormData(); 
   payload.append("id" , this.mv1_id);
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Magento_v1");
   payload.append("mageV1name" , this.m_website);
   payload.append("magev1_url" , this.m_storeurl);
   payload.append("magev1_username" , this.m_username);
   payload.append("magev1_apikey" , this.m_apikey);
   payload.append("merchant_id" , "");
   payload.append("magentov1_channel" , this.m_channel);


   this.http
      .post(this.Apiurl+"/moduleschannels/updateChanel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_edit_m1();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
}

edit_opencart:BsModalRef;
Oc_id:any;
open_edit_opencart(modal, id, type)
{
  this.Loader = this.loader.show();
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.viewChannelDetails(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
         this.Oc_id = obj.result.id;
         this.opencartname = obj.result.name;
         this.opencarturl = obj.result.url
         this.opencart_key = obj.result.api_key;
         this.opencart_api_username = obj.result.api_username;
         this.opencartchannel = "Opencart";
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
 
  this.Loader = this.loader.hide();
    this.edit_opencart = this.modalService.show(modal,
    {
      class:"modal-xl",
    })
}

close_edit_opencart()
{
  this.edit_opencart.hide();
}

e_submit_Opencart(pp)
{

  if(pp.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('edit_open_logo')).files;
   const payload = new FormData(); 
   payload.append("id" , this.Oc_id);
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Opencart");

   payload.append("opencartname" , this.opencartname);
   payload.append("opencarturl" , this.opencarturl);
   payload.append("opencart_key" , this.opencart_key);
   payload.append("opencart_api_username" , this.opencart_api_username);
   payload.append("destipathOpencart" , this.opencartchannel);
   payload.append("opencartchannel" , this.destipathOpencart);
   
  
   this.http
      .post(this.Apiurl+"/moduleschannels/updateChanel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_edit_opencart();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
  

}

magentov2:BsModalRef;
magev2Id:any;
open_edit_m2(modal, id, type)
 {
     this.Loader = this.loader.show();
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.viewChannelDetails(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {

          this.magev2Id = obj.result.id;
          this.mageV2name = obj.result.website_name;
          this.magev2_url = obj.result.url;
          this.magev2_username = obj.result.username;
          this.magev2_password = obj.result.password;
          this.v2apikey = obj.result.apikey;
          this.vendor_type = obj.result.vendor_type;
          this.m2_channel ="Magento_v2";
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
 
  this.Loader = this.loader.hide();
    this.magentov2 = this.modalService.show(modal,
    {
      class:"modal-xl",
    })
 }

 close_edit_m2()
 {
   this.magentov2.hide();
 }

e_submit_mv2(vg)
{
    if(vg.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('edit_magento2')).files;
   const payload = new FormData(); 
   
   payload.append("id" , this.magev2Id);
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Magento_v2");
   payload.append("mageV2name" , this.mageV2name);
   payload.append("magev2_url" , this.magev2_url);
   payload.append("magev2_username" , this.magev2_username);
   payload.append("magev2_password" , this.magev2_password);
   payload.append("v2apikey" , this.v2apikey);
   payload.append("vendor_type" , this.vendor_type);
   
  
   this.http
      .post(this.Apiurl+"/moduleschannels/updateChanel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_edit_m2();                    
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
}

editwoocom:BsModalRef;
e_woo_id:any;
open_edit_woo(modal, id, type)
{
   this.Loader = this.loader.show();
    var json = 
    {
      id:id,
      channel_type:type
    }    
    this.client.viewChannelDetails(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);      
      if (obj.status == 200) {
              this.Loader = this.loader.hide();
              this.e_woo_id = obj.result.id;
          this.wooname = obj.result.name;
          this.wurl = obj.result.url;
          this.wconsumer_key = obj.result.key;
          this.wconsumer_secret = obj.result.secret;
          this.woochannel = "Woocommerce";
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
    this.editwoocom = this.modalService.show(modal,
    {
      class:"modal-xl"
    })
}

close_e_woo()
{
   this.editwoocom.hide();
}

e_submit_woo(ww)
{
    if(ww.valid == true)
  {
    this.Loader = this.loader.show();
    const a: any = ( < HTMLInputElement > document.getElementById('e_woo_logo')).files;
   const payload = new FormData(); 
   payload.append("id" , this.e_woo_id);
   payload.append("channel_logo" , a[0]);
   payload.append("channel_type" , "Woocommerce");
   payload.append("wooname" , this.wooname);
   payload.append("wurl" , this.wurl);
   payload.append("wconsumer_key" , this.wconsumer_key);
   payload.append("wconsumer_secret" , this.wconsumer_secret);
   payload.append("woochannel" , this.woochannel);
  
   this.http
      .post(this.Apiurl+"/moduleschannels/updateChanel",
        payload, {
          headers: {
                      'Authorization': localStorage.getItem("token"),
                   } 
                 } ).subscribe(
              (data:any) => {
                 this.Loader = this.loader.hide();   
                  this.resdata = data;
                  var obj = this.resdata;
                  if (obj.status == 200) 
                  {
                    this.tostr.success(obj.message);
                    this.get_module_list();
                    this.close_e_woo();            
                  }else 
                  {
                    this.tostr.error(obj.message);                 
                    if(obj.message.includes("authToken"))
                    {
                      this.router.navigate(['/signin/'+obj.message]);
                    }
                  }     
                },
            );
  }
}

}
