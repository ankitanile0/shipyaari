import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

import { ActivatedRoute,Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


declare var $ :any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  url='';
  constructor(
  	  private client:ClientService, 
  	   private route:ActivatedRoute, 
  	     private router: Router,
  	) { }

  ngOnInit(): void {
    this.extractPath(this.router.url);
   this.router.events.subscribe((event: Event) => {

            if (event instanceof NavigationStart) {
              try{
                this.extractPath(event.url);
             
                // Show loading indicator
                }
                catch(e){

                }
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator

                // Present error to user
                console.log(event.error);
            }
        });
  }
  extractPath(url){
  this.url = url.split('/')[1];
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
