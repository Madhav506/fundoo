import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  arrayData1= [];
  arrayData=[];
@Output() notesEvent=new EventEmitter<any>();

  constructor(public snackBar:MatSnackBar,public service:HttpService) { }
  ngOnInit() {
    this.getReminderNotes();
  }
  token=localStorage.getItem('token')
  getReminderNotes() {
    this.service.getCardData('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        LoggerService.log('get reminder',data);
        // this.arrayData=data['data']['data'];
        this.arrayData = data['data']['data'].reverse();
        this.arrayData.sort()
        // this.notesEvent.emit();
      })
    error => {
      LoggerService.log('error',error);
        }
  }
  reminders(event) {
    this.getReminderNotes();
  }
  // new($event){
  //   this.notesEvent.emit();
  // }
}
