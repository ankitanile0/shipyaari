import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent} from './layout.component';
import { SigninComponent } from '../mainlayout/signin/signin.component';
import { RegisterComponent } from '../mainlayout/register/register.component';
import { AuthGuardService as AuthGuard } from '../guard/auth-guard.service';

//header
import { PassbookComponent } from './header/passbook/passbook.component';

// dashboard
import { DashboardComponent } from '../mainlayout/dashboard/dashboard.component';
import { NdrComponent } from '../mainlayout/dashboard/ndr/ndr.component';
import { TrackingComponent } from '../mainlayout/dashboard/tracking/tracking.component';
import { RtoComponent } from '../mainlayout/dashboard/rto/rto.component';
import { ProfileComponent } from '../mainlayout/profile/profile.component';

// smartShipyaari
import { TemplateComponent } from '../mainlayout/smartship/template/template.component';
import { AddressBookComponent } from '../mainlayout/smartship/address-book/address-book.component';
import { ModulesComponent } from '../mainlayout/smartship/modules/modules.component';
import { AddtemplateComponent } from '../mainlayout/smartship/template/addtemplate/addtemplate.component';
import { EdittemplateComponent } from '../mainlayout/smartship/template/edittemplate/edittemplate.component';
import { ApiDocComponent } from '../mainlayout/smartship/api-doc/api-doc.component';

//orders
import { AddOrderComponent } from '../mainlayout/order/add-order/add-order.component';
import { B2borderComponent } from '../mainlayout/order/b2border/b2border.component';
import { AddBulkComponent } from '../mainlayout/order/add-bulk/add-bulk.component';
import { AllOrderComponent } from '../mainlayout/order/all-order/all-order.component';
import { ChannelOrderComponent } from '../mainlayout/order/channel-order/channel-order.component';
import { DuplicateComponent } from '../mainlayout/order/duplicate/duplicate.component';
import { ReverceComponent } from '../mainlayout/order/reverce/reverce.component';
import { TrackDetailsComponent } from '../mainlayout/order/all-order/track-details/track-details.component';
import { ManifestComponent } from '../mainlayout/order/all-order/manifest/manifest.component';
import { EditshipmentComponent } from '../mainlayout/order/editshipment/editshipment.component';

//tracking
import { TrackingOrderComponent } from '../mainlayout/tracking-order/tracking-order.component';
import { AllComponent } from '../mainlayout/tracking-order/all/all.component';
import { TrackRtoComponent } from '../mainlayout/tracking-order/track-rto/track-rto.component';
import { ExceptionComponent } from '../mainlayout/tracking-order/exception/exception.component';
import { ApproveRtoComponent } from '../mainlayout/tracking-order/approve/approve-rto/approve-rto.component';
import { ApprovePickupComponent } from '../mainlayout/tracking-order/approve/approve-pickup/approve-pickup.component';

//help
import { AgreementComponent } from '../mainlayout/help/agreement/agreement.component';
import { AgreementTypeComponent } from '../mainlayout/help/agreement/agreement-type/agreement-type.component';
import { AgreementTypeVerComponent } from '../mainlayout/help/agreement/agreement-type/agreement-type-ver/agreement-type-ver.component';
import { AgreementTypeVerContComponent } from '../mainlayout/help/agreement/agreement-type/agreement-type-ver/agreement-type-ver-cont/agreement-type-ver-cont.component';
import { FeedbackComponent } from '../mainlayout/help/feedback/feedback.component';
import { LabelSettingComponent } from '../mainlayout/setting/label-setting/label-setting.component';
import { ChangePasswordComponent } from '../mainlayout/setting/change-password/change-password.component';
import { DownloadPincodeComponent } from '../mainlayout/setting/download-pincode/download-pincode.component';
import { OrderConfirmationComponent } from '../mainlayout/order-confirmation/order-confirmation.component';

//billing
import { CodComponent } from '../mainlayout/billing/cod/cod.component';
import { ReportComponent } from '../mainlayout/billing/report/report.component';
import { InvoicesComponent } from '../mainlayout/billing/invoices/invoices.component';

//plan
import { PlansComponent } from '../mainlayout/plans/plans.component';

//suppoet ticket
import { SupportComponent } from '../mainlayout/support/support.component';
import { AllTicketComponent } from '../mainlayout/support/all-ticket/all-ticket.component';
import { CreateTicketComponent } from '../mainlayout/support/create-ticket/create-ticket.component';
import { ChatSupportComponent } from '../mainlayout/support/chat-support/chat-support.component';
import { MailSupportComponent } from '../mainlayout/support/mail-support/mail-support.component';
import { InvoicedetailsComponent } from '../mainlayout/billing/invoices/invoice/invoicedetails/invoicedetails.component';
import { RedirectComponent } from '../mainlayout/redirect/redirect.component';

//other
import { PaytmcallbackComponent } from '../mainlayout/paytmcallback/paytmcallback.component';
import { TemmpComponent } from '../mainlayout/temmp/temmp.component';

//header
import { HeaderComponent } from './header/header.component';







const routes: Routes = [
    { path: '', component:LayoutComponent,
        children:[
            //header
            { path: 'passbook', component:PassbookComponent },
            //{ path: 'header',component:HeaderComponent},
            // dashboard
            { path: 'dashboard', component:DashboardComponent },
            { path: 'dashboard/:msg', component:DashboardComponent },
            { path: 'ndr', component:NdrComponent },
            { path: 'tracking', component:TrackingComponent },
            { path: 'rto', component:RtoComponent },
            { path: 'profile', component:ProfileComponent },

            // Smartshipyaari
            { path: 'template', component:TemplateComponent },
            { path: 'template/:msg', component:TemplateComponent },
            { path: 'addressbook', component:AddressBookComponent },
            { path: 'modules', component:ModulesComponent },
            { path: 'addtemplate', component:AddtemplateComponent },
            { path: 'edittemplate/:id', component:EdittemplateComponent }, 
            { path: 'apidoc', component:ApiDocComponent },
            //orders
             { path: 'addorder', component:AddOrderComponent },
             { path: 'b2border', component:B2borderComponent },
             { path: 'bulkorder', component:AddBulkComponent },
             { path: 'allorder', component:AllOrderComponent },
             { path: 'allorder/:msg', component:AllOrderComponent },
             { path: 'channel', component:ChannelOrderComponent }, 
             { path: 'duplicate/:id', component:DuplicateComponent },
             { path: 'reverce/:id', component:ReverceComponent },
             { path: 'manifest', component:ManifestComponent }, 
             { path: 'editshipment/:id', component:EditshipmentComponent },

             //tracking
             { path: 'trackingorders', component:TrackingOrderComponent },
             { path: 'approverto', component:ApproveRtoComponent },
             { path: 'approvepickup', component:ApprovePickupComponent },

             //help
            { path: 'agree/id', component:AgreementComponent },
            { path: 'agree', component:AgreementComponent },
            { path: 'agreetype', component:AgreementTypeComponent },
            { path: 'agreetype/:id', component:AgreementTypeComponent },
            { path: 'agreetypever', component:AgreementTypeVerComponent },
            { path: 'agreetypever/:id', component:AgreementTypeVerComponent },
            { path: 'agreetypevercont', component:AgreementTypeVerContComponent },
            { path: 'agreetypevercont/:id', component:AgreementTypeVerContComponent },
            { path: 'agreetypevercont/:id', component:AgreementTypeVerContComponent },
            { path: 'feedback', component:FeedbackComponent },
            { path: 'labelsetting', component:LabelSettingComponent },
            { path: 'changepassword', component:ChangePasswordComponent },
            { path: 'downloadpincode', component:DownloadPincodeComponent },
            { path: 'orderconfirmation', component:OrderConfirmationComponent },
            //billing
            { path: 'cod', component:CodComponent },
            { path: 'allinvoices', component:InvoicesComponent },
            { path: 'reports', component:ReportComponent },
           
            //support
            { path: 'supportcenter', component:SupportComponent },
            { path: 'allticket', component:AllTicketComponent },
            { path: 'createticket', component:CreateTicketComponent },
            { path: 'chatsupport', component:ChatSupportComponent },
            { path: 'chatsupport/:id', component:ChatSupportComponent },
            { path: 'mailsupport', component:MailSupportComponent }, 
            { path: 'mailsupport/:id', component:MailSupportComponent },        
            { path: 'invoicedetails/:id', component:InvoicedetailsComponent }, 

            { path: 'paytmcallback', component:PaytmcallbackComponent },    
            //plans
            { path: 'plans', component:PlansComponent }, 

            //other
            
            
          ],canActivate: [AuthGuard]
    },
    { path: 'track/:id', component:TrackDetailsComponent },
    { path: 'signin', component: SigninComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'signin/:msg', component: SigninComponent},
    { path: 'checktoken', component: RedirectComponent},
    { path: 'temp', component:TemmpComponent },
];



@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LayoutRoutingModule {
}