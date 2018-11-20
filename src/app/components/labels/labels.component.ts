import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../core/services/http/http.service'
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Note } from '../../core/model/note';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  private labelName;
  constructor(public activeRoute: ActivatedRoute,public notesService:NotesService, public service: HttpService) {
    this.activeRoute.params.subscribe(params => {
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
   * this getAllNotes method used to display the notes with selected labels in label state particularly
   */
  getAllNotes() {
    this.notesService.getNotesList().subscribe(data => {
     
      var response:Note[]=[]= data['data'].data;
      this.arrayData = response.reverse();
      this.arrayNewData = [];
      for (var i = 0; i < response.length - 1; i++) {
        if (response[i].isDeleted == false && response[i].isArchived == false) {
          for (let noteLabelIndex = 0; noteLabelIndex < response[i].noteLabels.length;
            noteLabelIndex++) {
            if (response[i].noteLabels[noteLabelIndex].label == this.labelName) {
              this.arrayNewData.push(response[i]);
            }
          }
        }

      }
    }),
      error => {
        LoggerService.log("Error", error);

      }
  }

}
