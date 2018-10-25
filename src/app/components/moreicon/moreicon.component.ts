import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import{HttpService} from '../../services/http.service';

@Component({
  selector: 'app-moreicon',
  templateUrl: './moreicon.component.html',
  styleUrls: ['./moreicon.component.css']
})
export class MoreiconComponent implements OnInit {
@Input() arrayOfNotes;
@Output() moreEvent = new EventEmitter<any>();

  constructor(public service:HttpService) { }

  ngOnInit() {
    
   
  
  }
  token=localStorage.getItem('token')


  deleteNotes(arrayOfNotesid){
    
    console.log(this.arrayOfNotes);
    var model={
      "isDeleted":true,
      "noteIdList":[this.arrayOfNotes.id]
    }
    this.service.postDelete("notes/trashNotes",model,this.token).subscribe(data=>{
      console.log("delete note",data);
      this.moreEvent.emit();

    }),
    error => {
      console.log("Error", error);
    
    }
  }

}
