import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { LoaderService } from 'src/app/services/loader.service';
import { TokenexpireService } from 'src/app/services/tokenexpire.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'src/app/_toastr/toastr/toastr.service';
import { RatingConfig } from 'ngx-bootstrap/rating'; 
import { ConfService } from './conf.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  // changeText: boolean;

  userdata:any;
  Loader:string;
  full_name:any;
  user_id:any;
  user_email:any;
  rating:any = null;
  comments:any = null;
  max = 5;
  rate = 1;
  isReadonly = false;
  modulename:any = '';
  submodulename:any = '';
    feedbacklistvalue:any;
    value:any;
  constructor(

  	private fb:FormBuilder,
    private client:ClientService, 
    private route:ActivatedRoute, 
    private router: Router,
    private alertService: AlertService,
    private tokenExpired: TokenexpireService,  
    private http: HttpClient,
    private tostr:ToastrService,
     private loader:LoaderService,
     private config: ConfService 
  	) {

      // this.changeText = false;

     }

  ngOnInit(): void {
    this.userdetails();
    this.feedbackList();
    console.log(this.modules);
  } 
  userdetails()
  {
    this.Loader = this.loader.show();   
    let json:any ={};
    this.client.feedpagedata(json).subscribe((data: any) => {
       this.Loader = this.loader.hide();   
      var response = data._body;
      var obj = JSON.parse(response);
     // console.log(obj);
      if (obj.status == 200) {        
        this.userdata=obj.result.user_details; 
        this.user_id = obj.result.user_details.user_id;
        this.full_name = obj.result.user_details.full_name;
        this.user_email = obj.result.user_details.email;
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }
  ratingData(value){
    //alert(value);
    if(value == 1){ this.emo1 = 1; this.emo2 = 0; this.emo3 = 0; this.emo4 = 0; this.emo5 = 0;}
    if(value == 2){ this.emo1 = 0; this.emo2 = 1; this.emo3 = 0; this.emo4 = 0; this.emo5 = 0;}
    if(value == 3){ this.emo1 = 0; this.emo2 = 0; this.emo3 = 1; this.emo4 = 0; this.emo5 = 0;}
    if(value == 4){ this.emo1 = 0; this.emo2 = 0; this.emo3 = 0; this.emo4 = 4; this.emo5 = 0;}
    if(value == 5){ this.emo1 = 0; this.emo2 = 0; this.emo3 = 0; this.emo4 = 0; this.emo5 = 5;}
    this.rating1 = value;
  }

  feedbackList()
  {
    let json:any ={     
    };
    this.client.feedbacklists(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);     
      if (obj.status == 200) { 
        this.feedbacklistvalue=obj.result.feedbacklist;         
      }else{        
        if(obj.message.includes("authToken"))
        {
          this.router.navigate(['/signin/'+obj.message]);
        }
      }      
    });
  }

  savefeedback(up)
  {
    if(this.rating1 != null)
    {
      if(this.modulename != '')
      {
          if(this.comments != null)
           {
             this.Loader = this.loader.show();
            let json:any ={
              user_id:this.user_id,
              full_name:this.full_name,
              user_email:this.user_email,    
              rating:this.rating1,
              comments:this.comments,
              module_name:this.modulename,
              sub_module_name:this.submodulename
            };
            this.client.submitfeedbackdata(json).subscribe((data: any) => {
              var response = data._body;
              var obj = JSON.parse(response);
              console.log(obj);
              if (obj.status == 200) {        
                this.Loader = this.loader.hide();
                this.feedbackList();
                this.tostr.success(obj.message);
                this.emo1 = 0;
                this.emo2 = 0;
                this.emo3 = 0;
                this.emo4 = 0;
                this.emo5 = 0;
                this.comments=null;
                this.rating1=null;
              }else
              {
                this.Loader = this.loader.hide();
                this.alertService.error(obj.message);
                this.tostr.error(obj.message);
                if(obj.message.includes("authToken"))
                  {
                    this.router.navigate(['/signin/'+obj.message]);
                  }
              }    
            });
           }
           else
           {
              this.tostr.error("Please enter comment !!");
           }
      } 
      else
      {
        this.tostr.error("Please select module name !!");
      }
    }
    else
    {
      this.tostr.error("Please select emoji !!");
    }
    
   
  }

  confirmSelection(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.key === 'Enter') {
      this.isReadonly = true;
    }
  }
 
  resetStars() {
    this.rate = 0;
    this.isReadonly = false;
  }

  starList: boolean[] = [false,true,true,true,true];       // create a list which contains status of 5 stars
  rating1:any = null;  
  //Create a function which receives the value counting of stars click, 
  //and according to that value we do change the value of that star in list.
  setStar(data:any){
        this.rating1=data+1;                               
        for(var i=0;i<=4;i++){  
          if(i<=data){  
            this.starList[i]=false;  
          }  
          else{  
            this.starList[i]=true;  
          }  
       }  
   } 
  addsubmodule(value){
    var a:any = ( < HTMLInputElement > document.getElementById('main')).value;
    //alert(a);
  }



sub_module:any = '';
submodule_name:any;
selectedModule()
{
  this.sub_module = [];
  for(let i:number = 0; i < this.modules.length; i++)
  {
    if(this.modulename == this.modules[i].name)
    {
      this.sub_module = this.modules[i].submodule;

     
    }
  }

  

  console.log(this.sub_module);
}

  modules:any = [{
      "id": "1",
      "name": "Overall",
      "value": "Overall",
      "submodule": []
    },
    {
      "id": "2",
      "name": "Overview",
      "value": "Overview",
      "submodule": [{
          "id": "1",
          "name": "Dashboard",
          "value": "Dashboard"
        },
        {
          "id": "2",
          "name": "NDR",
          "value": "NDR"
        },
        {
          "id": "3",
          "name": "Tracking",
          "value": "Tracking"
        },
        {
          "id": "4",
          "name": "RTO",
          "value": "RTO"
        }
      ]
    },
    {
      "id": "3",
      "name": "Smart Shipyaari",
      "value": "Smart Shipyaari",
      "submodule": [{
          "id": "1",
          "name": "Template",
          "value": "Template"
        },
        {
          "id": "2",
          "name": "Address Book",
          "value": "Address Book"
        },
        {
          "id": "3",
          "name": "Module",
          "value": "Module"
        }
      ]
    },
    {
      "id": "4",
      "name": "Orders",
      "value": "Orders",
      "submodule": [{
          "id": "1",
          "name": "Add Orders",
          "value": "Add Orders"
        },
        {
          "id": "2",
          "name": "B2B Shipment",
          "value": "B2B Shipment"
        },
        {
          "id": "3",
          "name": "Add Bulk",
          "value": "Add Bulk"
        },
        {
          "id": "4",
          "name": "All Orders",
          "value": "All Orders"
        },
        {
          "id": "5",
          "name": "Channel Orders",
          "value": "Channel Orders"
        }
      ]
    },
    {
      "id": "5",
      "name": "Trackings",
      "value": "Trackings",
      "submodule": [{
          "id": "1",
          "name": "Tracking",
          "value": "Tracking"
        },
        {
          "id": "2",
          "name": "Approve RTO",
          "value": "Approve RTO"
        },
        {
          "id": "3",
          "name": "Approve Pickup",
          "value": "Approve Pickup"
        }
      ]
    },
    {
      "id": "6",
      "name": "Billing",
      "value": "Billing",
      "submodule": [{
          "id": "1",
          "name": "COD",
          "value": "COD"
        },
        {
          "id": "2",
          "name": "All invoice",
          "value": "All invoice"
        },
        {
          "id": "3",
          "name": "Download Reports",
          "value": "Download Reports"
        }
      ]
    },
    {
      "id": "7",
      "name": "Plans",
      "value": "Plans",
      "submodule": []
    },
    {
      "id": "8",
      "name": "Setting",
      "value": "Setting",
      "submodule": [{
          "id": "1",
          "name": "Label Setting",
          "value": "Label Setting"
        },
        {
          "id": "2",
          "name": "Change Password",
          "value": "Change Password"
        },
        {
          "id": "3",
          "name": "Download Pincode",
          "value": "Download Pincode"
        }
      ]
    },
    {
      "id": "9",
      "name": "Help",
      "value": "Help",
      "submodule": [{
          "id": "1",
          "name": "Support Ticket",
          "value": "Support Ticket"
        },
        {
          "id": "2",
          "name": "Agreement",
          "value": "Agreement"
        }
      ]
    }
  ]


  emo1:any = 0;
  emo2:any = 0;
  emo3:any = 0;
  emo4:any = 0;
  emo5:any = 0;
  


  // feed_click1()
  // {
  //   this.emo1 = 1;
  //   this.emo2 = 0;
  //   this.emo3 = 0;
  //   this.emo4 = 0;
  //   this.emo5 = 0;
    
  // }

  // feed_click2()
  // {
  //   this.emo1 = 0;
  //   this.emo2 = 1;
  //   this.emo3 = 0;
  //   this.emo4 = 0;
  //   this.emo5 = 0;
   
  // }

  // feed_click3()
  // {
  //   this.emo1 = 0;
  //   this.emo2 = 0;
  //   this.emo3 = 1;
  //   this.emo4 = 0;
  //   this.emo5 = 0;
   
  // }

  // feed_click4()
  // {
  //   this.emo1 = 0;
  //   this.emo2 = 0;
  //   this.emo3 = 0;
  //   this.emo4 = 1;
  //   this.emo5 = 0;
   
  // }

  // feed_click5()
  // {
  //   this.emo1 = 0;
  //   this.emo2 = 0;
  //   this.emo3 = 0;
  //   this.emo4 = 0;
  //   this.emo5 = 1;
   
  // }  

}

