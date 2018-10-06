// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
  

 

//   constructor() {
//     email = new FormControl('', [Validators.required, Validators.email]);

    
//    }

//   ngOnInit() {
//   }

// }

import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/** @title Form field with error messages */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent  {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Enter a valid emailid' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}