import { Router, NavigationStart } from '@angular/router';  
import { Observable, Subject } from 'rxjs'; 
import { Injectable } from '@angular/core';
import { Toastr, ToastrType } from './toastr.model'; 

@Injectable({ providedIn: 'root' })
export class ToastrService {
	public subject = new Subject<Toastr>();  
    public keepAfterRouteChange = true;  
  
    constructor(public router: Router) {  
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true  
        router.events.subscribe(event => {  
            if (event instanceof NavigationStart) {  
                if (this.keepAfterRouteChange) {  
                    // only keep for a single route change  
                    this.keepAfterRouteChange = false;  
                } else {  
                    // clear alert messages  
                    this.clear();  
                }  
            }  
        });  
    }  
  
    getAlert(): Observable<any> {  
        return this.subject.asObservable();  
    }  
  
    success(message: string, keepAfterRouteChange = false) {  
        this.showNotification(ToastrType.Success, message, keepAfterRouteChange);  
    }  
  
    error(message: string, keepAfterRouteChange = false) {  
        this.showNotification(ToastrType.Error, message, keepAfterRouteChange);  
    }  
  
    info(message: string, keepAfterRouteChange = false) {  
        this.showNotification(ToastrType.Info, message, keepAfterRouteChange);  
    }  
  
    warn(message: string, keepAfterRouteChange = false) {  
        this.showNotification(ToastrType.Warning, message, keepAfterRouteChange);  
    }  
  
    showNotification(type: ToastrType, message: string, keepAfterRouteChange = false) {  
        this.keepAfterRouteChange = keepAfterRouteChange;  
        this.subject.next(<Toastr>{ type: type, message: message });  
    }  
  
    clear() {  
        this.subject.next();  
    } 
}