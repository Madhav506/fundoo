import { Component, OnInit, Input, Output, EventEmitter,ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatMenu} from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { HttpService } from '../../core/services/http/http.service';
import { MatDatepickerModule } from "@angular/material";
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-remindicon',
  templateUrl: './remindicon.component.html',
  styleUrls: ['./remindicon.component.scss'],
  exportAs: 'menuInOtherComponent',
})



export class RemindiconComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatMenu) menu: MatMenu;
  @Input() noteId;
  @Output() remindEvent = new EventEmitter<any>()
  @Output() remindTopEvent = new EventEmitter<any>()
  dateflag=false;
  setDate: any;

  constructor(public snackBar: MatSnackBar,public NotesService:NotesService, public service: HttpService) { }

  ngOnInit() {
  }
  public flag: boolean = false;
  private token = localStorage.getItem('token');

  
  public modelReminder = {
    "date": new FormControl(new Date()),
    "time": ""
  }
  private model = {};
  private show = true

  private currentDate = new Date();
  reminders: any[] = [
    { value: 'morning', viewDay: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewDay: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewDay: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewDay: 'Night', viewTime: '08:00 PM' }];

  todaysReminder() {
    
    this.model = {
      "noteIdList": [this.noteId.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
        this.currentDate.getDate(), 20, 0, 0, 0)
    }
    this.remindTopEvent.emit(this.model['reminder']);

    this.NotesService.postAddUpdateReminderNotes( this.model)
    .pipe(takeUntil(this.destroy$))

      .subscribe((response) => {

        this.remindEvent.emit();
      })
  }


  tomorrowsReminder() {

    this.model = {
      "noteIdList": [this.noteId.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
        (this.currentDate.getDate() + 1), 8, 0, 0, 0)
    }
    this.remindTopEvent.emit(this.model['reminder']);

    this.NotesService.postAddUpdateReminderNotes(this.model)
    .pipe(takeUntil(this.destroy$))

      .subscribe((response) => {

        this.remindEvent.emit();
      })
  }
  weeklyReminder() {
    this.model = {
      "noteIdList": [this.noteId.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
        (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    }
    this.remindTopEvent.emit(this.model['reminder']);

    this.NotesService.postAddUpdateReminderNotes( this.model)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {

      this.remindEvent.emit();
    })
  }
  showNHide() {
    this.show = !this.show;
  }
  return() {
    this.show = true;
  }

  customReminder(date, time) {
    time.match('^[0-2][0-3]:[0-5][0-9]$');

    if (time == this.modelReminder.time) {
      LoggerService.log("model Time", this.modelReminder.time);
      let timeSlice = this.modelReminder.time.split("", 8);
      LoggerService.log("timeSlice", timeSlice);
      let hour = Number(timeSlice[0] + timeSlice[1]);
      LoggerService.log("hour", hour);
      let minute = Number(timeSlice[3] + timeSlice[4]);
      LoggerService.log("minute", minute);
      let meridian = (timeSlice[6] + timeSlice[7]);
      LoggerService.log("meridian", meridian);

      if (meridian == 'AM' || meridian == 'am') {
        this.model = {
          "noteIdList": [this.noteId.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 
          minute, 0, 0)
        }

      } else if (meridian == 'PM' || meridian == 'pm') {
        this.model = {
          "noteIdList": [this.noteId.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12,
           minute, 0, 0)
        }

      }

    }
    this.remindTopEvent.emit(this.model['reminder']);

    this.NotesService.postAddUpdateReminderNotes(this.model)
    .pipe(takeUntil(this.destroy$))

      .subscribe((response) => {
        this.remindEvent.emit();
      })
  }
  disable(event)
  {
    this.dateflag=false;
    let pattern=/^(2[0-3]|1[0-9]|[0][0-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/;
   if(pattern.test( this.modelReminder.time))
   {
    this.dateflag=true;
   }
   else
   this.dateflag=false;
  }
  
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}




