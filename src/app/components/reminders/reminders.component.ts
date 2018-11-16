import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  public arrayData1 = [];
  public arrayData = [];
  @Output() notesEvent = new EventEmitter<any>();
  

  constructor(public snackBar: MatSnackBar, public service: HttpService) { }
  ngOnInit() {
    this.getReminderNotes();
    
  
  }
  public token = localStorage.getItem('token')
  getReminderNotes() {
    this.service.getCardData('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        LoggerService.log('get reminder', data);
        this.arrayData = data['data']['data'].reverse();
        // this.arrayData.sort(this.sortedItems);
         this.arrayData.sort((oldDate, newDate) =>
        new Date(oldDate.reminder).getTime() - new Date(newDate.reminder).getTime()
    );
        this.notesEvent.emit();
      })
    error => {
      LoggerService.log('error', error);
    }
   
  }
  
  reminders(event) {
    this.getReminderNotes();
  }
  // new($event){
  //   this.notesEvent.emit();
  // }
}
