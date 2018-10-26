
import{HttpService} from '../../services/http.service';
import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router'; 


/** @title Form field with error messages */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent  {
  hide=true;
              
constructor(public httpService: HttpService,public snackBar: MatSnackBar,public router:Router) { }
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
 ngOnInit() {
//   var token;
//   if (localStorage.getItem('token')) {
// this.router.navigate(['/home']);    }

}

model:any={
  "email":"",
  "password":"",
 

};


email = new FormControl('', [Validators.required, Validators.email]);
errorMessage() {
    return this.email.hasError('required') ? 'email is required' :
        this.email.hasError('email') ? 'Not a valid email' :
            'Not a valid email';
  }
  password=new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9@!@#$%]*')]);

  errorpassword() {
    return this.password.hasError('required') ? 'password is required' :
        this.password.hasError('password') ? 'Not a valid password' :
            '';
   }
 isLeftVisible=false;
 next(){
   if(!this.email.invalid)
   {
   this.isLeftVisible = !this.isLeftVisible;
   }
   else{
console.log("invalid details");
   }

 }
signin(){
  var first=this.model.email;
      console.log(this.model.email);
      console.log(this.model.password);
     

      this.httpService.addDataService("user/login",this.model).subscribe(
        data => {
          console.log(data)
          console.log(data['id']);
          localStorage.setItem('token',data['id']);
        // console.log("login successfull");
        localStorage.setItem('first',first);
        localStorage.setItem('firstName',data['firstName']);
        localStorage.setItem('lastName',data['lastName']);
        localStorage.setItem('id',data['id']);
        this.router.navigate(['/home']);
        this.snackBar.open("login successfull", "login", {
                  duration:10000,
                
                });
                
        
      }),
      error => {/**if error exists then displays the error message using snackbar */
              console.log("Error", error);
              this.snackBar.open("enter valid details ","login unsuccessfull" , {
                        duration: 10000,
                      });

                          
            
            }
        




 

}
}

