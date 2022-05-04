import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-track-rto',
  templateUrl: './track-rto.component.html',
  styleUrls: ['./track-rto.component.css']
})
export class TrackRtoComponent implements OnInit {
  @Output() trackrto_count:EventEmitter<any> = new EventEmitter
  Loader:any;
  all_list:any;
  p:any;
  filter_count:any;
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
  	this.getIntransitData();
    this.get_partnerList();
    this.get_status();
  }

    go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

  getIntransitData()
  {

    this.Loader = this.loader.show();
    let json:any ={    
      order_id:this.trackingID,
      limit:"200",
      page_no:"",
      start_date:"",
      end_date:"",
      order_by:"",
      tab_type:"rto",
      mobile_no:this.cust_mobile,
      payment_mode:this.pay,
      tracking_no:this.track_no,
      manifast_id:"",
      status:this.check2,
      courier_id :this.check,


    };
    this.client.Tracking(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
      this.Loader = this.loader.hide();
         
      this.filter_count = obj.result.count_rto;
      this.trackrto_count.emit(this.filter_count); 


      this.all_list = obj.result.trackingdata;
       	// var mydata = obj.result.trackingdata;
       	// var time:any;
       	// for(let i:number = 0; i < mydata.length; i++)
       	// {
       	// 	var time1:any = mydata[i].mytime;
       	// 	time = time1.split(".",2);
       	// 	//console.log(time);
       	// 	mydata[i].updateTime = time[0];
       	// } 
         // this.all_list = mydata;
      }
      else{
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

go_to_tracking(id:number)
{
  var url = '/track/'+id;
  window.open(url);
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

status_list:any;
  get_status()
{
  this.client.get_status_list().subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
         this.status_list = obj.result;
          for(let i:number = 0; i < this.status_list.length; i++)
         {
           this.status_list[i].checked = false; 
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
       //console.log(this.check);
        
  }

  check2:any[] = [];
  changeSelection2()
  {
     for(let i:number = 0; i < this.check2.length; i++)
      {
          this.check2.pop();
      }
     var num:number;
       var a =  this.status_list.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].id;
         this.check2.push(num);
       }
       var x =  this.check2.filter((value,index) => this.check2.indexOf(value) === index)
       this.check2 = x;
       //console.log(this.check2);
        
  }


filterFlag = 0;
trackingID:any = null;
cust_mobile:any = null;
paymode = [
{ name: "cod", value:"COD"},
{ name: "online", value:"Online"}];
pay:any = null;
track_no:any = null;
payFilter(data)
{
    this.pay = data;
    this.filter();
}

filter()
{
    if(this.trackingID != null && this.trackingID != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
     if(this.cust_mobile != null && this.cust_mobile != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
     if(this.pay != null && this.pay != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
    if(this.track_no != null && this.track_no != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
    if(this.check != null && this.check[0] != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }

     if(this.check2 != null && this.check2[0] != '')
    {
      this.filterFlag =1;
      this.getIntransitData();
    }
}

reset_filter()
{
  this.filterFlag =0;
  this.trackingID = null;
  this.cust_mobile =null
  this.pay = null
  this.track_no = null;
  this.check =null;
  this.check2 = null;
  this.getIntransitData();
} 


}
