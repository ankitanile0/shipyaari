import { Component, OnInit } from '@angular/core';
import { Toastr, ToastrType } from './toastr.model'; 
import { ToastrService } from './toastr.service';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css']
})
export class ToastrComponent implements OnInit {
	toastr:ToastrType[] = [];

  constructor(
  	public toastrService: ToastrService
  	) { }

   ngOnInit() {  
        this.toastrService.getAlert().subscribe((alert: ToastrType) => {  
            this.toastr = [];  
            if (!alert) {  
                this.toastr = [];  
                return;  
            }  
            this.toastr.push(alert);  
            setTimeout(() => {  
                this.toastr = this.toastr.filter(x => x !== alert);  
            }, 3000);  
        });  
    }  

   removeNotification(toastr: ToastrType) {  
        this.toastr = this.toastr.filter(x => x !== toastr);  
    } 

   /**Set css class for Alert -- Called from alert component**/      
    cssClass(data: Toastr) {  
        if (!data) {  
            return;  
        }  
        switch (data.type) {  
            case ToastrType.Success:  
                return 'toast-success';  
            case ToastrType.Error:  
                return 'toast-error';  
            case ToastrType.Info:  
                return 'toast-info';  
            case ToastrType.Warning:  
                return 'toast-warning';  
        }  
    }  

}
