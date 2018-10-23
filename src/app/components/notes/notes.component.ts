import { Component, OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  choose1=true;
  choose2=false;
  public note;
  public title;
  public description;
  public pinned=false;
  public clicked=false;
  notes;
 token=localStorage.getItem('token');
  constructor(public service:HttpService) { }
  ngOnInit() {

  }

openNote(){
  this.choose1=false;
  this.choose2=true;

}
getAllNotes(){
  this.notes=[];
  this.service.getCardData("notes/getNotesList",this.token).subscribe(getdata=>{
      console.log("successful",getdata);
     this.notes.push(getdata);
    // this.notes=getdata;
     
    })
    console.log("array of notes",this.notes)

}
closeNote(){
  this.choose1=true;
  this.choose2=false;
// }
// click(){
  this.title=document.getElementById('title').textContent;
  this.description=document.getElementById('description').textContent;
  console.log(this.title);
  console.log(this.description);
  console.log(this.pinned);
  this.clicked=!this.clicked;

  var body={
  "title":this.title,
  "description":this.description,
  "labelIdList":"",
  "checklist":"",
  "isPined":this.pinned

  }
  this.service.postpassword("notes/addnotes",body,this.token).subscribe(data=>{
    console.log("successful",data);
    this.getAllNotes();
    
  },
  error=>{
    console.log("failed",error)
    console.log(error);
  }

    




  )};
}
