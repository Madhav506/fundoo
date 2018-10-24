import { Component, OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service';

@Component({
  selector: 'app-notes-parent',
  templateUrl: './notes-parent.component.html',
  styleUrls: ['./notes-parent.component.css']
})
export class NotesParentComponent implements OnInit {

  constructor(public service:HttpService) { }

  ngOnInit() {
    this.getAllNotes();

  }
  arrayData=[];

  token=localStorage.getItem('token')

  getAllNotes(){
    this.service.getCardData("notes/getNotesList",this.token).subscribe(data=>{
    
       console.log("array of notes",data)
  
       this.arrayData=data['data'].data.reverse();
       console.log(this.arrayData)
      
      }) 
}
}