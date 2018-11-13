import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-coloricon',
  templateUrl: './coloricon.component.html',
  styleUrls: ['./coloricon.component.scss']
})
export class ColoriconComponent implements OnInit {
  @Input() myNewColor
  @Output() response = new EventEmitter<string>()
  @Output() responseNew = new EventEmitter<string>()

  newColor = 1;
  constructor(public service: HttpService, public snackBar: MatSnackBar) { }
  token = localStorage.getItem("token");

  ngOnInit() {
  }
  colorsObject = [

  [{ 'color': '#ccff90', 'tipname': 'Green' },
  { 'color': '#cbf0f8', 'tipname': 'Blue' },
  { 'color': '#a7ffeb', 'tipname': 'Teal' },
  { 'color': '#aecbfa', 'tipname': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'tipname': 'Purple' },
  { 'color': '#e6c9a8', 'tipname': 'Brown' },
  { 'color': '#fdcfe8', 'tipname': 'Pink' },
  { 'color': '#e8eaed', 'tipname': 'Gray' }],

  [{ 'color': '#ffffff', 'tipname': 'White' },
  { 'color': '#f28b82', 'tipname': 'Red' },
  { 'color': '#fbbc04', 'tipname': 'Orange' },
  { 'color': '#fff475', 'tipname': 'Yellow' }],]

  changeColor(paint) {
    this.responseNew.emit(paint);

    var content = {
      "color": paint,
      "noteIdList": [this.myNewColor]
    }
    this.service.postDelete("notes/changesColorNotes", content, this.token).subscribe(data => {
      // console.log("color is", this.myNewColor);
      this.snackBar.open("colour changed  successfully", "colorchange", {
        duration: 10000,

      });
      this.response.emit();

    }),
      error => {
        console.log(error);
      }

  }

}
