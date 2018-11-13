import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { HttpService } from '../../core/services/http/http.service'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  
  model:any={
    "password":""
  } ;
  hide=true;
  // The route path and parameters are available through an injected router service called the ActivatedRoute. 
  constructor(public service:HttpService,public route:ActivatedRoute ,public snackBar: MatSnackBar)  { }
  // public token=this.route.snapshot.params.id;

  ngOnInit() {
  }
  public token=this.route.snapshot.params.id;

set(){
  var body={

    "newPassword":this.model.password
  }
  
 



  this.service.postpassword("user/reset-password",body,this.token).subscribe(Response=>{
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
}

