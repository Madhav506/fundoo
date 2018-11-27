import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service'
import { UserService } from '../../core/services/user/user.service'
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  body: any = {
    "email": "",

  };

  constructor(public forgotService: HttpService,public user:UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  // errorMessage() {
  //   return this.email.hasError('required') ? 'Enter a valid email' :
  //     this.email.hasError('email') ? 'Not a valid email' :
  //       '';
  // }
  forgotPassword() {
    LoggerService.log(this.body.email);

    if (this.body.email.length == 0) {
      LoggerService.log("Email is required");
      this.snackBar.open("Email is required ", "Enter your mailid", {
        duration: 10000,

      });

    }
    else {
      this.user.postReset( this.body)
      .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            LoggerService.log("reset successfull,check your mail once");
            this.snackBar.open("To reset  ", "check your mail once a link has been sent", {
              duration: 10000,
            });


          })
      

    }
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}

