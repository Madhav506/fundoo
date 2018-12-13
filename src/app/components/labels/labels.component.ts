import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service'
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Note } from '../../core/model/note';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private labelName;
  constructor(public activeRoute: ActivatedRoute,public notesService:NotesService, public service: HttpService) {
    this.activeRoute.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      if (params) {
        this.labelName = params.id;
        this.getAllNotes();
      }

    })
  }

  ngOnInit() {
    this.getAllNotes();
  }
 private  arrayData = [];
  private arrayNewData:Note[]=[];
  /**
   * this getAllNotes method used to display the notes with selected labels in 
   * label state particularly
   */
  getAllNotes() {
    this.notesService.getNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
     
      let response:Note[]=[]= data['data'].data;
      // this.arrayData = response.reverse();
      for(let i=response.length-1;i>=0;i--){
        if(response[i].isArchived==true && response[i].isDeleted==false){
          this.arrayData.push(response[i]);
        } 
      }
      this.arrayNewData = [];
      for (let i = 0; i < response.length - 1; i++) {
        if (response[i].isDeleted == false && response[i].isArchived == false) {
          for (let noteLabelIndex = 0; noteLabelIndex < response[i].noteLabels.length;
            noteLabelIndex++) {
            if (response[i].noteLabels[noteLabelIndex].label == this.labelName) {
              this.arrayNewData.push(response[i]);
            }
          }
        }

      }
    })
     
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
