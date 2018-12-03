import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public arrayData1 = [];
  public arrayData = [];
  private showLoader=false;

  @Output() notesEvent = new EventEmitter<any>();
  

  constructor(public snackBar: MatSnackBar, public notesService:NotesService,public service: HttpService) { }
  ngOnInit() {
    this.getReminderNotes();
    
  
  }
  public token = localStorage.getItem('token')
  getReminderNotes() {
    this.notesService.getReminders()
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('get reminder', data);
        
        this.arrayData = data['data']['data'].reverse();
         this.arrayData.sort((oldDate, newDate) =>
        new Date(oldDate.reminder).getTime() - new Date(newDate.reminder).getTime()
    );
    this.showLoader=true;
        this.notesEvent.emit();
      })
    
   
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
 
  reminders(event) {
    this.getReminderNotes();
  }
  
}
