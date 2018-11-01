import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{HttpService} from '../../services/http.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {

  constructor(public activeRoute:ActivatedRoute,public service:HttpService) { 
    this.activeRoute.params.subscribe(params=>{
      console.log(params);
      
    })
  }

  ngOnInit() {
    this.getAllNotes();
  }
  arrayData=[];
  arrayNewData=[];
  token=localStorage.getItem('token')
  getAllNotes(){
    this.service.getCardData("notes/getNotesList",this.token).subscribe(data=>{  
       this.arrayData=data['data'].data.reverse();
           this.arrayNewData = [];
        for(var i=0;i<data['data'].data.length-1;i++){
          if(data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false )
          {
          this.arrayNewData.push(data['data'].data[i]);
           }

          }
          
          
      }),
      error => {
        console.log("Error", error);
      
      }
  
      
}

}
