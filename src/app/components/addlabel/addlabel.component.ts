import { Component,Inject, OnInit,ViewChild,ElementRef } from '@angular/core';
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

  constructor(public service:HttpService,
    public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    // @ViewChild('label') label: ElementRef;
      ngOnInit() {
        this.getLabel();

  }
public  label;
ArrayOfLabel=[];

close(){
  this.dialogRef.close();
  this.addLabel();
this.getLabel();
  

}

id=localStorage.getItem('userId')
token=localStorage.getItem('token')

addLabel(){
  var model={
    "label":this.label,
    "isDeleted":false,
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
    for(var index=0;index<result['data'].details.length;index++){
      if(result['data'].details[index].isDeleted==false){
      this.ArrayOfLabel.push(result['data'].details[index]);
    }
  }
console.log(this.ArrayOfLabel);
}),
error=>{
  console.log(error,"errorrrrrr");
}
}
deleteLabel(labelid){
  console.log(labelid);
  this.service.deleteData("noteLabels/"+labelid+"/deleteNoteLabel").subscribe(result=>{
    console.log("delete note label");
    this.getLabel();
  })
}
editLabel(labelid){
  console.log(labelid);
  var body={
    "label":this.label,
    "isDeleted":false,
    "id":labelid,
    "userId":this.id
  }
  this.service.addDataService("noteLabels/"+labelid+"/updateNoteLabel",body).subscribe(result=>{
    console.log("update note label");
    this.getLabel();
  })
}


}
