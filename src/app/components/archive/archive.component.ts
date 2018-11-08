import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  constructor(public service: HttpService) { }
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    this.getAllNotes();
  }
  arrayData = [];
  token = localStorage.getItem('token');

  getAllNotes() {
    
    this.service.getCardData("notes/getArchiveNotesList", this.token).subscribe(data => {
      // console.log(data);
      this.arrayData = data['data'].data.reverse();
      // console.log(this.arrayData);
    }),
      error => {
        console.log("Error", error);

      }
  }
  archive(event) {
    this.getAllNotes();
  }
}
