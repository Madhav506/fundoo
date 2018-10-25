import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archiveicon',
  templateUrl: './archiveicon.component.html',
  styleUrls: ['./archiveicon.component.css']
})
export class ArchiveiconComponent implements OnInit {
  @Input() archiveNotesArray;

  constructor(public service:HttpService) { }

  ngOnInit() {

  }
  token=localStorage.getItem('token')


  // archiveNotes(){
    
  //   console.log(this.archiveNotesArray);
  //   var model={
  //     "isArchived":true,
  //     "noteIdList":[this.archiveNotesArray.id]
  //   }
  //   this.service.postArchive("notes/archiveNotes",model,this.token).subscribe(data=>{
  //     console.log("archive note",data);
  //     // this.moreEvent.emit();

  //   }),
  //   error => {
  //     console.log("Error", error);
    
  //   }
  // }

}
