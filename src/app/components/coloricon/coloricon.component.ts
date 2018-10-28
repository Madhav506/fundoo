import { Component,Output, Input,OnInit,EventEmitter } from '@angular/core';
import{HttpService} from '../../services/http.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-coloricon',
  templateUrl: './coloricon.component.html',
  styleUrls: ['./coloricon.component.css']
})
export class ColoriconComponent implements OnInit {
  @Input() myNewColor
  @Output() response=new EventEmitter<string>()
  @Output() responseNew=new EventEmitter<string>()

newColor=1;
  constructor(public service:HttpService,public snackBar:MatSnackBar) { }
token=localStorage.getItem("token");

  ngOnInit() {
  }
  changeColor(paint){
    this.responseNew.emit(paint);

    var content={
      "color":paint,
      "noteIdList":[this.myNewColor]
    }
    this.service.postDelete("notes/changesColorNotes",content,this.token).subscribe(data=>{
      console.log("color is",this.myNewColor);
      this.snackBar.open("colour changed  successfully", "colorchange", {
        duration:10000,
      
      });
      this.response.emit();

    }),
    error=>{
      console.log(error);
    }
  
  }

}
