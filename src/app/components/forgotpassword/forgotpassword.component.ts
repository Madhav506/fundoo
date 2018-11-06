import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  body: any = {
    "email": "",

  };

  constructor(public forgotService: HttpService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage() {
    return this.email.hasError('required') ? 'Enter a valid email' :
      this.email.hasError('email') ? 'Not a valid email' :
        'Not a valid email';
  }
  forgotPassword() {
    console.log(this.body.email);

    if (this.body.email.length == 0) {
      // console.log("Email is required");
      this.snackBar.open("Email is required ", "Enter your mailid", {
        duration: 10000,

      });

    }
    else {
      this.forgotService.addDataService('user/reset', this.body)
        .subscribe(
          data => {

            // console.log("reset successfull,check your mail once");
            this.snackBar.open("To reset  ", "check your mail once a link has been sent", {
              duration: 10000,
            });


          }),
        error => {
          // console.log("Error", error);
          this.snackBar.open("enter valid details ", "login unsuccessfull", {
            duration: 10000,

          });

        }


    }
  }


}

