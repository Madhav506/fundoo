import { Component, EventEmitter,OnInit,Output } from '@angular/core';
import{HttpService} from '../../services/http.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Output() eventClicked = new EventEmitter<Event>();

interval: any;
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
// this.getAllNotes();
// this.loadCardsDynamically();
  }

openNote(){
  this.choose1=false;
  this.choose2=true;

}


close(){
  this.choose1=true;
  this.choose2=false;
  this.title=document.getElementById('title').innerHTML;
  this.description=document.getElementById('description').innerHTML;
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
    this.eventClicked.emit();
    // this.getAllNotes();
    // this.loadCardsDynamically();
  },
  error=>{
    console.log("failed",error)
    console.log(error);
  }
  


  )};
  // update(title,description){
  //   this.close();
  //   this.service.postpassword("notes/updatenotes",{},this.token).subscribe(dataNew=>{
  //     console.log("successfull",dataNew);
  //   })
  // }
 
}
