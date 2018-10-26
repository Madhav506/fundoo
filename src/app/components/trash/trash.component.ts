import { Component, OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor(public service:HttpService) { }
myData=[]
// token;
token=localStorage.getItem('token')
  ngOnInit() {
   
    this.service.getCardData("notes/getNotesList",this.token).subscribe(data=>{
      this.myData=data['data'].data.reverse();
          this.myData = []
       for(var i=0;i<data['data'].data.length-1;i++){
         if(data['data'].data[i].isDeleted == true)
         {
         this.myData.push(data['data'].data[i]);
          }
         }
     }),
     error => {
       console.log("Error", error);
     
     }
  }

}
