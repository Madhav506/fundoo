import { Component, OnInit, Input, Output, EventEmitter,ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import * as _moment from 'moment'; 
// import * as moment_1 from 'moment';
import { MatSnackBar, MatMenu} from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { HttpService } from '../../core/services/http/http.service';
import { MatDatepickerModule } from "@angular/material";


@Component({
  selector: 'app-remindicon',
  templateUrl: './remindicon.component.html',
  styleUrls: ['./remindicon.component.scss'],
  // exportAs: 'otherComponent',
})



export class RemindiconComponent implements OnInit {

  @ViewChild(MatMenu) menu: MatMenu;

  @Input() noteId;
  @Output() remindEvent = new EventEmitter<any>()
  @Output() remindTopEvent = new EventEmitter<any>()
  dateflag=false;

  constructor(public snackBar: MatSnackBar, public service: HttpService) { }

  ngOnInit() {
  }
  public flag: boolean = false;
  public token = localStorage.getItem('token');

  
  public modelReminder = {
    "date": new FormControl(new Date()),
    "time": ""
  }
  public model = {};
  public show = true

  public currentDate = new Date();
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

    this.service.postDelete('notes/addUpdateReminderNotes', this.model, this.token)
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

    this.service.postDelete('notes/addUpdateReminderNotes', this.model, this.token)
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

    this.service.postDelete('notes/addUpdateReminderNotes', this.model, this.token)
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
    debugger;
    time.match('^[0-2][0-3]:[0-5][0-9]$');

    if (time == this.modelReminder.time) {
      LoggerService.log("model Time", this.modelReminder.time);
      var timeSlice = this.modelReminder.time.split("", 8);
      LoggerService.log("timeSlice", timeSlice);
      var hour = Number(timeSlice[0] + timeSlice[1]);
      LoggerService.log("hour", hour);
      var minute = Number(timeSlice[3] + timeSlice[4]);
      LoggerService.log("minute", minute);
      var meridian = (timeSlice[6] + timeSlice[7]);
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

    this.service.postDelete('notes/addUpdateReminderNotes', this.model, this.token)
      .subscribe((response) => {
        this.remindEvent.emit();
      })
  }
  disable(event)
  {
    this.dateflag=false;
    var pattern=/^(2[0-3]|1[0-9]|[0][0-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/;
   if(pattern.test( this.modelReminder.time))
   {
    this.dateflag=true;
   }
   else
   this.dateflag=false;
  }



}




