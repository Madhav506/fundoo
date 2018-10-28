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

  constructor(public service:HttpService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public snackBar:MatSnackBar) {}
    public title;
    public note;
    public id;

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

  var id=this.data['id'];
  this.title=document.getElementById('title').innerHTML;
this.title=this.title.nativeElement.innerHTML
  this.note=document.getElementById('note').innerHTML;
  var model={
    "noteId":[id],
    "title":this.title,
    "description":this.note,
    "color":""
    
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


}
