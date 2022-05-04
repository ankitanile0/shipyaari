import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';

@Component({
  selector: 'app-label-setting',
  templateUrl: './label-setting.component.html',
  styleUrls: ['./label-setting.component.css']
})
export class LabelSettingComponent implements OnInit {

  Loader:string;
  labeldata:any;
  labelvalue:any[]=[];
  list:any;
  label_type:any;
  pickup_address:any;
  pickup_contact:any;
  gst_no:any;
  resturn_addres:any;
  return_contact:any;

label_type_number:any;

lbl1:any;
lbl2:any;
lbl3:any;
lbl4:any;
lbl5:any;
lbl6:any;
lbl7:any;
lbl8:any;
lbl9:any;
  constructor(
      private fb:FormBuilder,
      private client:ClientService, 
      private route:ActivatedRoute, 
      private router: Router,
      private alertService: AlertService,
      private tokenExpired: TokenexpireService,  
      private http: HttpClient,
      private tostr:ToastrService,
      private loader:LoaderService 
  ) { }

  ngOnInit(): void {
      this.viewpage();
  }

go_to_label_setting(){this.router.navigate(['/labelsetting/']);} 
go_to_change_pass(){this.router.navigate(['/changepassword/']);}

  viewpage()
  {
    var json = 
    {      
    }
    this.client.labelData(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);

      if (obj.status == 200) {           
        this.labeldata=obj.result;  
        this.list = obj.result.array_lable_value;
         this.pickup_address = obj.result.checkboxselectvalue.sel_Pickup_Address;
         this.pickup_contact= obj.result.checkboxselectvalue.sel_Pickup_Phone_Number;
         this.gst_no= obj.result.checkboxselectvalue.sel_GST_No;
         this.resturn_addres= obj.result.checkboxselectvalue.sel_Return_Address;
         this.return_contact= obj.result.checkboxselectvalue.sel_Return_Phone_Number;
         this.label_type_number = obj.result.label_type;

         var lab_type = this.label_type_number;
         if(lab_type == 1){ this.lbl1 = true; } else { this.lbl1 = false}console.log(this.lbl1)
         if(lab_type == 2){ this.lbl2 = true; } else { this.lbl2 = false}console.log(this.lbl2)
         if(lab_type == 3){ this.lbl3 = true; } else { this.lbl3 = false}console.log(this.lbl3)
         if(lab_type == 4){ this.lbl4 = true; } else { this.lbl4 = false}console.log(this.lbl4)
         if(lab_type == 5){ this.lbl5 = true; } else { this.lbl5 = false}console.log(this.lbl5)
         if(lab_type == 6){ this.lbl6 = true; } else { this.lbl6 = false}console.log(this.lbl6)
         if(lab_type == 7){ this.lbl7 = true; } else { this.lbl7 = false}console.log(this.lbl7)
         if(lab_type == 8){ this.lbl8 = true; } else { this.lbl8 = false}console.log(this.lbl8)
         if(lab_type == 9){ this.lbl9 = true; } else { this.lbl9 = false}console.log(this.lbl9)

        var check1 = this.pickup_address;
        var check2 = this.pickup_contact;
        var check3 = this.gst_no;
        var check4 = this.resturn_addres;
        var check5 = this.return_contact;

        if(check1 == 1){this.pickup_address = true} else {this.pickup_address = false}
        if(check2 == 2){this.pickup_contact = true} else {this.pickup_contact = false}
        if(check3 == 3){this.gst_no = true} else {this.gst_no = false}
        if(check4 == 4){this.resturn_addres = true} else {this.resturn_addres = false}
        if(check5 == 5){this.return_contact = true} else {this.return_contact = false}

      }else{       
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }
    });
  }

  label_value:any;
  saveLabel()
  {
    var temp = [];
    var count:number = 0;
    var data = [this.pickup_address, this.pickup_contact, this.gst_no, this.resturn_addres, this.return_contact];
    for(let i :number = 0; i < data.length; i++)
    {
      count++;
      if(data[i] == true)
      {
        temp.push(count);
        // console.log(temp)
      }
      
    }
    this.label_value = temp;
   // console.log(this.label_value);
   var json ={
     value:this.label_value,
   }
   this.client.updatelabelValue(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {        
        this.tostr.success(obj.message);
        this.viewpage();
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

change_label(num)
{
  if(confirm("Are you sure to Change the Label ?")) {   
 
    var json =
    {
        label_type:num,
    }
    this.client.change_lbl(json).subscribe((data: any) => {
        var response = data._body;
        var obj = JSON.parse(response);
        console.log(obj);
        if (obj.status == 200) {        
          this.tostr.success(obj.message);
          this.viewpage();
        }else
        {
          this.tostr.error(obj.message);
          if(obj.message.includes("authToken"))
            {
              this.router.navigate(['/signin/'+obj.message]);
            }
        }    
      });
  }else{
    return false;
  }

}


pincodedata:any;
downloadpincode()
  {
    //alert("hi");
    let json:any ={};
    this.client.downloadpincode(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      console.log(obj);
      if (obj.status == 200) {          
           this.pincodedata=obj.result;
           //window.open(this.pincodedata); 
           window.open("https://seller.shipyaari.com/angularapi/pincode_download"); 
      }else{
        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }



}
