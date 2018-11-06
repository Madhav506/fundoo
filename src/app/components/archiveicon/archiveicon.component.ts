import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-archiveicon',
  templateUrl: './archiveicon.component.html',
  styleUrls: ['./archiveicon.component.css']
})
export class ArchiveiconComponent implements OnInit {
  @Input() archiveNotesArray;
  @Output() archiveEvent = new EventEmitter<any>()
  @Output() unarchiveEvent = new EventEmitter<any>()

  constructor(public service: HttpService, public snackBar: MatSnackBar) { }
  ngOnInit() {

  }
  token = localStorage.getItem('token')

  archiveNotes() {
    // console.log(this.archiveNotesArray);

    // console.log(this.archiveNotesArray.id,"archived");
    var model = {
      "isArchived": true,
      "noteIdList": [this.archiveNotesArray.id]
    }
    this.service.postDelete("notes/archiveNotes", model, this.token).subscribe(data => {
      // console.log("archive note",data);
      this.snackBar.open("note archived successfully,please check in archive", "archive", {
        duration: 10000,

      });
      this.archiveEvent.emit();

    }),
      error => {
        console.log("Error", error);

      }
  }
  unarchiveNotes() {
    // console.log(this.archiveNotesArray);
    // console.log(this.archiveNotesArray.id,"unarchived");
    var model = {
      "isArchived": false,
      "noteIdList": [this.archiveNotesArray.id]
    }
    this.service.postDelete("notes/archiveNotes", model, this.token).subscribe(data => {
      // console.log("unarchive note",data);
      this.unarchiveEvent.emit();
      this.snackBar.open("note unarchived successfully,please check in notes", "notes", {
        duration: 10000,

      });


    }),
      error => {
        console.log("Error", error);

      }
  }

}
