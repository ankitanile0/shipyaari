import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainlayoutComponent } from './mainlayout.component';
import { AlertModule } from '../alert';
import { ToastrModule } from '../_toastr/toastr';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from "ng-apexcharts";
import { UiSwitchModule } from 'ngx-ui-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgCircleProgressModule } from 'ng-circle-progress';


//import { ToastrModule } from 'ngx-toastr';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NdrComponent } from './dashboard/ndr/ndr.component';
import { TrackingComponent } from './dashboard/tracking/tracking.component';
import { RtoComponent } from './dashboard/rto/rto.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutCompComponent } from './profile/about-comp/about-comp.component';
import { BankComponent } from './profile/bank/bank.component';
import { CommunicationComponent } from './profile/communication/communication.component';
import { CouponComponent } from './profile/coupon/coupon.component';
import { KycComponent } from './profile/kyc/kyc.component';
import { MarketingComponent } from './profile/marketing/marketing.component';
import { RewardComponent } from './profile/reward/reward.component';
import { SmsTempComponent } from './profile/sms-temp/sms-temp.component';
import { SubscriptionComponent } from './profile/subscription/subscription.component';
import { Graph1Component } from './dashboard/graph1/graph1.component';
import { Graph2Component } from './dashboard/graph2/graph2.component';
import { Pichart1Component } from './dashboard/pichart1/pichart1.component';
import { Pichart2Component } from './dashboard/pichart2/pichart2.component';
import { Pichart3Component } from './dashboard/pichart3/pichart3.component';
import { TemplateComponent } from './smartship/template/template.component';
import { AddressBookComponent } from './smartship/address-book/address-book.component';
import { ModulesComponent } from './smartship/modules/modules.component';
import { AddtemplateComponent } from './smartship/template/addtemplate/addtemplate.component';
import { EdittemplateComponent } from './smartship/template/edittemplate/edittemplate.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { B2borderComponent } from './order/b2border/b2border.component';
import { AddBulkComponent } from './order/add-bulk/add-bulk.component';
import { AllOrderComponent } from './order/all-order/all-order.component';
import { ChannelOrderComponent } from './order/channel-order/channel-order.component';
import { AllorderComponent } from './order/all-order/allorder/allorder.component';
import { CancelledComponent } from './order/all-order/cancelled/cancelled.component';
import { CompleteComponent } from './order/all-order/complete/complete.component';
import { InProcessComponent } from './order/all-order/in-process/in-process.component';
import { ReadyPickComponent } from './order/all-order/ready-pick/ready-pick.component';
import { ReadyShipComponent } from './order/all-order/ready-ship/ready-ship.component';
import { InTransitComponent } from './order/all-order/in-transit/in-transit.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import { AllComponent } from './tracking-order/all/all.component';
import { TrackRtoComponent } from './tracking-order/track-rto/track-rto.component';
import { ExceptionComponent } from './tracking-order/exception/exception.component';
import { DuplicateComponent } from './order/duplicate/duplicate.component';
import { ReverceComponent } from './order/reverce/reverce.component';
import { TrackDetailsComponent } from './order/all-order/track-details/track-details.component';
import { ManifestComponent } from './order/all-order/manifest/manifest.component';
import { AfftedPincodeComponent } from './tracking-order/affted-pincode/affted-pincode.component';
import { ApproveRtoComponent } from './tracking-order/approve/approve-rto/approve-rto.component';
import { ApprovePickupComponent } from './tracking-order/approve/approve-pickup/approve-pickup.component';
import { HelpComponent } from './help/help.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { SettingComponent } from './setting/setting.component';
import { FeedbackComponent } from './help/feedback/feedback.component';
import { AgreementComponent } from './help/agreement/agreement.component';
import { AgreementTypeComponent } from './help/agreement/agreement-type/agreement-type.component';
import { AgreementTypeVerComponent } from './help/agreement/agreement-type/agreement-type-ver/agreement-type-ver.component';
import { AgreementTypeVerContComponent } from './help/agreement/agreement-type/agreement-type-ver/agreement-type-ver-cont/agreement-type-ver-cont.component';
import { ChangePasswordComponent } from './setting/change-password/change-password.component';
import { DownloadPincodeComponent } from './setting/download-pincode/download-pincode.component';
import { LabelSettingComponent } from './setting/label-setting/label-setting.component';
import { CodComponent } from './billing/cod/cod.component';
import { ReportComponent } from './billing/report/report.component';
import { PlansComponent } from './plans/plans.component';
import { SupportComponent } from './support/support.component';
import { AllTicketComponent } from './support/all-ticket/all-ticket.component';
import { CreateTicketComponent } from './support/create-ticket/create-ticket.component';
import { ChatSupportComponent } from './support/chat-support/chat-support.component';
import { MailSupportComponent } from './support/mail-support/mail-support.component';
import { InvoicesComponent } from './billing/invoices/invoices.component';
import { CreditNoteComponent } from './billing/invoices/credit-note/credit-note.component';
import { InvoiceComponent } from './billing/invoices/invoice/invoice.component';
import { RechargePaymentComponent } from './billing/invoices/recharge-payment/recharge-payment.component';
import { WeightReconComponent } from './billing/invoices/weight-recon/weight-recon.component';
import { ShippingChargeComponent } from './billing/invoices/shipping-charge/shipping-charge.component';
import { RegisterComponent } from './register/register.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CourierPickupHourComponent } from './dashboard/tracking/courier-pickup-hour/courier-pickup-hour.component';
import { CourierDeliveryComponent } from './dashboard/tracking/courier-delivery/courier-delivery.component';
import { CourierDelAmtComponent } from './dashboard/tracking/courier-del-amt/courier-del-amt.component';
import { DelivryAnalysisComponent } from './dashboard/tracking/delivry-analysis/delivry-analysis.component';
import { InvoicedetailsComponent } from './billing/invoices/invoice/invoicedetails/invoicedetails.component';
import { RedirectComponent } from './redirect/redirect.component';
import { PaytmcallbackComponent } from './paytmcallback/paytmcallback.component';
import { TemmpComponent } from './temmp/temmp.component';
import { EditshipmentComponent } from './order/editshipment/editshipment.component';
import { ApiDocComponent } from './smartship/api-doc/api-doc.component';





@NgModule({
    imports: [
          FormsModule,
          ReactiveFormsModule,
          AlertModule,
          ToastrModule,
          CommonModule,
          NgSelectModule,
          BrowserModule,
          NgApexchartsModule,
          BrowserAnimationsModule,
          UiSwitchModule,
          ModalModule.forRoot(),
          BsDatepickerModule.forRoot(),
          NgxPaginationModule,
          TooltipModule.forRoot(),
          BsDropdownModule.forRoot(),
          ProgressbarModule.forRoot(),
          PopoverModule.forRoot(),
          AccordionModule.forRoot(),
          TabsModule.forRoot(),
          RatingModule.forRoot(),
          CollapseModule.forRoot(),
          AngularEditorModule,
          NgxChartsModule,
          InfiniteScrollModule,
           NgCircleProgressModule.forRoot({})
       
          //ToastrModule.forRoot(),
    ],
    declarations: [
        MainlayoutComponent,
        DashboardComponent,
        NdrComponent,
        TrackingComponent,
        RtoComponent,
        ProfileComponent,
        AboutCompComponent,
        BankComponent,
        CommunicationComponent,
        CouponComponent,
        KycComponent,
        MarketingComponent,
        RewardComponent,
        SmsTempComponent,
        SubscriptionComponent,
        Graph1Component,
        Graph2Component,
        Pichart1Component,
        Pichart2Component,
        Pichart3Component,
        TemplateComponent,
        AddressBookComponent,
        ModulesComponent,
        AddtemplateComponent,
        EdittemplateComponent,
        AddOrderComponent,
        B2borderComponent,
        AddBulkComponent,
        AllOrderComponent,
        ChannelOrderComponent,
        AllorderComponent,
        CancelledComponent,
        CompleteComponent,
        InProcessComponent,
        ReadyPickComponent,
        ReadyShipComponent,
        InTransitComponent,
        TrackingOrderComponent,
        AllComponent,
        TrackRtoComponent,
        ExceptionComponent,
        DuplicateComponent,
        ReverceComponent,
        TrackDetailsComponent,
        ManifestComponent,
        AfftedPincodeComponent,
        ApproveRtoComponent,
        ApprovePickupComponent,
        HelpComponent,
        OrderConfirmationComponent,
        SettingComponent,
        FeedbackComponent,
        AgreementComponent,
        AgreementTypeComponent,
        AgreementTypeVerComponent,
        AgreementTypeVerContComponent,
        ChangePasswordComponent,
        DownloadPincodeComponent,
        LabelSettingComponent,
        CodComponent,
        ReportComponent,
        PlansComponent,
        SupportComponent,
        AllTicketComponent,
        CreateTicketComponent,
        ChatSupportComponent,
        MailSupportComponent,
        InvoicesComponent,
        CreditNoteComponent,
        InvoiceComponent,
        RechargePaymentComponent,
        WeightReconComponent,
        ShippingChargeComponent,
        RegisterComponent,
        CourierPickupHourComponent,
        CourierDeliveryComponent,
        CourierDelAmtComponent,
        DelivryAnalysisComponent,
        InvoicedetailsComponent,
        RedirectComponent,
        PaytmcallbackComponent,
        TemmpComponent,
        EditshipmentComponent,
        ApiDocComponent,
    ],
    
    providers: [ 
    //    JsonToCsvService, JsontocsvsheetService, TimeService, JsonToExcelService, WhjsontoexcelService 
    ] 

   
})
export class MainlayoutModule {}
