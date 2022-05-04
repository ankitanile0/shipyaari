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
import { JsonToExcelService } from 'src/app/services/json-to-excel.service';


@Component({
  selector: 'app-approve-rto',
  templateUrl: './approve-rto.component.html',
  styleUrls: ['./approve-rto.component.css']
})
export class ApproveRtoComponent implements OnInit {

	Loader:any;
	file:any;
	modal:BsModalRef;
  sheet:any = null;
  tracking_number:any;
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
  	) { }

  ngOnInit(): void {
  	this.get_data();
  }

    go_to_home()
{
  this.router.navigate(['/dashboard/']);
}

go_to_trackingpage(){this.router.navigate(['/trackingorders/']);} 
go_to_approve_rto(){this.router.navigate(['/approverto/']);}
go_to_approve_pickup(){this.router.navigate(['/approvepickup/']);}

get_data()
{
	this.Loader = this.loader.show();
	this.client.approve_rto(localStorage.getItem('token')).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       this.file = obj.result;
        this.Loader = this.loader.hide();
        
      }
      else{
        this.Loader = this.loader.show();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

moalupload(modal)
{
	this.modal = this.modalService.show(modal,
	{
		class:"modal-sm",
	})
}

close_modal()
{
	this.modal.hide();
}

download_sheet()
{
	window.open(this.file);
}

resData:any;
upload_sheet()
{
  if(this.sheet == null || this.sheet == '')
  {
     this.tostr.error("Please Upload File")
  }
  else
  {
    var url = localStorage.getItem('apiurl');
    const a: any = ( < HTMLInputElement > document.getElementById('sheet')).files;
    const payload = new FormData();
        this.Loader = this.loader.show();
         // payload.append("app_token" , localStorage.getItem("token"));
          payload.append("search_excel_file" , a[0]);
      this.http
      .post(url+"/Approve_Rto/upload",
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
              var list = obj.result.tracking_number;
              var list_item = []
                 for(let i:number = 0; i < list.length; i++)
                    {      
                      list_item.push(list[i]);
                    }
                     for(let i:number = 0; i < list_item.length; i++)
                     {
                       list_item[i].num = i;
                       list_item[i].checked = true; 
                     }
                    console.log(list_item);

                    var x =  list_item.filter((value,index) => list_item.indexOf(value) === index)
                   list_item = x;
                   console.log(list_item); 
                   if(this.list[0] != '')
                   {
                     this.list = this.list.concat(list_item);
                   }
                   else
                   {
                     this.list = list_item;
                   }
                   this.changeSelection();

             // this.list = this.list.concat(list);
              this.tostr.success(obj.message);
              this.Loader = this.loader.hide(); 
              this.close_modal(); 
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
}

list_data:any;
list:any[] = [];
templist:any;
search_track()
{
  var json = 
  {
      tracking_number:this.tracking_number,
  }
  this.client.search_rto_tracking(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
       //this.file = obj.result;
        this.Loader = this.loader.hide();
        this.list_data = obj.result;
        //var temp = this.list;
        for(let i:number = 0; i < this.list_data.length; i++)
        {      
          this.list.push(this.list_data[i]);
           //this.templist = temp[i];
        }
         for(let i:number = 0; i < this.list.length; i++)
         {
           this.list[i].num = i;
           this.list[i].checked = true; 
         }
       // console.log(this.list);

        var x =  this.list.filter((value,index) => this.list.indexOf(value) === index)
       this.list = x;
       console.log(this.list); 

        this.changeSelection();
      }
      else{
        this.tostr.error(obj.message);
        this.Loader = this.loader.hide();
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
      this.check = [];
     var num:number;
       var a =  this.list.filter(item => item.checked == true);
       for(let i:number = 0; i < a.length; i++)
       {
         num = a[i].client_consignment_id;
         this.check.push(num);
       }
       var x =  this.check.filter((value,index) => this.check.indexOf(value) === index)
       this.check = x;
       console.log(this.check); 
  }

  download_repor()
  {
    var json = {
      consignment_ids:this.check
    }
    this.client.approve_rto_download(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.tostr.success(obj.message);
        this.xls.exportAsExcelFile(obj.result,"file")
      }
      else{
        this.tostr.error(obj.message);
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }


maniflag:any = 0;
creat_batch()
{
  var json =
  {
    consignment_ids:this.check,
  }
  this.client.app_rto_batch(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.maniflag = 1;
        this.tostr.success(obj.message);
        
      }
      else{
        this.tostr.error(obj.message);
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

dowbload_mainfest()
{
  var json = {
      consignment_ids:this.check,
  }
  this.client.app_rto_manifest(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) {
        this.maniflag = 0;
        this.tostr.success(obj.message);
        window.open(obj.result);  
      
      }
      else{
        this.tostr.error(obj.message);
        this.Loader = this.loader.hide();
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
}

delete(id)
{

    for(let i:number = 0; i < this.list.length; i++)
    {
      //console.log(this.list[i])
      if(id == this.list[i].num)
      {
        //alert("enter in loop")
        this.list.splice(i);
        console.log("deleted Sucesfully")
      }
    }
}

}
