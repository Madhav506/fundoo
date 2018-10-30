import { Component, EventEmitter,OnInit,Output } from '@angular/core';
import{HttpService} from '../../services/http.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<Event>();
colorMyevent= '#ffffff';
interval: any;
  choose1=true;
  choose2=false;
  choose3=true;
  
  public note;
  public title;
  public description;
  notes;
 token=localStorage.getItem('token');

  constructor(public service:HttpService,public snackBar:MatSnackBar) { }
  ngOnInit() {
// this.getAllNotes();
// this.loadCardsDynamically();
  }

openNote(){
  this.choose1=false;
  this.choose2=true;

}
change(event){
  if(event){
  this.colorMyevent=event;
}
}




close(){
  this.choose1=true;
  this.choose2=false;
  this.choose3=true;
  
  this.title=document.getElementById('title').innerHTML;
  this.description=document.getElementById('description').innerHTML;
  

  var body={
  "title":this.title,
  "description":this.description,
  "labelIdList":"",
  "checklist":"",
  "isPined":"",
  "color":""

  }
  body.color=this.colorMyevent;   
  this.colorMyevent="#ffffff";

  this.service.postpassword("notes/addnotes",body,this.token).subscribe(data=>{
    this.snackBar.open("note created  successfully", "Notes", {
      duration:10000,
    
    });
    
    this.eventClicked.emit();
    
  },
  error=>{
    console.log("failed",error)

  }
  


  )};
  // update(title,description){
  //   this.close();
  //   this.service.postpassword("notes/updatenotes",{},this.token).subscribe(dataNew=>{
  //     console.log("successfull",dataNew);
  //   })
  // }
 
}
