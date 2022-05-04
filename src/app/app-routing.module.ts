import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './mainlayout/signin/signin.component';


const routes: Routes = [
  { path: '', redirectTo :'signin', pathMatch :'full' },
  { path: 'signin/:msg',component:SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
