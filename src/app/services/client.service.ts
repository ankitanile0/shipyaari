import { Injectable } from '@angular/core';
import { HttpClientModule , HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";
//import { Http, RequestOptions, Headers } from "@angular/http";
import { Http, Headers, RequestOptions, Response } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl: any;

constructor(
private http: Http,
//private config: Config,
private router:  Router
)
 {
   this.apiUrl = 'https://seller.shipyaari.com/angularapi';
   localStorage.setItem('apiurl',this.apiUrl);
  }


  Login(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/login", data, options);
  }

  register(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/ClientRegistration/signupviewpage" , data , options);
  }

  cleint_register(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/ClientRegistration" , data , options);
  }

  getProfile(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile" , data , options);
  }

  Logout(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/logout", data, options);
  }

  change_profile_pic(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile/updateprofilepic", data, options);
  }

//common

getAddressBypin(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/getAddressBypin", data, options);
}

get_country(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/countrylist", data, options);
}

get_state(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/stateListByCountryId", data, options);
}

get_city(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/getCityByStateId", data, options);
}

get_service(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/servicelist", data, options);
}

get_weight(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/pricelist", data, options);
}

get_partner_list()
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/courierlist",  options);
}

get_status_list()
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/orderstatus",  options);
}

//common End

//headers api start 
header_data(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController" , data , options );
  }

  check_Pin(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/checkpincode" , data , options );
  }

   Track_Data(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/tracking_details" , data , options );
  }

   today_transaction(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/dailytrasction" , data , options );
  }

   redeem_points(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/redeem_points" , data , options );
  }

  search_Service(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/search_service_client_dashboard" , data , options );
  }

  fetch_amount(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/amountforwallet" , data , options );
  }
  
  fetch_data_for_wallet(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/fetdataforrechagewallet" , data , options );
  }

  adjust_cod(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/cod_wallet_rechages" , data , options );
  }

  fetch_passbook(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/view_passbook" , data , options );
  }
  
//end


  //   dashboard(data) {
  //   let headers = new Headers({
  //     "Content-Type": "application/json",
  //     "Authorization":localStorage.getItem("token")
  //   });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post(this.apiUrl + "/dashboard" , data , options );
  // }

dashboard(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/dashboard/dashboardview" , data , options );
}

dashboard2(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/dashboard/dashbardfirstscroll" , data , options );
}

dashboard3(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/dashboard/dashbardsecondscroll" , data , options );
}




  GetNdrDash(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/ndrdashboard" , data , options );
  }

  dashboard_tracking(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackingdashboard" , data , options );
  }

   dashboard_tracking1(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackingdashboard/trackingdashview" , data , options );
  }

   dashboard_tracking2(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackingdashboard/trackingdashfirstscroll" , data , options );
  }

   dashboard_tracking3(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackingdashboard/trackingdashsecscrol" , data , options );
  }

  dashboard_rto(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/rtodashboard" , data , options );
  }

  updating_bank_details(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile/updatebankdetails" , data , options);
  }

  updating_communication_details(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile/updatecommunicatndetails" , data , options);
  }

  for_upadating_kyc_details(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile/updatekycdetails" , data , options);
  }

  sms_template_of_profile(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/updatesmstemplatedetails" , data , options);
  }

  my_rewards(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/myrewards" , data , options );
  }

  my_coupouns(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/mycoupouns" , data , options );
  }

  updating_marketing_details(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/updatemarketingdetails" , data , options);
  }

  subscription_receipt(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile/generatereceipt" , data , options);
  }

   subscription_invoice(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile/generateinvoice" , data , options);
  }

  Increase_Limit(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/profile/checkCrLimit" , data , options);
  }

  smartshipyaari_template(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template" , data , options );
  }

  Addtemplate(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template/addtemplate" , data , options );
  }

   smartshipyaari_addressbook(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook" , data , options );
  }

  delete_add_book_delivery(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook/deleteaddr" , data , options );
  }

  template_Delete(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template/deletetemplate" , data , options );
  }

   template_details(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template/viewtemplatedetails" , data , options );
  }

    upload_template_Sheet(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template/uploadtemplatesheet" , data , options );
  }

    viewDetailsAddressBook(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook/viewaddrmodal" , data , options );
  }

  ActiveDeactiveAddBook(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook/changeAddressStatus" , data , options );
  }

module_channel(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/moduleschannels" , data , options );
}
  

  update_template(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template/updatetemplate" , data , options );
  }

  Add_Order(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template/updatetemplate" , data , options );
  }

   update_pick_add(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook/updatepickupaddr" , data , options );
  }

 update_Del_add(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook/updatedeliveryaddr" , data , options );
  }

  add_pickup_Address(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook/addpickupaddr" , data , options );
  }

   add_delivery_Address(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addressbook/adddeliveryaddr" , data , options );
  }

//orderlist all apiUrl
get_order_data(data)
{
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/addorderviewpage" , data , options );
}

del_add_details(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/deliveryDetailsBySelect" , data , options );
}

del_add_details_mobile(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/autofillbymobileno" , data , options );
}


pick_add_details(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/pickpIncodeInfo" , data , options );
}

templatelist(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/templatelist" , data , options );
}

template_data(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/templatedetailById" , data , options );
}

 All_orders(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/OrderList" , data , options );
  }

  download_b2b_sample(data)
  {
      let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/b2bmodaldata" , data , options );
  }

  download_b2c_sample(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/b2cmodaldata" , data , options );
  }

  channel_orders(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder" , data , options );
  }

  Tracking(data) {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings" , data , options );
  }

  get_orderRadio(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/create_ship_service" , data , options );
  }

  save_temp(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Ordercommondata/save_template" , data , options );
  }

  cancel_Shipment(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/cancel_shipment" , data , options );
  }

  get_ser_partRadio(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/user_service_partner_by_service" , data , options );
  }

  fetch_rate_order(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/fetchrate" , data , options );
  }

  add_order(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/createconsignment" , data , options );
  }

   add_b2b_order(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/B2bshipments/create_b2b_consignment" , data , options );
  }

  get_add_bulk_data(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk" , data , options );
  }

  edit_bulk(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/bulk_data" , data , options );
  }

  bulkmodal_data(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk/successpopupmodaldata" , data , options );
  }

  process_bulk_order(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk/process_shipment" , data , options );
  }

   dowload_bulk_order(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk/download_bulk_data" , data , options );
  }

  download_menifest(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk/manifest_bulk" , data , options );
  }

  download_bulk_label(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk/label_bulk" , data , options );
  }

  download_bulk_csv(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk/csv_sheet" , data , options );
  }
  
 send_to_client(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/addbulk/send_client" , data , options );
  }

  ready_to_ship_label(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/common_labelfn_new" , data , options );
  }

  all_order_label(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/common_labelfn" , data , options );
  }

  fetc_duplicate(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/duplicate_shipment" , data , options );
  }

  channel_order_fetch_add(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/get_address_details" , data , options );
  }

  update_Del_Address(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/update_address" , data , options );
  }

 Channel_ship_now(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/ship_now" , data , options );
  }

  order_details_modal(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/consignmentdetailsById" , data , options );
  }

  get_track_details(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Tracking_orders/trackShipment" , data , options );
  }

  submit_notify(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Tracking_orders/report_submit" , data , options );
  }

  update_mobile(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Tracking_orders/sendUpdateMobileotp" , data , options );
  }

  verify_otp(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Tracking_orders/validateMobileOtp" , data , options );
  }
  
  buy_it_again(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Tracking_orders/buy_it_again" , data , options ); 
  }

ready_pick_manifest(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/print_excel_pickup_file" , data , options ); 
} 

ready_pick_label(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/bulk_label_comman" , data , options ); 
}

ready_pick_rem_batch(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/remove_batch_comman" , data , options ); 
}

ready_pick_getlabel(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/bulk_invoice_download" , data , options );
}

ready_pick_getdetail(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/ready_to_ship_details" , data , options );
}

ready_ship_down_lbl(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/bulk_label_download" , data , options );
}

ready_ship_shipnow(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/ready_to_pick_bulk" , data , options );
}

ready_ship_manilabelFetch(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/menifestAndLebelSamplefile" , data , options );
}


ready_ship_printExcel(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/print_excel_file" , data , options );
}

ready_ship_manifestData(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/manifestdata" , data , options );
}

ready_ship_commonId(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/ready_to_ship_collect" , data , options );
}

ready_ship_bulk_batch(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/ready_to_pick_bulk" , data , options );
}

manifest_bulk(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/bulk_manifest_download" , data , options );
}

in_proces_errorsheet(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/error_bulk_download_new" , data , options ); 
}

in_process_clear(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/clear_bulk_record" , data , options ); 
}

in_process_update(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/edit_update_rec" , data , options ); 
}

channe_remove_order(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/remove_bulk_order" , data , options );
}

channel_process(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/addbullk" , data , options );
}

channel_push(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/pushdata" , data , options );
}

channel_sync(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/sync_orders" , data , options );
}

channel_ship_modal(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/channelorder/ship_order_modal" , data , options );
}

reverse_shipment(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/reverse_shipment" , data , options );
}

tracking_List(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings" , data , options );
}

exception_filter(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/ndrtypwise" , data , options );
}

tracking_followp(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/ndrfollowupcycle" , data , options );
}

tracking_report(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/trackingReportdatewise" , data , options );
}

tracking_add_remark(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/add_comment" , data , options );
}

download_ndr_excel(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/download_ndr" , data, options );
}

approve_rto(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Approve_Rto" , data , options );
}

search_rto_tracking(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Approve_Rto/search_tracking_status" , data , options );
}

approve_rto_download(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Approve_Rto/downloadSheetData" , data , options );
}

app_rto_batch(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Approve_Rto/bulkCreatBatch" , data , options );
}

report_ndr(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/download_ndr" , data , options );
}

exception_comment(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/add_comment" , data , options );
}

tracking_pin_report(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/export_pincode_bulk" , data , options );
}

tracking_pin_export(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/trackings/export_pincode" , data , options );
}

AgreementList(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Agreements/agreemasterlist" , data , options );
  }
  downloadAgr(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Agreements/masterpagedownpdf" , data , options );
  }
  AgreementTypeList(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Agreements/agreemasterTypeList" , data , options );
  }
  AgreementTypeVerList(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Agreements/agreeTypeVerList" , data , options );
  }
  AgreementTypeVerCotList(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Agreements/agreeTypeVerContentList" , data , options );
  }
  
  accept_all_point(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Agreements/accept_all_point" , data , options );
  }
  feedpagedata(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/feedback" , data , options );
  }
  submitfeedbackdata(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/feedback/save_feedback" , data , options );
  }

  changePassword(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Change_password" , data , options );
  }
  downloadpincode(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/pincode_download" , data , options );
  }

  orderConfirmation(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation" , data , options );
  }
  labelData(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/LabelSettings" , data , options );
  }

  updatelabelValue(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/LabelSettings/labelvalue" , data , options );
  }

change_lbl(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/LabelSettings/changelabel" , data , options );
}

  codDetails(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/cod" , data , options );
  }


  downloadcoddatewise(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/cod/downloadcodrptdatwise" , data , options );
  }


  downloadcodSheetByRefNo(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/cod/cod_sheet" , data , options );
  }

  recoveryshipment(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/cod/recoveryshipment" , data , options );
  }

  checkAllTransaction(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/cod/checkalltransaction" , data , options );
  }

  serch_call_resord(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/booked_call_details" , data , options );
  }

  extention_setting(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/extensionSetting" , data , options );
  }

   extention_Details(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/myextensionDetails" , data , options );
  }

  con_order_clear_bulk_record(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/clear_bulk_record" , data , options );
  }

  order_con_viewdata(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/viewdetails" , data , options );
  }

   status_viewdata(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/showaction" , data , options );
  }

   order_con_delete(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/deletedetails" , data , options );
  }

   order_con_action(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/add_action" , data , options );
  }

  order_con_hold(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/hold_order_confirm" , data , options );
  }

   order_con_reject(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/reject" , data , options );
  }

   order_con_book(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/book_consignment" , data , options );
  }

   order_con_edit(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orderconfirmation/bulk_data" , data , options );
  }
 
 plan_data(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/plan" , data , options );
 }

 plan_list(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/plan/get_sub_plans" , data , options );
 }

 change_plan_type(data)
 {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/plan/changeplantype" , data , options );
 }

 plan_download_pdf(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/plan/downloadpdf" , data , options );
 }

 plan_term_cond(data)
 {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/common/terms" , data , options );
 }

Activate_plan(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/plan/bypasswallet" , data , options );
 }

 filter_date_passbook(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/get_trasction_details_search" , data , options );
 }

 export_passbook_sheet(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/get_trasction_details_export" , data , options );
 }

 fate_wise_fetch(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/checkDateTransaction" , data , options );
 }

 billingReport(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/reports" , data , options );
 }

 all_invoices(data)
 {
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/all_invoices" , data , options );
 }
 
 invoice_recept(data)
 {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/all_invoices/generate_coupon_receipt" , data , options );
 }





//support
support(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/support" , data , options );
}

all_ticket(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/support/view_all_support_tkts" , data , options );
}

get_support_type(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/support/get_support_type" , data , options );
}

get_issue_type(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/support/get_support_type_issue_desc" , data , options );
}

create_ticket(data)
{
  let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/support/create_support_tkt" , data , options );
}

view_ticket(data)
{
   let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/support/view_support_chat" , data , options );
}


moduleChannelList(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/moduleschannels" , data , options );
  }  
  viewChannelDetails(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/moduleschannels/viewData" , data , options );
  }  
  integrateChannel(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/moduleschannels/integrateChannel" , data , options );
  }
  updateChannelDetails(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/moduleschannels/updateChanel" , data , options );
  }
  
  deleteChannel(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/moduleschannels/channel_delete" , data , options );
  }

  approve_pickup(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/ApprovePickup" , data , options );
  }

  search_pickup_tracking(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/ApprovePickup/search_tracking_status" , data , options );
  }

  approve_pickup_download(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/ApprovePickup/downloadSheetData" , data , options );
  }

  app_pickup_batch(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/ApprovePickup/bulkCreatBatch" , data , options );
  }

  app_rto_manifest(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Approve_Rto/manifest" , data , options );
  }

    app_pickup_manifest(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/consignment_ids/manifest" , data , options );
  }

  searchbillingdata(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/all_invoices/downloadbillingrptdatwise" , data , options );
  }

   process_process(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/process_bulk" , data , options );
  }

  process_process_b2b(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/orders/process_bulk_b2b" , data , options );
  }

  upload_template(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/template/bulktemplatesheetupload" , data , options );
  }

  validate_coupone(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/validate_coupon" , data , options );
  }

  get_wallet_data(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/fetdataforrechagewallet" , data , options );
  }

  trasferto_wallet(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/HeaderController/transfer_wallet_to_balance" , data , options );
  }

  paytm_gateway(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Paytm_gateway/gettoken" , data , options );
  }

  forgot_password(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Authentications/forgetPassword" , data , options );
  }
  
  change_password_while_for(data)
  {
     let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Authentications/changepasswhilefor" , data , options );
  }
  synctemplate(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/Template/sync_other_details" , data , options );
  }
  invoicesdetails(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/all_invoices/invoicedetails" , data , options );
  }

  move_to_old(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/logout/login_link", data, options);
  }

  calculate_weight(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/all_invoices/calc_weight", data, options);
  }



  close_ticket(data)
   {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/support/close_ticket", data, options);
  } 

  feedbacklists(data)
    {
      let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "/feedback/lists", data, options);
    }
 

  reopen_ticket(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/support/reopen_ticket", data, options);
  }

  search_faq(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/support/search_faq", data, options);
  }

  save_product(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/Ordercommondata/save_template", data, options);
  }

  dashcountsheet(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/Dashboard/clickdashboardcount", data, options);
  }

  tracking_dashboard(data)
  {
    let headers = new Headers({
       "Content-Type": "application/json",
       "Authorization":localStorage.getItem("token")
     });
     let options = new RequestOptions({ headers: headers });
     return this.http.post(this.apiUrl + "/Trackingdashboard/clicktrackingdashboardcount" , data , options );
  }
 

  rto_dash_count(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/Rtodashboard/clickrtodashboardcount", data, options);
  }

  edit_shipment(data)
  {
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization":localStorage.getItem("token")
    });
    let options = new RequestOptions({ headers: headers });
   return this.http.post(this.apiUrl + "/channelorder/edit_process_order_page", data, options);
  }

  

}
