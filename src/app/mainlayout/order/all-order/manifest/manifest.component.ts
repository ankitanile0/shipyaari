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
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.css']
})
export class ManifestComponent implements OnInit {

Loader:any;
order_list:any;
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
  console.log( localStorage.getItem('sDate'));
   console.log( localStorage.getItem('eDate'));
    console.log( localStorage.getItem('cid'));

    this.get_data();
  }

  go_to_allorder()
  {
    this.router.navigate(['/allorder']);
  }

get_data()
{
  this.Loader = this.loader.show();
	 var json = 
    {
      start_date:localStorage.getItem('sDate'),
      end_date:localStorage.getItem('eDate'),
      courier_ids:localStorage.getItem('cid')
    }
    //console.log(json);
    this.client.ready_ship_manifestData(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.Loader = this.loader.hide();
       //window.open(obj.result);
       //this.order_list = obj.result.ship_data;
       var mydata = [];
       mydata  = obj.result;
         for (var i:number =0; i < mydata.length; i++)
           {    
               this.str =mydata[i].consignment_date;
               this.splitted = this.str.split(" ", 2);           
               var date_value=this.splitted[0];
               var time_value=this.splitted[1];
               mydata[i].date_value =  date_value; 
               mydata[i].time_value =  time_value;
           }
           this.order_list = mydata; 
         for(let i:number = 0; i < this.order_list.length; i++)
         {
           this.order_list[i].checked = false; 
         } 
            
           
           
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


cancel_order(id)
{
   if (confirm("Do You Really Wants to Cancel the Order?")) {
  this.Loader  = this.loader.show();
  var json = {
     consignment_id:id
  }
  this.client.cancel_Shipment(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.get_data();
         this.Loader  = this.loader.hide();
         this.tostr.success(obj.message);
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
}

show_label(consignment, partnerid)
{
  var json =
  {
    consign_id:consignment,
    partner_id:partnerid,
  }
  this.client.all_order_label(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        window.open(obj.result);
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

checkVal:boolean = false;
checkAllCheckBox(ev) 
{
  //console.log(this.checkVal);
  //var data;
   this.order_list.forEach(x =>
      x.checked = ev.target.checked,  
    )

     if(this.checkVal != false)
     {
        for(let i:number = 0; i < this.listCheck.length; i++)
      {
          this.listCheck.pop();
      }
     var num:number;
       for(let j:number = 0; j < this.order_list.length; j++)
       {
           this.order_list[j].checked == true
       }

       var a =  this.order_list.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].client_consignment_id;
         this.listCheck.push(num);
       }
       var x =  this.listCheck.filter((value,index) => this.listCheck.indexOf(value) === index)
       this.listCheck = x;

       console.log(this.listCheck); 
     }
     else
     {
        for(let j:number = 0; j < this.order_list.length; j++)
       {
           this.order_list[j].checked == false
       }
         this.listCheck=[];
     }
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
   
       var a =  this.order_list.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].client_consignment_id;
         this.listCheck.push(num);
       }
       var x =  this.listCheck.filter((value,index) => this.listCheck.indexOf(value) === index)
       this.listCheck = x;

       console.log(this.listCheck);    
  }  


  downoad_lbl()
{
  this.Loader = this.loader.show();
  var json =
  {
      consignment_ids:this.listCheck,
  }
  this.client.ready_ship_down_lbl(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.Loader = this.loader.hide();
       window.open(obj.result);
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


  get_invoice()
  {
    this.Loader = this.loader.show();
    var json =
    {
      comman_id:"",
      consignment_ids:this.listCheck,
    }
    this.client.ready_pick_getlabel(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       window.open(obj.result);
       this.Loader = this.loader.hide();
       //this.tostr.success(obj.message);
       //this.getReady_to_pick_Data();
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

  get_manifest()
  {
    var json =
    {
      consignment_ids:this.listCheck,
    }
    this.client.manifest_bulk(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       window.open(obj.result);
       //this.tostr.success(obj.message);
       //this.getReady_to_pick_Data();
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

  detailsModal:BsModalRef;
datalist:any;
prodlist:any;
detailsmodal(modal, id)
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
}
