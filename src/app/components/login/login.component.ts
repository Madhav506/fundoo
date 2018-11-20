
import { HttpService } from '../../core/services/http/http.service'
import { UserService } from '../../core/services/user/user.service'

import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import{user} from ''
/** @title Form field with error messages */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public hide = true;

  constructor(public httpService: HttpService,
    public notesService:NotesService, public user:UserService,public snackBar: MatSnackBar, public router: Router) { }
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    //   var token;
    //   if (localStorage.getItem('token')) {
    // this.router.navigate(['/home']);    }

  }
  model: any = {
    "email": "",
    "password": "",
  };
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage() {
    return this.email.hasError('required') ? 'email is required' :
      this.email.hasError('email') ? 'Not a valid email' :
        'Not a valid email';
  }
  password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9@!@#$%]*')]);

  errorpassword() {
    return this.password.hasError('required') ? 'password is required' :
      this.password.hasError('password') ? 'Not a valid password' :
        '';
  }
  isLeftVisible = false;
  next() {
    if (!this.email.invalid) {
      this.isLeftVisible = !this.isLeftVisible;
    }
    else {
      LoggerService.log("invalid details");
    }

  }
  signin() {
    var first = this.model.email;

    
    this.user.postLogin( this.model)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        localStorage.setItem('token', data['id']);
        localStorage.setItem('first', first);
        localStorage.setItem('firstName', data['firstName']);
        localStorage.setItem('lastName', data['lastName']);
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('imageUrl', data['imageUrl']);

        var token=localStorage.getItem('token');
        LoggerService.log(token,"token in login");      
        var pushToken=localStorage.getItem('pushToken')
        LoggerService.log('pushtoken in login',pushToken);
        var body={
                "pushToken":pushToken
              }

              this.notesService.postRegisterPushToken(body)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                  data=>{

                    LoggerService.log("post of pushToken",data)
                  });
        
        this.router.navigate(['/home']);
        this.snackBar.open("login successfull", "login", {
          duration: 10000,
  });
      }),
      error => {/**if error exists then displays the error message using snackbar */
        LoggerService.log("Error", error);
        this.snackBar.open("enter valid details ", "login unsuccessfull", {
          duration: 10000,
        });

      }
      

  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

