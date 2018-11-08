import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-notescard',
  templateUrl: './notescard.component.html',
  styleUrls: ['./notescard.component.css']
})
export class NotescardComponent implements OnInit {
  @Output() noteEvent = new EventEmitter<any>();
  @Output() colorevent = new EventEmitter<any>();
  @Output() archive = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() newEvent = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();
  @Output() unarchive = new EventEmitter<any>();

  token = localStorage.getItem('token')
  public element;
  @Input() myData
  @Input() searchInput;
  @Input() name;
  condition = true;
  constructor(public service: HttpService, public dialog: MatDialog, public dataService: DataService) {
    this.dataService.cMsg.subscribe(message => {
      LoggerService.log('message'+message);

      if (message) {
        this.updateEvent.emit();

      }
    }),
      this.dataService.currentmsg.subscribe(response => {
        this.condition = response;
      })
  }
  public data;

  gotMessage($event) {

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
      console.log('The dialog was closed');
      this.updateEvent.emit();
    });
  }



  ngOnInit() {

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

}



