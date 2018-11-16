import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {


  constructor(public service: HttpService) { }
  myData = []

  name = 'trash';
  token = localStorage.getItem('token')
  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.service.getCardData("notes/getNotesList", this.token).subscribe(data => {
      this.myData = data['data'].data.reverse();
      this.myData = []
      for (var i = 0; i < data['data'].data.length - 1; i++) {
        if (data['data'].data[i].isDeleted == true) {
          this.myData.push(data['data'].data[i]);
        }
      }
    }),
      error => {
        console.log("Error", error);

      }
  }

  notedelete(event) {
    this.getNotes();
  }


}
