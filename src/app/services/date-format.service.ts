import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor(
    private datePipe: DatePipe
  ) { }
  public changeDateFormate(date: any): void {
    var date_range:any = [];
    var sample_data = []
    sample_data = date;    
    var date1=sample_data[0];
    var date2=sample_data[1];
    date1 = date1.toString();
    date2 = date2.toString();
    var to_date = date1.split(" ");
    var from_date = date2.split(" ");
    var todate  = to_date[2]+" "+to_date[1]+" "+to_date[3];
    var fromdate  = from_date[2]+" "+from_date[1]+" "+from_date[3];     
 
    date_range.push(todate = this.datePipe.transform(todate, 'yyyy-MM-dd'));
    date_range.push(fromdate = this.datePipe.transform(fromdate, 'yyyy-MM-dd'));
    //console.log(date_range);
    return date_range;
  }
}
