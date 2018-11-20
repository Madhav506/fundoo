import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {


  constructor(public service: HttpService,public notesService:NotesService) { }
  private myData = []

  name = 'trash';
  token = localStorage.getItem('token')
  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.notesService.getNotesList().subscribe(data => {
      this.myData = data['data'].data.reverse();
      this.myData = []
      for (var i = 0; i < data['data'].data.length - 1; i++) {
        if (data['data'].data[i].isDeleted == true) {
          this.myData.push(data['data'].data[i]);
        }
      }
    }),
      error => {
        LoggerService.log("Error", error);

      }
  }

  notedelete(event) {
    this.getNotes();
  }


}
