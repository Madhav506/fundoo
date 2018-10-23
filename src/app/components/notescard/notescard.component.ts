import { Component, OnInit,Input } from '@angular/core';
import{HttpService} from '../../services/http.service';


@Component({
  selector: 'app-notescard',
  templateUrl: './notescard.component.html',
  styleUrls: ['./notescard.component.css']
})
export class NotescardComponent implements OnInit {

  constructor(public service:HttpService) { }
  
 
  @Input() data;
question = [];

  ngOnInit() {
    console.log(this.data);
    console.log(this.data.data.data[0])
    // this.question = this.data;
    this.question.push(this.data['data'].data);

    console.log("this is question",this.question);

    for(var i=0;i<this.question.length;i++){
console.log(i);
      // console.log(this.data['data'].data[i].title)    
    }
    
  }
  


}
