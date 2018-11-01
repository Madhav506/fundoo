import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public service:HttpService,public dataService:DataService) { }
  searchInput;

  ngOnInit() {
this.dataService.currentMessage.subscribe(message=>{
  this.searchInput=message;
  console.log(this.searchInput,"searchComponent");
  
  this.getAllNotes();
})


  }
  token=localStorage.getItem('token');
  arrayData=[];
  arrayNewData=[];
  
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
