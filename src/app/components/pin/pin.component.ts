import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { LoggerService } from '../../core/services/logger/logger.service';
import { MatSnackBar } from '@angular/material';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() eventEmit = new EventEmitter<any>();
  @Input() noteId
  constructor(public service: HttpService,public notesService:NotesService, public snackBar: MatSnackBar) { }
  public isDeleted = false;
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

    if (this.noteId != undefined) {
      if (this.noteId.isPined == true) {
        this.newPin = false;
      }
      let arrayNoteId = []
      arrayNoteId.push(this.noteId.id)
      LoggerService.log('arrayNoteId',arrayNoteId);
      if (this.noteId.id != undefined) {
        let body = {
          "isPined": this.newPin,
          "noteIdList": arrayNoteId
        }
        this.notesService.postPinUnpin( body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          LoggerService.log('data', data);
          LoggerService.log(this.noteId)
          this.eventEmit.emit({});

        });


      }
    }
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}



