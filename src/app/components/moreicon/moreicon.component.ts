import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { MatSnackBar } from '@angular/material';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';

@Component({
  selector: 'app-moreicon',
  templateUrl: './moreicon.component.html',
  styleUrls: ['./moreicon.component.css']
})
export class MoreiconComponent implements OnInit {
  @Input() arrayOfNotes;
  @Output() delEvent = new EventEmitter<any>();
  @Output() moreEvent = new EventEmitter<any>();
  @Input() name;

  public ArrayOfLabel = [];
  public checklist = []; Forever
  public check = true;
  public array1 = [];
  public array2 = [];

  noteArray;
  isChecked;
  model;
  event: boolean;
  constructor(public service: HttpService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {

  }
  token = localStorage.getItem('token')
  temp;
  deleteNotes(arrayOfNotes) {

    console.log(this.arrayOfNotes);
    var model = {
      "isDeleted": true,
      "noteIdList": [this.arrayOfNotes]
    }
    this.service.postDelete("notes/trashNotes", model, this.token).subscribe(data => {
      console.log("delete note", data);
      this.snackBar.open("note deleted  successfully,please check in trash", "trash", {
        duration: 10000,

      });
      this.moreEvent.emit();

    }),
      error => {
        console.log("Error", error);

      }
  }
  getLabel() {

    this.service.getCardData("noteLabels/getNoteLabelList", this.token).subscribe(result => {
      console.log(result['data'].details);

      this.ArrayOfLabel = [];
      for (var index = 0; index < result['data'].details.length; index++) {
        if (result['data'].details[index].isDeleted == false) {
          this.ArrayOfLabel.push(result['data'].details[index]);
        }
      }
      console.log(this.ArrayOfLabel);
      console.log("emitting");


    }),
      error => {
        console.log(error, "error");
      }
  }
  addLabelList(label) {

    console.log(label.id);
    console.log("noteid", this.arrayOfNotes);
    this.service.postDelete("notes/" + this.arrayOfNotes + "/addLabelToNotes/" + label.id 
    + "/add", {}, this.token).subscribe(response => {
      console.log("adding label to note", response);

      this.moreEvent.emit(label);

    })
    error => {
      console.log("error", error);
    }
  }


  clickFunc(label) {
    console.log(label);

    console.log(label.id, "yess");
    console.log(label.label, "yesw");


    if (!this.array2.some((data) => data == label.label)) {
      this.array1.push(label.id);
      this.array2.push(label.label);
      this.addLabelList(label)
    }
    else {

      const index = this.array2.indexOf(label.label, 0);
      if (index > -1) {
        this.array2.splice(index, 1);
      }
    }

  }
  deleteforever() {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'trash' }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.model = {
          "isDeleted": true,
          "noteIdList": [this.arrayOfNotes]
        }
        this.service.postDelete('notes/deleteForeverNotes', this.model, this.token).subscribe(data => {
          this.delEvent.emit();
          this.snackBar.open("note deleted  permanently", "trash", {
            duration: 10000,
          });
        })

      }
    });
  }
  // restore(){
  //   this.model={
  //     "isDeleted":false,
  //     "noteIdList":[this.arrayOfNotes]
  //   }
  //   this.service.postDelete('notes/deleteForeverNotes',this.model,this.token).subscribe(data=>{
  //     // this.delEvent.emit();
  //     this.snackBar.open("note restored", "notes", {
  //       duration:10000,
  //     });
  //   })

  // }

}



