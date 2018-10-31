import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import{HttpService} from '../../services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-moreicon',
  templateUrl: './moreicon.component.html',
  styleUrls: ['./moreicon.component.css']
})
export class MoreiconComponent implements OnInit {
@Input() arrayOfNotes;
@Output() moreEvent = new EventEmitter<any>();
// @Output() createEvent = new EventEmitter<any>();

public ArrayOfLabel=[];
public checklist=[];
public check=true;
noteArray
isChecked;
  constructor(public service:HttpService,public dialog: MatDialog,public snackBar:MatSnackBar) { }

  ngOnInit() {
      
  }
  token=localStorage.getItem('token')
temp;
  deleteNotes(arrayOfNotes){
    
    console.log(this.arrayOfNotes);
    var model={
      "isDeleted":true,
      "noteIdList":[this.arrayOfNotes]
    }
    this.service.postDelete("notes/trashNotes",model,this.token).subscribe(data=>{
      console.log("delete note",data);
      this.snackBar.open("note deleted  successfully,please check in trash", "trash", {
        duration:10000,
      
      });
      this.moreEvent.emit();

    }),
    error => {
      console.log("Error", error);
    
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
  console.log("emitting");
  

  }),
  error=>{
    console.log(error,"error");
  }
  }

  addLabelList(labelid){
    console.log(labelid);
    console.log("noteid",this.arrayOfNotes);
        this.service.postDelete("notes/"+this.arrayOfNotes+"/addLabelToNotes/"+labelid+"/add",{},this.token).subscribe(response=>{
      console.log("adding label to note",response);
      this.moreEvent.emit();
    }),
    error=>{
      console.log("error",error);
    }
    
    
}




}
 