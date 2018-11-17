import { Component, OnInit, Output, EventEmitter,ViewChild, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar, MatMenu } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { RemindiconComponent } from '../remindicon/remindicon.component';

@Component({
  selector: 'app-notescard',
  templateUrl: './notescard.component.html',
  styleUrls: ['./notescard.component.scss']
})



export class NotescardComponent implements OnInit {
  @Output() noteEvent = new EventEmitter<any>();
  @Output() colorevent = new EventEmitter<any>();
  @Output() archive = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() newEvent = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  @Output() unarchive = new EventEmitter<any>();
  @Output() reminderEvent = new EventEmitter<any>();
  @Output() pinEvent = new EventEmitter<any>();
  @Output() stateEvent = new EventEmitter<Event>();

  // @ViewChild(RemindiconComponent) childComponentMenu: RemindiconComponent;

  todaydate = new Date();

  tomorrow = new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(),
    (this.todaydate.getDate() + 1));
    @Input() myData
    @Input() searchInput;
    @Input() name;
    @Input() string;
  public token = localStorage.getItem('token')
  public element;
  public checkArray = [];
  public isChecked = false;
  public view;
  @Input()  length;
  condition = true;
  public message: Event;
  public values: any;
  constructor(public service: HttpService, public dialog: MatDialog, public dataService: DataService) {
    this.dataService.cMsg.subscribe(message => {
      LoggerService.log('message' + message);

      if (message) {
        this.updateEvent.emit();

      }
    }),
      this.dataService.currentmsg.subscribe(response => {
        this.condition = response;
      })
  }

  ngOnInit() {
    console.log('i am string',this.string);
    console.log('i am length',this.length);


  }
  public data;

  gotMessage($event) {
    console.log('helooo');

    this.noteEvent.emit();

  }
  color($event) {
    this.colorevent.emit();

  }
  myArchive($event) {
    this.archive.emit();

  }
  unarchived($event) {

    this.unarchive.emit()

  }
  remind(event) {
    this.reminderEvent.emit();

  }
  newPinMessage($event) {
    console.log('yesss1');

    this.pinEvent.emit();

  }


  delete(event) {
    this.deleted.emit();
  }

  openDialog(dialogData): void {

    // this.updateEvent.emit();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      height: 'auto',
      data: dialogData,
      panelClass: 'myapp-no-padding-dialog'

    });
    const sub = dialogRef.componentInstance.eventOne.subscribe((data) => {
      // console.log("sub", data);
      this.updateEvent.emit();
    });
    // console.log(dialogRef,"dialogggg")
    dialogRef.afterClosed().subscribe(data => {
      LoggerService.log('The dialog was closed');
      this.updateEvent.emit();
    });
  }

  checkBox(checkList, note) {
    LoggerService.log(note);
    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.updatelist(note);
  }

  checkReminder(date) {
    var savedReminder = new Date().getTime();
    var value = new Date(date).getTime();
    if (value > savedReminder) {
      return true;
    }
    else false;
  }

  updatelist(id) {
    var checklistData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    LoggerService.log('checklist', checklistData);

    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    var checkNew = JSON.stringify(checklistData);

    this.service.postDelete(url, checkNew, this.token).subscribe(response => {
      LoggerService.log('response', response);
      this.colorevent.emit();

    })
  }


  newMessage(event) {
    if (event) {
      this.message = event;
    }
  }


  removeAssignments(labelid, noteid) {
    // console.log(labelid);
    // console.log(noteid);

    this.service.postDelete("notes/" + noteid + "/addLabelToNotes/" + labelid + "/remove", {}, this.token)
      .subscribe(response => {
        // console.log("removing labels",response);
        this.updateEvent.emit();

      });
    error => {
      console.log("error");

    }

  }
  model = {};

  removeReminders(noteid) {
    LoggerService.log(noteid)
    this.model = {
      'noteIdList': [noteid],
    }
    this.service.postDelete("notes/removeReminderNotes", this.model, this.token)
      .subscribe(data => {
        LoggerService.log('reminder data removed', data);
        this.updateEvent.emit();
      });
    error => {
      console.log("error");

    }

  }
  public modifiedCheckList;
  state(event) {
    this.dataService.changeLabel(event);

  }

}



