import { Component, OnInit,Inject,ViewChild, ElementRef,Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';

export interface DialogData {
  "title":String,
    "description":String,
    "notesIdList":String,
    "color":String
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

// @ViewChild('title') title: ElementRef;
export class DialogComponent implements OnInit {
  @Output() archiveEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();

  // @ViewChild('noteLabels') noteLabels: ElementRef;
  // @ViewChild("noteLabels") noteLabels: ElementRef;
  constructor(public service:HttpService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public snackBar:MatSnackBar) {}
    public title;
    public note;
    public id;
    public newLabel;

  ngOnInit() {
  }
  
 
onClick():void {
          this.dialogRef.close();
}
archive($event){
  this.archiveEvent.emit();
}
close() {
        this.update();
       
  }
  token=localStorage.getItem('token');
update(){
  console.log(this.data['id'])
  console.log(this.data['title'])
console.log(this.data['noteLabels']);

  var id=this.data['id'];
  this.title=document.getElementById('title').innerHTML;
  this.note=document.getElementById('note').innerHTML;
 
  var model={
    "noteId":[id],
    "title":this.title,
    "description":this.note,
    "color":"",
    "noteLabels":""
    
  }
  this.service.postpassword("notes/updateNotes",model,this.token).subscribe(data=>{
    console.log(data,"data");
    this.snackBar.open("note updated successfully", "update", {
      duration:10000,
    
    });
  }),
  error=>{
    console.log(error);
  }
}
removeAssignments(labelid,noteid){
  console.log(labelid);
  console.log(noteid);
  
  this.service.postDelete("notes/"+noteid+"/addLabelToNotes/"+labelid+"/remove",{},this.token).subscribe(response=>{
        console.log("removing labels",response);
        this.updateEvent.emit();

});
error=>{
  console.log("error");
  
}

}


}
