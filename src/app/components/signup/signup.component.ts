import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css']
})

export class SignupComponent implements OnInit {

    firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3)]);
    errorFirstname() {
        return this.firstname.hasError('required') ? 'first name is required' :
            this.firstname.hasError('pattern') ? 'Not a valid first name' :
                'Not a valid firstname';
    }

    lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]);
    errorLastname() {
        return this.lastname.hasError('required') ? 'last name is required' :
            this.lastname.hasError('pattern') ? 'Not a valid last name' :
                'Not a valid lastname';
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
                'Not a valid password';
    }
    cpassword = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9@]*'), Validators.minLength(4)]);
    errorCpassword() {
        return this.password.hasError('required') ? 'Confirmpassword is required' :
            this.password.hasError('pattern') ? 'Not a valid password' :
                'Not a valid password';
    }


    public card = [];
    service;
    hide = true;


    constructor(public httpService: HttpService, public display: MatSnackBar, public validate: FormBuilder) { }

    // Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.

    ngOnInit() {

        this.httpService.getDataService("user/service")

            //whenever response from server arrives the callback passed to subscribe()
            .subscribe((response) => {
                var data = response["data"];
                for (var i = 0; i < data.data.length; i++) {
                    this.card.push(data.data[i]);
                }
                // console.log(this.card);
            })

    }
    changeCardColor(card) {
        // console.log(card.name);
        this.service = card.name;
        card.check = true;
        for (var i = 0; i < this.card.length; i++) {
            if (card.name == this.card[i].name) {
                continue;
            }
            this.card[i].check = false;
        }

    }

    detailsObject: any = {};


    sendData() {
        // console.log(this.detailsObject.Firstname);
        // console.log(this.detailsObject.Lastname);
        // console.log(this.detailsObject.Email);
      

            if (this.detailsObject.cpassword != this.detailsObject.password) {
                this.display.open("password mismatch", "hhh", {
                    duration: 10000,
                });
                return false;
            }
            else {
                this.httpService
                    .addDataService('user/userSignUp', {
                        "firstName": this.detailsObject.Firstname,
                        "lastName": this.detailsObject.Lastname,
                        "service": this.service,
                        "email": this.detailsObject.Email,
                        "emailVerified": true,
                        "password": this.detailsObject.password,
                        "confirmpassword": this.detailsObject.cpassword,

                    })
                    .subscribe(
                        (data) => {
                            // console.log(" successful ", data);
                            this.display.open("Registered successfull", "continue", {
                                duration: 10000,
                            });


                        },
                        error => {
                            // console.log("Error", error);
                            this.display.open("Registration unsuccessfull", "register", {
                                duration: 10000,
                            });

                        }
                    )
            }

        
       


        this.httpService.getAddService("user")
            .subscribe(
                (data) => {
                    // console.log("data in server is", data);

                },
                error => {
                    console.log("Error", error);
                })






    }
}



