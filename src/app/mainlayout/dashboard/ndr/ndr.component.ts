import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/alert';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { DateFormatService } from 'src/app/services/date-format.service';
interface IRange {
  value: Date[];
  label: string;
}

@Component({
  selector: 'app-ndr',
  templateUrl: './ndr.component.html',
  styleUrls: ['./ndr.component.css']
})
export class NdrComponent implements OnInit {

   ranges: IRange[] = [
    {
      value: [new Date(), new Date(new Date().setDate(new Date().getDate() - 1))],
      label: 'Yesterday'
    },
    {
      value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
      label: 'Last 7 Days'
    },
     {
      value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
      label: 'Last 30 Days'
     },
     {
      value: [new Date(new Date().setDate(new Date().getDate() - 90)), new Date()],
      label: 'Last 90 Days'
     },
    
  ];

  Loader: string;
  ndr_to_days: any[]=[];
  rto_ratio_shipayaari_wise:any[] = [];
  del_ratio_shipayaari_wise:any[] = [];
  all_data:any[]=[];
  online_data:any[]=[];
  cod_data:any[]=[];
  dl_ratio_seller:any[]=[];
  rto_ratio_seller:any[]=[];
  total_ndr:any;
  send_sms:any;
  seller_action:any;
  call:any;
  DATERANGE:any;

  constructor(
    private client:ClientService , 
    private route:ActivatedRoute , 
    private router: Router ,
    private alertService: AlertService,
    private loader:LoaderService,
    private datechange:DateFormatService,
  ) { }

  ngOnInit(): void {
    this.getNdrData();
  }

  go_to_ndr(){this.router.navigate(['/ndr/']);}
go_to_rto(){this.router.navigate(['/rto/']);}
go_to_tracking(){this.router.navigate(['/tracking/']);}

go_to_home()
{
  this.router.navigate(['/dashboard/']);
}


  getNdrData()
  {
    this.Loader=this.loader.show();
    let json:any ={
      to_date:this.to_date,
      from_date:this.from_date,
    };
    this.client.GetNdrDash(json).subscribe((data: any) => {
      var response = data._body;
      var obj = JSON.parse(response);
      if (obj.status == 200) 
      {
         this.DATERANGE=obj.result.datestring;
         this.form.setValue({
           "Drange":obj.result.datestring,
         })
        this.Loader=this.loader.hide();
        this.total_ndr=obj.result.tile_info_ndr.total_ndr.cnt;
        this.send_sms=obj.result.tile_info_ndr.send_sms.cnt;
        this.seller_action=obj.result.tile_info_ndr.seller_action.cnt;
        this.call=obj.result.tile_info_ndr.call.cnt;

        if (obj.result.all_table_data.couier_wise_days[0]==undefined){}
        else{
          this.ndr_to_days=obj.result.all_table_data.couier_wise_days;
        }
        if (obj.result.all_table_data.rto_ratio[0]==undefined){}
        else{
          this.rto_ratio_shipayaari_wise=obj.result.all_table_data.rto_ratio;
        }
        if (obj.result.all_table_data.dl_ratio[0]==undefined){}
        else{
          this.del_ratio_shipayaari_wise=obj.result.all_table_data.dl_ratio;
        }
        if (obj.result.all_table_data.couier_wise_all[0]==undefined){}
        else{
          this.all_data=obj.result.all_table_data.couier_wise_all;
        }
        if (obj.result.all_table_data.couier_wise_online[0]==undefined){}
        else{
          this.online_data=obj.result.all_table_data.couier_wise_online;
        }
        if (obj.result.all_table_data.couier_wise_cod[0]==undefined){}
        else{
          this.cod_data=obj.result.all_table_data.couier_wise_cod;
        }
        if (obj.result.all_table_data.dl_ratio_seller[0]==undefined){}
        else{
          this.dl_ratio_seller=obj.result.all_table_data.dl_ratio_seller;
        }
        if (obj.result.all_table_data.rto_ratio_seller[0]==undefined){}
        else{
          this.rto_ratio_seller=obj.result.all_table_data.rto_ratio_seller;
        }  
       
      }
      else
      {
        this.Loader=this.loader.hide();
      }
      if(obj.message.includes("authToken"))
      {
        this.router.navigate(['/signin/'+obj.message]);
      }
    });
  }

form = new FormGroup({
    Drange: new FormControl()
  });

 to_date:any;
 from_date:any;
  showdash()
 {
     
  var daterange:any; 
    var temp:any = this.form.get('Drange').value;   
    daterange = this.datechange.changeDateFormate(temp);     
    this.to_date = daterange[1];
    this.from_date = daterange[0];
    console.log(this.to_date+' '+this.from_date );  
     this.getNdrData();  
 }

}
