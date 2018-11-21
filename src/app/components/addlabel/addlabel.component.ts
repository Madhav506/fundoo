import { Component, Inject, EventEmitter, Output, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service'
import { NotesService } from '../../core/services/notes/notes.service'
import { DataService } from '../../core/services/data/data.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Label } from '../../core/model/label';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

export class AddlabelComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

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
  constructor(public service: HttpService,public notesService:NotesService, public dataService: DataService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.changeText = false;

  }
  @ViewChild('editDiv') editDiv: ElementRef;

  ngOnInit() {
    this.getLabel();

  }
  private label;
  private ArrayOfLabel:Label[]=[];
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
    let label = this.label;
    for (let j = 0; j < this.ArrayOfLabel.length; j++) {
      if (this.ArrayOfLabel[j].label == label) {
        this.message = "label  already exists"
        return false;
      }
    }
    let model = {
      "label": this.label,
      "isDeleted": false,
      "userId": this.id
    }
    this.notesService.postNoteLabels( model)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.clear();

      this.getLabel();

    }),
      error => {
        LoggerService.log( "error",error);
      }
  }


/*  get labels whatever the labels are present in labelarray */

  getLabel() {
    this.notesService.getLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      LoggerService.log(result['data'].details);
      this.ArrayOfLabel = [];
      let response:Label[]=[]=result['data'].details;

      for (let index = 0; index < response.length; index++) {
        if (response[index].isDeleted == false) {
          this.ArrayOfLabel.push(response[index]);
        }
      }
      this.eventTwo.emit(this.ArrayOfLabel);

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
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      if (data) {
        this.notesService.deleteData( labelid)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {

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

    let body = {
      "label": this.newLabel,
      "isDeleted": false,
      "id": label.id,
      "userId": this.id
    }
    this.notesService.postUpdateNotelabel( label.id, body)
    .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.dataService.change(true);
        this.getLabel();
      }),
      error => {
        LoggerService.log( "error",error);
      }
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
