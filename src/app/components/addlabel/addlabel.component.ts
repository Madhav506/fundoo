import { Component,Inject,EventEmitter,Output, OnInit,ViewChild,ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{HttpService} from '../../services/http.service'
export interface DialogData {
  "title":String,
    "description":String,
    "notesIdList":String,
    "color":String
}
@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.css']
})

export class AddlabelComponent implements OnInit {
  
  // @Output() eventTwo: EventEmitter<any> = new EventEmitter<any>();
  eventTwo = new EventEmitter();

  changeText:boolean;
  editClick;
  editId;
  editDoneIcon;
  editable;
  editLabel
  constructor(public service:HttpService,
    public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.changeText = false;

    }
    @ViewChild('editDiv') editDiv: ElementRef;

      ngOnInit() {
        this.getLabel();

  }
public  label;
ArrayOfLabel=[];
clickEdit=false;
public newLabel;

close(){
  this.dialogRef.close();
  this.addLabel();
this.getLabel();
//   this.editlabel(this.label);
// this.edit(this.label)
}

id=localStorage.getItem('userId')
token=localStorage.getItem('token')

addLabel(){
  var model={
    "label":this.label,
    "isDeleted":false,
    // "id":labelid,
    "userId":this.id
  }
  this.service.postDelete("noteLabels",model,this.token).subscribe(result=>{
    console.log("adding label")
    console.log(result); 
  }), 
   error=>{
     console.log(error,"errorrrrrr");
   }
}
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
this.eventTwo.emit(this.ArrayOfLabel);
console.log("emitting");

}),
error=>{
  console.log(error,"error");
}
}
deleteLabel(labelid){
  console.log(labelid);
  this.service.deleteData("noteLabels/"+labelid+"/deleteNoteLabel").subscribe(result=>{
    console.log("delete note label");
    this.getLabel();
  }),
  error=>{
    console.log(error,"error");
  }
}
editlabel(label){
  console.log("idlabel",label);
  // this.label.id=labelid;
  this.editDoneIcon = true;
  this.editClick=false;
  this.editable=false;
  this.newLabel=this.editDiv.nativeElement.innerHTML
  console.log(this.newLabel,"label");
  
  var body={
    "label":this.newLabel,
    "isDeleted":false,
    "id":label.id,
    "userId":this.id
  }
  this.service.postDelete("noteLabels/"+label.id+"/updateNoteLabel",body,this.token).subscribe(result=>{
    console.log("update note label",result);
    this.getLabel();
  }),
  error=>{
    console.log(error,"error");
  }
}
edit(label){
  this.editClick=true;
  this.editId=label.id;
  this.editLabel=label.label;
  this.editDoneIcon=false;
  this.editable=true;
  console.log(this.editClick)
 
}


}
