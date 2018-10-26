import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotescardComponent } from '../notescard/notescard.component';
import{HttpService} from '../../services/http.service'
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

export class DialogComponent implements OnInit {
  constructor(public service:HttpService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    public title;
    public note;
    public id;

  ngOnInit() {
  }
 
onClick():void {
          this.dialogRef.close();
}
close() {
        this.update();
  }
  token=localStorage.getItem('token');
update(){
  console.log(this.data['id'])
  console.log(this.data['title'])

  var id=this.data['id'];
  this.title=document.getElementById('title').innerHTML;
  this.note=document.getElementById('note').innerHTML;
  var model={
    "noteId":[id],
    "title":this.title,
    "description":this.note,
  }
  this.service.postpassword("notes/updateNotes",model,this.token).subscribe(data=>{
    console.log(data,"dataa");
  }),
  error=>{
    console.log(error);
  }
}


}
