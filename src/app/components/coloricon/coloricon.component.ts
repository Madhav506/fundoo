import { Component, Output, Input, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-coloricon',
  templateUrl: './coloricon.component.html',
  styleUrls: ['./coloricon.component.scss']
})
export class ColoriconComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() myNewColor
  @Output() response = new EventEmitter<string>()
  @Output() responseNew = new EventEmitter<string>()

  private newColor = 1;
  constructor(public service: HttpService, public noteService:NotesService,public snackBar: MatSnackBar) { }
  private token = localStorage.getItem("token");

  ngOnInit() {
  }
  /*  applying array of colors for cards*/

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

      /*  Changing  the colors for cards*/

  changeColor(paint) {
    this.responseNew.emit(paint);
console.log(this.myNewColor);

    let content = {
      "color": paint,
      "noteIdList": [this.myNewColor]
    }
    this.noteService.postChangeColor( content)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.snackBar.open("colour changed  successfully", "colorchange", {
        duration: 10000,

      });
      this.response.emit();

    }),
      error => {
        LoggerService.log(error);
      }

  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
