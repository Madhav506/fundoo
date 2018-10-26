import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(public service:HttpService) { }

  ngOnInit() {
    console.log("archive");
    this.getAllNotes();
  }
  arrayData=[];
  token=localStorage.getItem('token');

  getAllNotes(){
    this.service.getCardData("notes/getArchiveNotesList",this.token).subscribe(data=>{  
      console.log(data);
       this.arrayData=data['data'].data.reverse();
       console.log(this.arrayData);
      }),
      error => {
        console.log("Error", error);
      
      }
  
      
}

}
