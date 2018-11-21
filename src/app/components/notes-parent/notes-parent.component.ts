import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { LoggerService } from '../../core/services/logger/logger.service';
import { Note } from '../../core/model/note';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes-parent',
  templateUrl: './notes-parent.component.html',
  styleUrls: ['./notes-parent.component.scss']
})
export class NotesParentComponent implements OnInit,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();

  private arrayPinData=[];
 public myArrayData=[];
  private isPined=false;
  // @Output() pinEvent = new EventEmitter<any>();

  constructor(public service: HttpService,public notesService:NotesService) { }

  ngOnInit() {
    this.getAllNotes();
    this.getPinNotes();
  }
 public  arrayData = [];
 private arrayNewData:Note[]=[];
  token = localStorage.getItem('token');
  notes(event)
  {
    // if(event){
    this.getAllNotes();
    this.getPinNotes();
  // }
  }
  noteOff(newData:Note){
    this.arrayNewData.splice(0,0,newData)
    
  }

  getAllNotes() {
    this.notesService.getNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.arrayData = data['data'].data.reverse();
      this.arrayNewData = [];

      let response:Note[]=[]=data['data'].data;

      for (let i = 0; i < data['data'].data.length - 1; i++) {
        if (response[i].isDeleted == false && response[i].isArchived == false
      && response[i].isPined == false) {
          this.arrayNewData.push(response[i]);
          // LoggerService.log('dataaaa',this.arrayNewData)

        }
      }
    }),
      error => {
        LoggerService.log("Error", error);

      }


  }
  
  getPinNotes() {

    this.notesService.getNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.arrayPinData = [];
      this.myArrayData = data['data'].data.reverse();
      for (let i = 0; i < data['data'].data.length - 1; i++) {
        if(data['data'].data[i].isPined == true) {
          this.arrayPinData.push(data['data'].data[i]);
        }

      }
      // LoggerService.log('arrayPinData',this.arrayPinData);
      // this.pinEvent.emit();
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