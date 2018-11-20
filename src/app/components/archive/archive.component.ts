import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service'
import { Note } from '../../core/model/note';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public service: HttpService,public noteService:NotesService) { }
  /**OnInit is a lifecycle hook that is called after Angular has initialized all 
   * data-bound properties of a directive. */
  ngOnInit() {
    this.getAllNotes();
  }
  private  arrayData :Note[]=[]

  getAllNotes() {

    this.noteService.getArchiveNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      var response:Note[]=[]= data['data'].data;
            this.arrayData =response.reverse();
    }),
      error => {
        LoggerService.log("Error", error);

      }
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  archive(event) {
    this.getAllNotes();
  }
}
