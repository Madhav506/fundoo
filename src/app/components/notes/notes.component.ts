import { Component, EventEmitter,OnInit,Output,Input} from '@angular/core';
import{HttpService} from '../../services/http.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Output() eventClicked = new EventEmitter<Event>();
  ArrayOfLabel;
colorMyevent= '#ffffff';
interval: any;
  choose1=true;
  choose2=false;
  choose3=true;
  array1=[];
  array2=[];
  
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
  this.array2=[];
  this.title=document.getElementById('title').innerHTML;
  this.description=document.getElementById('description').innerHTML;
  

  var body={
  "title":this.title,
  "description":this.description,
  "labelIdList":JSON.stringify(this.array1),
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
    this.array1=[];
    this.array2=[];
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
  getLabel(){
    
    this.service.getCardData("noteLabels/getNoteLabelList",this.token).subscribe(result=>{
      console.log(result['data'].details);
      
      this.ArrayOfLabel=[];
      for(var index=0;index<result['data'].details.length;index++){
        if(result['data'].details[index].isDeleted==false){
        this.ArrayOfLabel.push(result['data'].details[index]);
      }
    }
  console.log(this.ArrayOfLabel);
  console.log("emitting");
  

  }),
  error=>{
    console.log(error,"error");
  }
  }

  clickFunc(temp){
    console.log(temp);
    
if (!this.array2.some((data) => data == temp.label))
{
  this.array1.push(temp.id);
this.array2.push(temp.label);
}
else{

const index = this.array2.indexOf(temp.label, 0);
if (index > -1) {
  this.array2.splice(index, 1);
}
  }
 
}
}      
