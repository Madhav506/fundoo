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
  private showLoader=false;
/**Get all the archived notes in archived state */
  getAllNotes() {
    this.noteService.getArchiveNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.arrayData=[];
      let response:Note[]=[]= data['data'].data;
      for(let i=response.length-1;i>=0;i--){
        /**if the notes are archived and not deleted then push to archive array */
        if(response[i].isArchived==true && response[i].isDeleted==false){
          this.arrayData.push(response[i]);
        } 
      }
      this.showLoader=true;
      // this.arrayData =response.reverse();
    })
  }
  
  archive(event) {
    this.getAllNotes();
  }
  /**A callback method that performs custom clean-up,
   *  invoked immediately after a directive, 
   * pipe, or service instance is destroyed.
   */
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
