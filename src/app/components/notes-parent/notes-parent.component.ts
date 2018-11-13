import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-notes-parent',
  templateUrl: './notes-parent.component.html',
  styleUrls: ['./notes-parent.component.scss']
})
export class NotesParentComponent implements OnInit {
  arrayPinData=[];
  myArrayData=[];
  // @Output() pinEvent = new EventEmitter<any>();

  constructor(public service: HttpService) { }

  ngOnInit() {
    this.getAllNotes();
    this.getPinNotes();

  }
  arrayData = [];
  arrayNewData = [];

  token = localStorage.getItem('token');
  notes(event)
  {
    this.getAllNotes();
    this.getPinNotes();
  }

  getAllNotes() {
    this.service.getCardData("notes/getNotesList", this.token).subscribe(data => {
      this.arrayData = data['data'].data.reverse();
      this.arrayNewData = [];
      for (var i = 0; i < data['data'].data.length - 1; i++) {
        if (data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false
      && data['data'].data[i].isPined == false) {
          this.arrayNewData.push(data['data'].data[i]);
        }
      }
    }),
      error => {
        LoggerService.log("Error", error);

      }


  }
  getPinNotes() {
    console.log('yesss2');

    this.service.getCardData("notes/getNotesList", this.token).subscribe(data => {
      this.arrayPinData = [];
      this.myArrayData = data['data'].data.reverse();
      for (var i = 0; i < data['data'].data.length - 1; i++) {
        if(data['data'].data[i].isPined == true) {
          this.arrayPinData.push(data['data'].data[i]);
        }

      }
      console.log(this.arrayPinData);
      // this.pinEvent.emit();
    }),
      error => {
        LoggerService.log("Error", error);

      }


  }

}