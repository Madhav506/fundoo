import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { MatSnackBar } from '@angular/material';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-moreicon',
  templateUrl: './moreicon.component.html',
  styleUrls: ['./moreicon.component.scss']
})
export class MoreiconComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() arrayOfNotes;
  @Input() arrayOfMynotes;
  @Output() delEvent = new EventEmitter<any>();
  @Output() moreEvent = new EventEmitter<any>();
  @Input() name;

  private ArrayOfLabel = [];
  public checklist = [];
  //  Forever
  public check = true;
  private array1 = [];
  private array2 = [];

  public noteArray;
  public isChecked;
  private model;
  public event: boolean;
  constructor(public service: HttpService,public notesService:NotesService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {

  }
  private token = localStorage.getItem('token')
  public temp;
  deleteNotes(arrayOfNotes) {

    LoggerService.log(this.arrayOfNotes);
    let model = {
      "isDeleted": true,
      "noteIdList": [this.arrayOfNotes]
    }
    this.notesService.postTrashNotes(model)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      LoggerService.log("delete note", data);
      this.snackBar.open("note deleted  successfully,please check in trash", "trash", {
        duration: 10000,

      });
      this.moreEvent.emit();

    })
  }
  getLabel() {

    this.notesService.getLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      LoggerService.log(result['data'].details);

      this.ArrayOfLabel = [];
      for (let index = 0; index < result['data'].details.length; index++) {
        if (result['data'].details[index].isDeleted == false) {
          this.ArrayOfLabel.push(result['data'].details[index]);
        }
      }
      LoggerService.log("emitting",this.ArrayOfLabel);


    })
  }
  addLabelList(label) {

    LoggerService.log(label.id);
    LoggerService.log("noteid", this.arrayOfNotes);
    this.notesService.postAddLabelnotes(label.id, this.arrayOfNotes)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      LoggerService.log("adding label to note", response);

      this.moreEvent.emit(label);

    })
   
  }
  selectCheck(labelOption){
    
    if (this.arrayOfMynotes.noteLabels.some((data) => data.label == labelOption.label)) {
    return true;
    }
    else {

     return false;
  }
  }

  clickFunc(label) {
    LoggerService.log(label);

    LoggerService.log(label.id, "yess");
    LoggerService.log(label.label, "yes...");


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
        this.notesService.postDeleteForeverNotes(this.model)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.delEvent.emit();
          this.snackBar.open("note deleted  permanently", "trash", {
            duration: 10000,
          });
        })

      }
    });
  }
  restore(arrayOfNotes) {
    let model = {
      "isDeleted": false,
      "noteIdList": [this.arrayOfNotes]
    }
    this.notesService.postTrashNotes(model)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.snackBar.open("note restored  successfully,please check in notes", "notes", {
        duration: 10000,

      });
      this.delEvent.emit();

    })
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}



