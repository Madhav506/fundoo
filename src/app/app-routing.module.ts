import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{RouterModule,Routes} from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import {AuthguardGuard  as AuthGuard } from '../../src/app/auth/auth.guard';
import { NotesParentComponent } from './components/notes-parent/notes-parent.component';


const appRoutes:Routes=[
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'forgotpassword', component: ForgotpasswordComponent},
  {path:'resetpassword/:id',component:ResetpasswordComponent},
  {path:'home',component:HomeComponent,canActivate: [AuthGuard],children:[
    {path:'',redirectTo:'notes',pathMatch:'full'},
      {path:'notes',component:NotesParentComponent},
      {path:'reminders',component:RemindersComponent},
      {path:'archive',component:ArchiveComponent},
      {path:'trash',component:TrashComponent}
  ]},
  // { path: '**', redirectTo: '' },
  {path:'',redirectTo:'/login',pathMatch:'full'},
  
]; 



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  //declarations: []
  exports:[RouterModule]
})
export class AppRoutingModule { }






