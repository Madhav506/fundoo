import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
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
export interface List{
  value:string;
  newValue:string;
}

@Component({
  selector: 'app-remindicon',
  templateUrl: './remindicon.component.html',
  styleUrls: ['./remindicon.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class RemindiconComponent implements OnInit {
@Input() noteId;
@Output() remindEvent=new EventEmitter<any>()
  constructor(public snackBar:MatSnackBar,public service:HttpService) { }

  ngOnInit() {
    // this. getReminderNotes() ;
  }
public flag:boolean=false;
  date = new FormControl(moment());
  // time = new FormControl('8.00 PM');
  token=localStorage.getItem('token');
  public  morningTime;
  selectedItem: string;

  lists: List[] = [
    {value: 'Morning ', newValue: ' Morning  8:00 AM'},
    {value: 'Afternoon ', newValue: 'Afternoon 1:00 PM'},
    {value: 'Evening  ', newValue: ' Evening  6:00 PM'},
    {value: 'Night  ', newValue: 'Night   8:00 PM'},
  ];
  


 
  // getReminderNotes() {
  //   this.service.getCardData('/notes/getReminderNotesList', this.token)
  //     .subscribe(data => {
  //       LoggerService.log('get reminder',data);
  //     })
  //   error => {
  //     LoggerService.log('error',error);
  //       }
  // }
  model={};
  
  todaysReminder() {
    var currentDate = new Date();
    this.model =
      {
        'noteIdList': [this.noteId.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 20, 0, 0)
      }
    this.service.postDelete('/notes/addUpdateReminderNotes', this.model, this.token)
      .subscribe(data => {
        LoggerService.log('todays reminder',data);
        this.remindEvent.emit();
      },
        error => {
          LoggerService.log('error',error);
        })
  }

  tomorrowsReminder() {
    var currentDate = new Date();
    // var tomorrow;
    this.model =
      {
        'noteIdList': [this.noteId.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
      }
    this.service.postDelete('/notes/addUpdateReminderNotes', this.model, this.token)
      .subscribe(data => {
        LoggerService.log('tomorrows reminder',data);
        this.remindEvent.emit();
      },
        error => {
          LoggerService.log('error',error);
        })
  }
  weeklyReminder() {
    var currentDate = new Date();
    this.model =
      {
        'noteIdList': [this.noteId.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
      }
    this.service.postDelete('/notes/addUpdateReminderNotes', this.model, this.token)
      .subscribe(data => {
        LoggerService.log('Weekly  reminder',data);
        this.remindEvent.emit();
      },
        error => {
          LoggerService.log('error',error);
        })
  }
  morning(){
    this.morningTime='8.00AM'
  }

}



  
