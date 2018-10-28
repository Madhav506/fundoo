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

  constructor(public service:HttpService,public dialog: MatDialog,public snackBar:MatSnackBar) { }

  ngOnInit() {
    
   
  
  }
  token=localStorage.getItem('token')

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
  // labelNotes(){
  //  console.log("dataa");
  // }
  // openlabelDialog(dialogData): void {
    
  //   const dialogRef = this.dialog.open(AddlabelComponent,{
  //     width: '250px',
  //     height:'auto',
  //     data: {name:"madhu"},
  //     panelClass:'myapp-no-padding-dialog'
  //   });
  //   dialogRef.afterClosed().subscribe(data => {
  //     console.log('The dialog was closed');
  //   });
  // }

}
