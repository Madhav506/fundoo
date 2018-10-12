import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{RouterModule,Routes} from '@angular/router';
// import{LoginComponent} from './components/login';
// import{SignupComponent} from './components/signup';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';





const appRoutes:Routes=[
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'forgotpassword', component: ForgotpasswordComponent},
  {path:'resetpassword/:id',component:ResetpasswordComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  
]; 



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  //declarations: []
  exports:[RouterModule]
})
export class AppRoutingModule { }






