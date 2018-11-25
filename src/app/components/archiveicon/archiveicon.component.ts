import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-archiveicon',
  templateUrl: './archiveicon.component.html',
  styleUrls: ['./archiveicon.component.scss']
})
export class ArchiveiconComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() archiveNotesArray;
  @Output() archiveEvent = new EventEmitter<any>()
  @Output() unarchiveEvent = new EventEmitter<any>()
  
  public model;

  constructor(public service: HttpService, public snackBar: MatSnackBar,public noteService:NotesService) { }
  ngOnInit() {

  }

  archiveNotes() {

     this.model = {
      "isArchived": true,
      "noteIdList": [this.archiveNotesArray.id]
    }
    this.noteService.postArchiveNotes( this.model)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.snackBar.open("note archived successfully,please check in archive", "archive", {
        duration: 10000,

      });
      this.archiveEvent.emit();

    })
  }
  unarchiveNotes() {
    let model = {
      "isArchived": false,
      "noteIdList": [this.archiveNotesArray.id]
    }
    this.noteService.postArchiveNotes( model)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.unarchiveEvent.emit();
      this.snackBar.open("note unarchived successfully,please check in notes", "notes", {
        duration: 10000,

      });
    })
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
