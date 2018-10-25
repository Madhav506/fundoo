import { Component,Output, Input,OnInit,EventEmitter } from '@angular/core';
import{HttpService} from '../../services/http.service';

@Component({
  selector: 'app-coloricon',
  templateUrl: './coloricon.component.html',
  styleUrls: ['./coloricon.component.css']
})
export class ColoriconComponent implements OnInit {
  @Input() myNewColor
  @Output() response=new EventEmitter
newColor=1;
  constructor(public service:HttpService) { }
token=localStorage.getItem("token");

  ngOnInit() {
  }
  changeColor(paint){
    
    var content={
      "color":paint,
      "noteIdList":[this.myNewColor]
    }
    this.service.postDelete("notes/changesColorNotes",content,this.token).subscribe(data=>{
      console.log("color is",this.myNewColor);
      this.response.emit();

    }),
    error=>{
      console.log(error);
    }
  
  }

}
