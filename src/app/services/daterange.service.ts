import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaterangeService {

  constructor() { }

date_split(data)
{
	var temp:string = data;
	var strin:string  = JSON.stringify(temp)
	var replacedata = strin.replace(/[{()}]/g, '');
	    replacedata  = replacedata.replace(/['"]+/g, '');
	    replacedata  = replacedata.replace("[", '');
	    replacedata  = replacedata.replace("]", '');
	    var a  = replacedata.split('T');
	   var b = a[1].split(',');
	   // this.end_date =  b[1];
	   // this.start_date = a[0];
	   return [b[1],a[0]]
}


}
