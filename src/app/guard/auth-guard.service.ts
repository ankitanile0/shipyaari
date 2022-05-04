import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ClientService } from '../services/client.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: ClientService, public router: Router) {}
  canActivate() : boolean {
  	return (localStorage.getItem('token') != null) ? true : false;
  }
  
   
}