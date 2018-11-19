import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { LoggerService } from '../../core/services/logger/logger.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Output() eventEmit = new EventEmitter<any>();
  @Input() noteId
  constructor(public service: HttpService, public snackBar: MatSnackBar) { }
  public isDeleted = false;
  token = localStorage.getItem('token');
  public body: any = {};
  public isPinned = false;
  private newPin = true;;
  ngOnInit() {
    if (this.noteId != undefined && this.noteId.isDeleted == true) {
      this.isDeleted = true;
    }
    if (this.noteId != undefined && this.noteId.isPined == true) {
      this.isPinned = true;

    }

  }

  pin() {
    this.eventEmit.emit();

    if (this.noteId != undefined) {
      if (this.noteId.isPined == true) {
        this.newPin = false;
      }
      var arrayNoteId = []
      arrayNoteId.push(this.noteId.id)
      console.log(arrayNoteId);
      if (this.noteId.id != undefined) {
        var body = {
          "isPined": this.newPin,
          "noteIdList": arrayNoteId
        }
        this.service.postDelete("notes/pinUnpinNotes", body, this.token).subscribe((data) => {
          LoggerService.log('data', data);
          LoggerService.log(this.noteId)
          this.eventEmit.emit();

        });


      }
    }
  }

}



