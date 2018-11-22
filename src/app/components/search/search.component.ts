import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { DataService } from '../../core/services/data/data.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public service: HttpService,public notesService:NotesService, public dataService: DataService) { }
  searchInput;

  ngOnInit() {
    this.dataService.currentMessage
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.searchInput = message;
      LoggerService.log(this.searchInput, "searchComponent");

      this.getAllNotes();
      
    })


  }
  token = localStorage.getItem('token');
  private arrayData = [];
  private arrayNewData = [];

  getAllNotes() {
    this.notesService.getNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.arrayData = data['data'].data.reverse();
      this.arrayNewData = [];
      for (let i = 0; i < data['data'].data.length - 1; i++) {
        if (data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false) {
          this.arrayNewData.push(data['data'].data[i]);
        }

      }
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
}
