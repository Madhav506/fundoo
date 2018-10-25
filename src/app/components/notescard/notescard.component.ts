import { Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import{HttpService} from '../../services/http.service';


@Component({
  selector: 'app-notescard',
  templateUrl: './notescard.component.html',
  styleUrls: ['./notescard.component.css']
})
export class NotescardComponent implements OnInit {
  @Output() noteEvent = new EventEmitter<any>();
  @Output() colorevent = new EventEmitter<any>();

   @Input() myData
  constructor(public service:HttpService) {
    
   }
   gotMessage($event){
     this.noteEvent.emit();

   }
   color($event){
    this.colorevent.emit();

  }
 

  ngOnInit() {
  
  }


}




