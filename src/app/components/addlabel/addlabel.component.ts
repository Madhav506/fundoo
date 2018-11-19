import { Component, Inject, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service'
import { DataService } from '../../core/services/data/data.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { LoggerService } from '../../core/services/logger/logger.service';

export interface DialogData {
  "title": String,
  "description": String,
  "notesIdList": String,
  "color": String
}
@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.scss']
})

export class AddlabelComponent implements OnInit {
  @Output() eventNew = new EventEmitter<string>();
  @Output() eventTwo = new EventEmitter();
  private changeText: boolean;
  private clickEdit;
  private idEdit;
  private iconEdit;
  private canEdit;
  private editLabel;
  private messageDisplay;
  private message;
  constructor(public service: HttpService, public dataService: DataService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.changeText = false;

  }
  @ViewChild('editDiv') editDiv: ElementRef;

  ngOnInit() {
    this.getLabel();

  }
  private label;
  private ArrayOfLabel = [];
  private newLabel;
  clear() {
    this.label = ' ';
  }
  close() {
    this.dialogRef.close();
    this.addLabel();
    this.getLabel();

  }

  id = localStorage.getItem('userId')
  token = localStorage.getItem('token')

            /* ****************adding labels********************************/
            
  addLabel() {
    var label = this.label;
    // console.log(this.ArrayOfLabel);
    for (var j = 0; j < this.ArrayOfLabel.length; j++) {
      if (this.ArrayOfLabel[j].label == label) {
        this.message = "label  already exists"
        return false;
      }
    }
    var model = {
      "label": this.label,
      "isDeleted": false,
      "userId": this.id
    }
    this.service.postDelete("noteLabels", model, this.token).subscribe(result => {
      // console.log("adding label")
      this.clear();

      this.getLabel();

      // console.log(result);
    }),
      error => {
        LoggerService.log( "error",error);
      }
  }


/*  get labels whatever the labels are present in labelarray */

  getLabel() {
    this.service.getCardData("noteLabels/getNoteLabelList", this.token).subscribe(result => {
      console.log(result['data'].details);
      this.ArrayOfLabel = [];
      for (var index = 0; index < result['data'].details.length; index++) {
        if (result['data'].details[index].isDeleted == false) {
          this.ArrayOfLabel.push(result['data'].details[index]);
        }
      }
      // console.log(this.ArrayOfLabel);
      this.eventTwo.emit(this.ArrayOfLabel);
      // console.log("emitting");

    }),
      error => {
        LoggerService.log( "error",error);
      }
  }
  edit(label) {
    this.clickEdit = true;
    this.iconEdit = false;
    this.canEdit = true;
    this.idEdit = label.id;
    this.editLabel = label.label;

  }
/*  Delete labels whatever the labels are present in labelarray */

  deleteLabel(labelid) {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: '500px',
      panelClass: 'myapp-no-paddding-dialog',
      data: { name: 'label' }
    });
    dialogRef.afterClosed().subscribe(data => {
      // console.log(labelid);
      if (data) {
        this.service.deleteData("noteLabels/" + labelid + "/deleteNoteLabel").subscribe(result => {
          // console.log("delete note label");

          this.dataService.change(true);

          this.eventTwo.emit();
          this.getLabel();
        });
      }

    }),
      error => {
        LoggerService.log( "error",error);
      }
  }

/*  edit the labels whatever the labels are present in labelarray */

  editlabel(label) {
    this.iconEdit = true;
    this.clickEdit = false;
    this.canEdit = false;
    this.newLabel = this.editDiv.nativeElement.innerHTML
    // console.log(this.newLabel, "label");

    var body = {
      "label": this.newLabel,
      "isDeleted": false,
      "id": label.id,
      "userId": this.id
    }
    this.service.postDelete("noteLabels/" + label.id + "/updateNoteLabel", body, this.token)
      .subscribe(result => {
        // console.log("update note label", result);
        this.dataService.change(true);

        this.getLabel();

      }),
      error => {
        LoggerService.log( "error",error);
      }
  }



}
