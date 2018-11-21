import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { HttpService } from '../../core/services/http/http.service'
import { Router,ActivatedRoute } from '@angular/router';
import { NotesService } from '../../core/services/notes/notes.service';
import { UserService } from '../../core/services/user/user.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit,OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  private input=new FormData()

  model:any={
    "password":""
  } ;
  hide=true;
  // The route path and parameters are available through an injected router service called the ActivatedRoute. 
  constructor(public service:HttpService,public route:ActivatedRoute,
    public user:UserService ,public snackBar: MatSnackBar)  { }
  // public token=this.route.snapshot.params.id;

  ngOnInit() {
  }
  public access_token=this.route.snapshot.params.id;


set(){
  localStorage.setItem('access_token',this.access_token)
  let body={

    "newPassword":this.model.password
  }
  if(this.model.password.length==0){
    return;
  }
// this.input.password.append('newPassword',this.model.password)
  this.service.postpassword(body,this.access_token)
  .pipe(takeUntil(this.destroy$))
  .subscribe(Response=>{
    // console.log("successful",Response);
    this.snackBar.open("Success"," password",{
      duration:10000,
    });

  },
  error=>{
    console.log(error);
    this.snackBar.open("failed","fail",{
      duration:10000,


  });

      if(error.status==404)
      this.snackBar.open("failed","fail",{
        duration:10000,


    });

  })
  // console.log('the id is  ',this.token);
  
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
