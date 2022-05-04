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
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {


active_pan_list:any;
active_plan:any;
plandetail_list:any;
Detail_modal:BsModalRef;
plan_list:any;
Loader:any;
plan_parent:any;
annual:any;
semi_annual:any;
monthly:any;
desable_plan:any;
default_plan_rates:any;
new_plan_Id:any;
terms:any;

coupone:any;
plan_name:any;
plan_parentId:any;

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
  	this.get_Plan_data();
    this.get_partnerList();
  	this.term_cond();
  }



get_Plan_data()
{
	this.Loader = this.loader.show()
	var json =
	{
		limit:"200",
		page_no:"",
		start_page:"",
		order_by:"",
		tab_type:""
	}
	this.client.plan_data(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
        this.Loader = this.loader.hide();
        this.active_plan= obj.result.activeplans.id;
        this.plan_parent = obj.result.activeplans.parent_id;
        this.active_pan_list = obj.result.plan_details;
        this.plan_list = obj.result.by_default_list;
        this.list_data(this.active_plan, this.plan_parent);
        //this.tostr.success(obj.message);
      }else
      {
        this.Loader = this.loader.hide();
        //this.alertService.error(obj.message);
        //this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }    
    });
}

list_data(planid,parentid)
{
	this.new_plan_Id = planid; 
	this.desable_plan = '';
	this.Loader = this.loader.show()
	var json = 
	{
		plan_types:"", //not valid
	    plan_id:planid,//valid
	    parent_id:parentid,//valid
      courier_id:this.check,
	}
	this.client.plan_list(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
        this.Loader = this.loader.hide();
        this.plan_list = obj.result.user_dashboard;
        this.desable_plan = obj.result.disable_plan;
        this.default_plan_rates = obj.result.default_plantype;

        this.plan_name = obj.result.plan_details[0].plan_title;
        this.plan_parentId = obj.result.plan_details[0].parent_id;
       
      }else
      {
        this.Loader = this.loader.hide();
        
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }    
    });
}


term_cond()
{
	this.client.plan_term_cond(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) 
      {        
        this.terms = obj.result[0];
      }else
      {
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }    
    });
}

open_detail(modal)
{
	this.Detail_modal = this.modalService.show(modal,
	{
		class:""
	})
}

close_details()
{
	this.Detail_modal.hide();
}

plan_type(id)
{
	 this.Loader = this.loader.show();
	var json =
	{
		plan_type:id,
	    plan_id:this.new_plan_Id,
	}
	this.client.change_plan_type(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
        this.Loader = this.loader.hide();
        this.default_plan_rates = obj.result.default_plantype;
        //this.plan_list = obj.result.user_dashboard;
        // this.desable_plan = obj.result.disable_plan;
        // this.default_plan_rates = obj.result.default_plantype;
       
      }else
      {
        this.Loader = this.loader.hide();
        
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }    
    });
}


downloadPdf()
{
	this.client.plan_download_pdf(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
        window.open(obj.result);
      }else
      {
        this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }    
    });
}


activate_plan()
{
	var json = 
	{
		name_of_plan_text:this.plan_name,
		parent_id_change:this.plan_parentId,
		coupon_code:this.coupone,
	}
	this.client.Activate_plan(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
       this.tostr.success(obj.message);
       this.get_Plan_data();
      }else
      {
      	this.tostr.error(obj.message);
        if(obj.message.includes("authToken"))
          {
            this.router.navigate(['/signin/'+obj.message]);
          }
      }    
    });
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
       //console.log(this.check);     
  }

filter_flag:number = 0;
  filter()
  {
    this.filter_flag = 1;
    this.get_Plan_data();
  }
  reset_filter()
  {
    this.filter_flag = 0;
    this.check = [];
    this.get_Plan_data();
  }

}
