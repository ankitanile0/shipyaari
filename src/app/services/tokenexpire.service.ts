import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class TokenexpireService {
  
message:String = "App Token Was Expired Please Login Again !!"

    constructor(
        private router: Router,
    ){}

    tokenExpire(msg:any)
    {
        if(msg.includes("Invalid authToken"))
         {
           this.router.navigate(['/signin/'+this.message]);
         }
    }
}