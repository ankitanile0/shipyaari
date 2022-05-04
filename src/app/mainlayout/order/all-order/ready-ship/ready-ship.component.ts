import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { DateFormatService } from 'src/app/services/date-format.service';

@Component({
  selector: 'app-ready-ship',
  templateUrl: './ready-ship.component.html',
  styleUrls: ['./ready-ship.component.css']
})
export class ReadyShipComponent implements OnInit {

 


@Output() parent_count:EventEmitter<any> = new EventEmitter

  p:any;
  shipJson:any;
  count:any;
  //detailsModal:BsModalRef;
  Loader:String;
  Table_ReadytoShip_tab:any[]=[];
  str:any;
  splitted:any;
  filterFlag:number = 0;
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
  
 filter_count:any;
 filterName : any = null;

  ajaxongoing = false;  
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
    private datechange:DateFormatService,
    ) { }

  ngOnInit(): void {
    this.getReadytoShipData();
    this.get_partnerList();
    
  }

    getReadytoShipData(page_no=1)
  {
    if(this.ajaxongoing){
        return;
    }
    this.ajaxongoing = true;
    if(page_no == 1){
    this.Table_ReadytoShip_tab = [];
  }
     this.Loader = this.loader.show();
    this.shipJson ={
      limit:"20",
      page_no:page_no,
      start_date:this.start_date,
      end_date:this.end_date,
      order_by:"",
      pick_mobile:this.pic_mobile,
      del_mobile:this.del_mobile,
      avn_service:"",
      status_code:"",
      active_tab:"readytoship",
      order_id:this.trackingID,
      payment_mode:this.paymode,
      Client_id:"",
      courier_id:this.check,
      tracking_no:this.track_no,
      manifast_id:"",
    };
   
    this.client.All_orders(this.shipJson).subscribe((data: any) => {
      this.ajaxongoing = false;
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide();
        this.count = obj.result.totalreadytoshpages;
           //this.Table_ReadytoShip_tab=obj.result.readytoship;
           var mydata = obj.result.readytoship;  
         
           for (var i=0; i < mydata.length; i++)
           {    
               
               this.str =mydata[i].consignment_date;
               this.splitted = this.str.split(" ", 2);           
               var date_value=this.splitted[0];
               var time_value=this.splitted[1];
               mydata[i].date_value =  date_value; 
               mydata[i].time_value =  time_value;
               
           }
       
         for(let i:number = 0; i < mydata.length; i++)
         {
           mydata[i].checked = false; 
         }   
         //this.Table_ReadytoShip_tab = mydata;
          this.Table_ReadytoShip_tab = this.Table_ReadytoShip_tab.concat(mydata);
         //console.log(this.Table_ReadytoShip_tab)
         if(this.filterFlag == 1)
         {
          
         }
          this.filter_count = obj.result.ordercount.totalreadytoship;
          this.parent_count.emit(this.filter_count);

           
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

  onScroll() {  
//alert("hi");   
    if(this.count >= this.shipJson.page_no)
    {
      this.shipJson.page_no++;
      //console.log(this.allorderJson.page_no++)
      this.getReadytoShipData(this.shipJson.page_no);
    }
  }

payval:any;
paymode:any = '';
dRange:any;
end_date:any;
start_date:any;
trackingID:any;
pic_mobile:any;
del_mobile:any;
track_no:any;

payFilter(data)
{
  this.payval = data;

  this.filter();
}

filter()
{
  this.shipJson.page_no = 1;
  this.filterFlag = 1;

  //for order_id
  if(this.trackingID != null)
  {
    this.getReadytoShipData();
  }

  //for date range
  if(this.dRange != null)
  {    
     var daterange:any; 
     var temp:string = this.dRange; 
    daterange = this.datechange.changeDateFormate(temp);     
    this.end_date = daterange[1];
    this.start_date = daterange[0];
    console.log(this.end_date+' '+this.start_date);  
    this.getReadytoShipData();
  }
  

  
  //for Pay mode
  if(this.payval != null)
  {
    if(this.payval == "online")
    {
      this.paymode = "online";
      this.getReadytoShipData();
    }
    else
    {
      this.paymode = "cod";
      this.getReadytoShipData();

    }
  }

  if(this.pic_mobile != null)
  {
    this.getReadytoShipData();

  }

  if(this.del_mobile != null)
  {
    this.getReadytoShipData();
  }

  //awb filter
  if(this.check != null)
  {
    this.getReadytoShipData();
  }
  //track_noif
  if(this.track_no != null)
  {
     this.getReadytoShipData();
  }
  
}



clear_filters() {

 
  this.trackingID = ' ';
  this.pic_mobile = ' ';
  this.del_mobile = ' ';
  this.track_no = ' ';
  this.dRange = null;
  this.track_no = ' ';
  this.getReadytoShipData();

 

}





reset_filter()
{
  this.track_no = '';
  this.check = [];
  this.filterFlag = 0;
  this.payval = '';
  this.paymode = ' ';
  this.dRange = null;
  this.end_date='';
  this.start_date='';
  this.trackingID = '';
  this.pic_mobile = '';
  this.del_mobile = '';
  this.getReadytoShipData();

}


cancel_order(id)
{
  if (confirm("Do You Really Wants to Cancel the Order?")) {
  var json = {
     consignment_id:id
  }
  this.client.cancel_Shipment(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.getReadytoShipData();
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


checkVal:boolean = false;
checkAllCheckBox(ev) 
{
  //console.log(this.checkVal);
  //var data;
   this.Table_ReadytoShip_tab.forEach(x =>
      x.checked = ev.target.checked,   
    )
  }

  

partnerList:any;
get_partnerList()
  {
    this.client.get_partner_list().subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.partnerList = obj.result;
         for(let i:number = 0; i < this.partnerList.length; i++)
         {
           this.partnerList[i].checked = false; 
         }
         //console.log(this.partnerList);
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

  check:any[] = [];
  changeSelection()
  {
     for(let i:number = 0; i < this.check.length; i++)
      {
          this.check.pop();
      }
     var num:number;
       var a =  this.partnerList.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].user_id;
         this.check.push(num);
       }
       var x =  this.check.filter((value,index) => this.check.indexOf(value) === index)
       this.check = x;
       console.log(this.check);
        
  }

 

Show_label(consignment, partner, no_pck, paymode, orderid )
{
  var json = 
  {
    consign_id:consignment,
    partner_id:partner,
    no_of_pkg:no_pck,
    payment_mode:paymode,
    orderid:orderid
  }
  this.client.ready_to_ship_label(json).subscribe((data: any) => {
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


listCheck:any[] = [];
changeTableSelection()
  {
    this.checkVal = false;
     for(let i:number = 0; i < this.listCheck.length; i++)
      {
          this.listCheck.pop();
      }
     var num:number;
       var a =  this.Table_ReadytoShip_tab.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].client_consignment_id;
         this.listCheck.push(num);
       }
       var x =  this.listCheck.filter((value,index) => this.listCheck.indexOf(value) === index)
       this.listCheck = x;
       //console.log(this.listCheck);    
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

ManifestModal:BsModalRef;
OpenManifest(modal)
{
    this.ManifestModal = this.modalService.show(modal,{
      class:"modal-sm"
    })
}

closeManifest()
{
  this.ManifestModal.hide();
}

 
dateRange:any
courPartner:any;
end_date1:any;
start_date1:any;
submitManifest(f)
{
  var daterange:any; 
  var temp:string = this.dateRange;
  daterange = this.datechange.changeDateFormate(temp);     
  this.end_date1 = daterange[1];
  this.start_date1 = daterange[0];
  console.log(this.end_date1+' '+this.start_date1 );

  localStorage.setItem('sDate',this.start_date1);
  localStorage.setItem('eDate',this.end_date1);
  localStorage.setItem('cid',this.courPartner);
  this.router.navigate(['manifest']);
  this.closeManifest();
  //console.log(this.start_date1+"  "+this.end_date1);
  // if(f.valid)
  // {
  //   var json = 
  //   {
  //     start_date:this.start_date1,
  //     end_date:this.end_date1,
  //     courier_ids:this.courPartner
  //   }
    
    
  //   //console.log(json);
  //   this.client.ready_ship_manifestData(json).subscribe((data: any) => {
  //     var response = data._body;
  //     var obj = JSON.parse(response);
  //     if (obj.status == 200) {
  //      //this.Loader = this.loader.hide();
  //      //window.open(obj.result);
  //      this.closeManifest();
  //     }
  //      else
  //     {
  //      // this.Loader = this.loader.hide();
  //       this.tostr.error(obj.message);
  //       if(obj.message.includes("authToken"))
  //       {
  //         this.router.navigate(['/signin/'+obj.message]);
  //       }
  //     }
  //   });
  // }
}


OpenShipModel:BsModalRef;
//selectData:any;
openShip(modal)
{
    this.OpenShipModel = this.modalService.show(modal,
    {
      class:"modal-sm",
    })
}

closeopenShip()
{
  this.OpenShipModel.hide();
}

selectData:any = 0;
commnlist:any = null;
dataflag:number = 0;
selectedValue:any;
get_common_Id()
{
  this.commnlist = null
  this.selectedValue='';
  var a = (< HTMLInputElement > document.getElementById('common')).value;
  if(a == '0')
  {
    this.dataflag = 0
  }
  else
  {
    this.dataflag = 1
    var json = 
  {
   type:a, 
  }
  this.client.ready_ship_commonId(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.commnlist = obj.result;
      }
       else
      {
       // this.Loader = this.loader.hide();
        //this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }
}


status:any;
ship_now()
{
  this.Loader = this.loader.show();
  var a = (< HTMLInputElement > document.getElementById('common')).value;
  if(a == '0'){this.status = 1;  }
  if(a == 'yesterday'){this.status = 2}
  if(a == 'today'){this.status = 3}  

   var json = {
       consigned_id:this.listCheck,   
       status:this.status,
       common_id:this.selectedValue,
     } 
     this.client.ready_ship_bulk_batch(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.Loader = this.loader.hide();
        this.closeopenShip();
        this.getReadytoShipData();
        this.tostr.success(obj.message);
       //this.commnlist = obj.result;
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



maniLabel:BsModalRef;
sheet:any;
openManiLabel(modal)
{
  this.client.ready_ship_manilabelFetch(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
          this.sheet = obj.result;

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

    this.maniLabel = this.modalService.show(modal,
    {
      class:"modal-sm"
    })
}

downloadSheet()
{
  window.open(this.sheet)
}

excel_sheet:any;
resData:any;
submit_Sheet_manifest()
{
  if(this.excel_sheet != "")
  {
    const a: any = ( < HTMLInputElement > document.getElementById('sheet')).files;
    const payload = new FormData();
        //this.Loader = this.loader.show();
         // payload.append("app_token" , localStorage.getItem("token"));
          payload.append("file" , a[0]);
          payload.append("printtype" , "manifest");
      this.http
      .post("https://dev.shipyaari.com/angularapi/orders/print_excel_file",
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
              window.open(obj.result);
              this.tostr.success(obj.message);
              this.closeManiLabel();
              //this.Loader = this.loader.hide();  
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
  else{
    this.tostr.error("please Upload file")
  }
   
}

submit_Sheet_label()
{
  if(this.excel_sheet != "")
  {
    const a: any = ( < HTMLInputElement > document.getElementById('sheet')).files;
    const payload = new FormData();
        //this.Loader = this.loader.show();
         // payload.append("app_token" , localStorage.getItem("token"));
          payload.append("file" , a[0]);
          payload.append("printtype" , "label");
      this.http
      .post("https://dev.shipyaari.com/angularapi/orders/print_excel_file",
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
              window.open(obj.result);
              this.tostr.success(obj.message);
              this.closeManiLabel();
              //this.Loader = this.loader.hide();  
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
  else{
    this.tostr.error("please Upload file")
  }
   
}

closeManiLabel()
{
  this.maniLabel.hide();
}

goto_duplicate(id)
 {
   this.router.navigate(['/duplicate/'+id]);
 } 


  go_to_reverse(id)
 {
   this.router.navigate(['/reverce/'+id]);
 }

 
}
