import { Component, OnInit,Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment'; 
import * as moment_1 from 'moment';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { HttpService } from '../../core/services/http/http.service';

const moment = moment_1|| _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-remindicon',
  templateUrl: './remindicon.component.html',
  styleUrls: ['./remindicon.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RemindiconComponent implements OnInit {
  @Input() reminders;

  constructor(public snackBar:MatSnackBar,public service:HttpService) { }

  ngOnInit() {
    this.getReminder();
  }

  date = new FormControl(moment());
  time = new FormControl('8.00 PM');
  token=localStorage.getItem('token');
  today(){
    var todayNew;
    todayNew=new Date();
    LoggerService.log('today',todayNew)
  }
  getReminder() {
    this.service.getCardData('/notes/getReminderNotesList', this.token)
      .subscribe(data => {
        console.log(data)
      })
    error => {
      console.log(error)
    }
  }
  body={};
  todayReminder() {
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.reminders.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
      }
    this.service.postDelete('/notes/addUpdateReminderNotes', this.body, this.token)
      .subscribe(data => {
        LoggerService.log('data',data);
      },
        error => {
          LoggerService.log('error',error);
        })
  }
  tomorrowReminder() {
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.reminders.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
      }
    this.service.postDelete('/notes/addUpdateReminderNotes', this.body, this.token)
      .subscribe(data => {
        LoggerService.log('data',data);
      },
        error => {
          LoggerService.log('error',error);
        })
  }
  weekReminder() {
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.reminders.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
      }
    this.service.postDelete('/notes/addUpdateReminderNotes', this.body, this.token)
      .subscribe(data => {
        LoggerService.log('data',data);
      },
        error => {
          LoggerService.log('error',error);
        })
  }

}



  
