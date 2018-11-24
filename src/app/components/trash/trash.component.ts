import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(public service: HttpService,public notesService:NotesService) { }
  private myData = []

  name = 'trash';
  token = localStorage.getItem('token')
  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.notesService.getNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.myData = data['data'].data.reverse();
      this.myData = []
      for (let i = 0; i < data['data'].data.length - 1; i++) {
        if (data['data'].data[i].isDeleted == true) {
          this.myData.push(data['data'].data[i]);
          
        }
      }
    })
  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  notedelete(event) {
    this.getNotes();
  }


}
