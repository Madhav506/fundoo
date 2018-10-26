import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archiveicon',
  templateUrl: './archiveicon.component.html',
  styleUrls: ['./archiveicon.component.css']
})
export class ArchiveiconComponent implements OnInit {
  @Input() archiveNotesArray;
@Output() archiveEvent=new EventEmitter
  constructor(public service:HttpService) { }

  ngOnInit() {

  }
  token=localStorage.getItem('token')

  archiveNotes(){
    
    console.log(this.archiveNotesArray);
    var model={
      "isArchived":true,
      "noteIdList":[this.archiveNotesArray]
    }
    this.service.postDelete("notes/archiveNotes",model,this.token).subscribe(data=>{
      console.log("archive note",data);
      this.archiveEvent.emit();

    }),
    error => {
      console.log("Error", error);
    
    }
  }

}
