import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/services/user/user.service'
import { HttpService } from '../../core/services/http/http.service'

import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartserviceService } from '../../core/services/cartService/cartservice.service';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})

export class SignupComponent implements OnInit,OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();
private productId;
    firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]);
  regform: any;
    errorFirstname() {
        return this.firstname.hasError('required') ? 'first name is required' :
            this.firstname.hasError('pattern') ? 'Not a valid first name' :
                '';
    }

    lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
    errorLastname() {
        return this.lastname.hasError('required') ? 'last name is required' :
            this.lastname.hasError('pattern') ? 'Not a valid last name' :
                '';
    }
    email = new FormControl('', [Validators.required, Validators.email]);
    erroremail() {
        return this.email.hasError('required') ? 'email is required' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
    password = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9@]*'), , Validators.minLength(4)]);
    errorpassword() {
        return this.password.hasError('required') ? 'password is required' :
            this.password.hasError('pattern') ? 'Not a valid password' :
                '';
    }
    cpassword = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9@]*'), Validators.minLength(4)]);
    errorCpassword() {
        return this.password.hasError('required') ? 'Confirmpassword is required' :
            this.password.hasError('pattern') ? 'Not a valid password' :
                '';
    }


    public card = [];
   private  service;
    hide = true;


    constructor(public router:Router,public user: UserService,
         public display: MatSnackBar, public validate: FormBuilder,public cartservice:CartserviceService) { }

    // Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
    public product=localStorage.getItem('productId');

    ngOnInit() {

       this.getserviceData();
       this.getCartDetails();

    }

    getserviceData(){
        this.user.getDataServiceBasicAdvance()

        //whenever response from server arrives the callback passed to subscribe()
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
            let data = response["data"];
            for (let i = 0; i < data.data.length; i++) {
                this.card.push(data.data[i]);
            }
        })
    }
    changeCardColor(card) {
        
        this.service = card.name;
        card.check = !card.check;
        for (let i = 0; i < this.card.length; i++) {
            if (card.name == this.card[i].name) {
                continue;
            }
            this.card[i].check = false;
        }

    }

    detailsObject: any = {};


    sendData() {
       

            if (this.detailsObject.cpassword != this.detailsObject.password) {
                this.display.open("password mismatch", "mismatch", {
                    duration: 10000,
                });
                return false;
            }
            else {
                this.user
                    .postSignUp( {
                        "firstName": this.detailsObject.Firstname,
                        "lastName": this.detailsObject.Lastname,
                        "service": this.service,
                        "email": this.detailsObject.Email,
                        "emailVerified": true,
                        "password": this.detailsObject.password,
                        "confirmpassword": this.detailsObject.cpassword,

                    })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(
                        (data) => {
                            this.display.open("Registered successfull", "continue", {
                                duration: 10000,
                            });


                        }
                    )
            }


        this.user.getAddService()
        .pipe(takeUntil(this.destroy$))
            .subscribe(
                (data) => {
                    LoggerService.log("data in server is", data);

                })

    }
    goToCart(){
        this.router.navigate(['/productcart'])
    }
//cart Details
public content;
getCartDetails(){
this.cartservice.cartDetails(this.product).subscribe(response=>{
console.log('cartDetails',response);
this.productId=response['data']['product']['id']
console.log(this.productId);

// localStorage.removeItem('productId');
// console.log('cartDetailssdssd',response['data']['id']);
// console.log(this.productId);


});

}
    ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
      }
}



