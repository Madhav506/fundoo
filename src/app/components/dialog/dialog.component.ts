import { Component, OnInit,Inject,ViewChild, ElementRef,Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{HttpService} from '../../services/http.service'
import {MatSnackBar} from '@angular/material';
import { DataService } from '../../services/data.service';

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

  eventOne=new EventEmitter<boolean>();
  
  constructor(public service:HttpService,public dataService:DataService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public snackBar:MatSnackBar) {
      // this.dataService.cMsg.subscribe(message=>{
      //   console.log(message);
      //   if(message){
      //     this.updateEvent.emit();
  
      //   }
      // })
    }
    public title;
    public note;
    public id;
   public  array1=[];
   public  array2=[];
   public temp;
    public newLabel;

  ngOnInit() {
    console.log(this.data['noteLabels']);
    this.array1=this.data['noteLabels'];
    
  }
  
 
onClick():void {
          this.dialogRef.close();
}
more(temp){
this.array1.push(temp);

}
archive(event){
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
removeAssignments(label,noteid){
  console.log(label);
  console.log(noteid);
 
  
  this.service.postDelete("notes/"+noteid+"/addLabelToNotes/"+label.id+"/remove",{},this.token).subscribe(response=>{
        console.log("removing labels",response);
        this.eventOne.emit(true)
        const index = this.array1.indexOf(label, 0);
          if (index > -1) {
            this.array1.splice(index, 1);
          }

});
error=>{
  console.log("error");
  
}

}
// clickFunc(temp){
//   if (!this.array2.some((data) => data == temp.label))
//   {
//     this.array1.push(temp.id);
//   this.array2.push(temp.label);
//   }
//   else{
  
//   const index = this.array2.indexOf(temp.label, 0);
//   if (index > -1) {
//     this.array2.splice(index, 1);
//   }
//     }

   
//   }


}
