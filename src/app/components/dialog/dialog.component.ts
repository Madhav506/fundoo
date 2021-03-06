import { Component, OnInit, Inject, ViewChild, ElementRef, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service'
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DialogCollaboratorComponent } from '../dialog-collaborator/dialog-collaborator.component';

export interface DialogData {
  "title": String,
  "description": String,
  "notesIdList": String,
  "color": String
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() archiveEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Input() noteId;
  @Input() archiveNotesArray
  @Input() archiveNotes = { 'isArchived': false }
  eventOne = new EventEmitter<boolean>();
  model: { 'noteIdList': any[]; };
  public message;
  public reminderNew;
  public remindArray: any[];

  constructor(public service: HttpService, public dataService: DataService,
    public dialogRef: MatDialogRef<DialogComponent>,public notesService:NotesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  public dialog: MatDialog,public snackBar: MatSnackBar) {

  }
  private title;
  private note;
  private id;
  private array1 = [];
  private array2 = [];
  public  addcheck;
  public  temp;
  public newLabel;
  private checkArray = [];
  private newList;
  private newData: any = {}
  private modifiedCheckList;
  private checklist = false;
  color;
  private collaborators=[];
  ngOnInit() {
    this.array1 = this.data['noteLabels'];
    this.array2 = this.data['reminder'];
    this.color=this.data['color'];
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.collaborators.push(this.data['collaborators'][i]);
    }

    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.checkArray = this.data['noteCheckLists']
  }
  newMessage(event) {

    if (event) {
      this.message = event;
    }
  }

  onClick(): void {
    this.dialogRef.close();
  }
  more(temp) {
    this.array1.push(temp);
  }
  
  archive(event) {
    this.archiveEvent.emit();
  }
  close() {
    this.update();

  }
  token = localStorage.getItem('token');

  update() {

    if (this.checklist == false) {
      let id = this.data['id'];
      this.title = document.getElementById('title').innerHTML;
      this.note = document.getElementById('note').innerHTML;

      let model = {
        "noteId": [id],
        "title": this.title,
        "description": this.note,

      }

      this.notesService.updateNotes(model)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.snackBar.open("note updated successfully", "update", {
          duration: 10000,


        });
        this.archiveEvent.emit();


      })
    }
    else {
      let apiData = {
        "itemName": this.modifiedCheckList.itemName,
        "status": this.modifiedCheckList.status
      }
      
      this.notesService.postUpdateChecklist(this.data['id'],this.modifiedCheckList.id,
       JSON.stringify(apiData))
       .pipe(takeUntil(this.destroy$))
       .subscribe(response => {
        this.archiveEvent.emit();

      })

    }
    
  }

  editing(editedList, event) {

    if (event.code == "Enter") {
      this.modifiedCheckList = editedList;
      this.update();
    }

  }

  checkBox(checkList) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.modifiedCheckList = checkList;
    this.update();
  }

  public removedList;
  removeList(checklist) {
    LoggerService.log(checklist)
    this.removedList = checklist;
    this.removeCheckList()
  }
  removeCheckList() {

    this.notesService.postChecklistRemove(this.data['id'] , this.removedList.id ,null)
    .pipe(takeUntil(this.destroy$))
                     .subscribe((response) => {
      for (let i = 0; i < this.checkArray.length; i++) {
        if (this.checkArray[i].id == this.removedList.id) {
          this.checkArray.splice(i, 1)
        }
      }
    })
  }

  public adding = false;
  public addCheck = false;
  public status = "open"

      /* adding the checklist of items for cards*/


  addList(event) {
    if (this.newList != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    if (event.code == "Enter") {
      if (this.addCheck == true) {
        this.status = "close";
      }
      else {
        this.status = "open"
      }
      this.newData = {
        "itemName": this.newList,
        "status": this.status
      }

      this.notesService.postCheckListAdd(this.data['id'], this.newData)
      .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          LoggerService.log('response',response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          this.checkArray.push(response['data'].details);
          LoggerService.log('checkArray', this.checkArray)

        })
    }
  }
        /* removing the label for cards*/

  removeAssignments(label, noteid) {
    this.notesService.postAddLabelnotesRemove( noteid,label.id)
    .pipe(takeUntil(this.destroy$))
                     .subscribe(response => {
        this.eventOne.emit(true)
        const index = this.array1.indexOf(label, 0);
        if (index > -1) {
          this.array1.splice(index, 1);
        }

      })

  }

    /* removing the reminders for cards*/

  removeReminders(item, noteid) {
    LoggerService.log(noteid)
    this.model = {

      'noteIdList': [noteid],
    }
    this.notesService.postRemoveReminders(this.model)
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('reminder data removed', data);
        this.eventOne.emit(true);
        const index = this.array2.indexOf(item, 0);
        if (index > -1) {
          this.array2.splice(index, 1);
        }

      })

  }
  colorNew(event){
    LoggerService.log('color',event)
    this.color=event;

  }
  closePopUp(){
this.dialogRef.close();
  }

  openCollaborator(noteData){
    LoggerService.log(noteData)
     this.dialog.open(DialogCollaboratorComponent, {
      maxWidth: 'auto',
      height: 'auto',
      data:noteData,
      panelClass: 'myapp-no-padding-dialog'

    });

    // dialogRef.afterClosed();
  }

  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
