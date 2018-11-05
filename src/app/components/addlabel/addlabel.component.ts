import { Component,Inject,EventEmitter,Output, OnInit,ViewChild,ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{HttpService} from '../../services/http.service'
import { DataService } from '../../services/data.service';

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
  
  @Output() eventNew=new EventEmitter<string>();

  @Output() eventTwo = new EventEmitter();

  changeText:boolean;
  clickEdit;
  idEdit;
  iconEdit;
  canEdit;
  editLabel;
  messageDisplay;
  message;
  constructor(public service:HttpService,public dataService:DataService,
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
public newLabel;
clear(){
  this.label = ' ';
}
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
  var label = this.label;
  console.log(this.ArrayOfLabel);
for(var j =0; j<this.ArrayOfLabel.length; j++)
{
      if(this.ArrayOfLabel[j].label == label)
      {
       this.message="label  already exists"
        return false;
      }
}

  var model={
    "label":this.label,
    "isDeleted":false,
    // "id":labelid,
    "userId":this.id
  }
  // if(this.label==undefined){
  //   this.messageDisplay="No empty values alllowed"
  // }
  this.service.postDelete("noteLabels",model,this.token).subscribe(result=>{
    console.log("adding label")
    this.clear();

    this.getLabel();
   
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
edit(label){
  this.clickEdit=true;
  this.iconEdit=false;
  this.canEdit=true;
  this.idEdit=label.id;
  this.editLabel=label.label;
 
}

deleteLabel(labelid){
  console.log(labelid);
  this.service.deleteData("noteLabels/"+labelid+"/deleteNoteLabel").subscribe(result=>{
    console.log("delete note label");
    this.dataService.change(true);
  
    this.eventTwo.emit();
    this.getLabel();
   
  }),
  error=>{
    console.log(error,"error");
  }
}

editlabel(label){
  // console.log("idlabel",label);
  this.iconEdit = true;
  this.clickEdit=false;
  this.canEdit=false;
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
    this.dataService.change(true);

    this.getLabel();
  
  }),
  error=>{
    console.log(error,"error");
  }
}



}
