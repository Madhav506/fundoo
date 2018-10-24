import { Component, OnInit,Input} from '@angular/core';
import{HttpService} from '../../services/http.service';


@Component({
  selector: 'app-notescard',
  templateUrl: './notescard.component.html',
  styleUrls: ['./notescard.component.css']
})
export class NotescardComponent implements OnInit {

   @Input() myData
  constructor(public service:HttpService) { }
 
// public arrayData = [];
interval :any;

  ngOnInit() {
  }

}




