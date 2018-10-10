import { Component, OnInit } from '@angular/core';
import{HttpService} from '/home/bridgeit/fundoo/src/app/services/http.service';
@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignupComponent implements OnInit {
  
  public card=[];
  public array=[];
  service;

  constructor(public httpService:HttpService) { }

  ngOnInit() {
   this.httpService.getDataService("user/service")
  
  .subscribe((response)=>{
           var data=response["data"];
           for(var i=0;i<data.data.length;i++){
             this.card.push(data.data[i]);
           }
           console.log(this.card);
         })
   
  }
  displayCard(card){
    console.log(card.name);
    this.service=card.name;
    card.choose=true;
    for(var i=0;i<this.card.length;i++)
    {
      if(card.name==this.card[i].name){
        continue;
      }
      this.card[i].choose=false;
    }
  
  }

model:any={};


  sendData(){

    console.log(this.model.Firstname);
    console.log(this.model.Lastname);
    console.log( this.model.Email);
    this.httpService
        .addDataService('user/userSignUp', {
        "firstName": this.model.Firstname,
        "lastName": this.model.Lastname,
        "phoneNumber": "9441623456",
        "service": this.service,
        "email": this.model.Email ,
        "emailVerified": true,
        "password": this.model.password,
        "username": this.model.Email, 
       "createdDate": "2018-10-09T06:35:12.617Z",
      "modifiedDate": "2018-10-09T06:35:12.617Z",

    })
    .subscribe(
      (data )=> {
          console.log("POST Request is successful ", data);

      },
      error => {
          console.log("Error", error);
      }
)

this.httpService.getAddService("user")
.subscribe(
  (data )=> {
      console.log("data in server is", data);

  },
  error => {
      console.log("Error", error);
  })


  }
  
  

  
}



