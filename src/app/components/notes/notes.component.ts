import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { RemindiconComponent } from '../remindicon/remindicon.component';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Output() eventClicked = new EventEmitter<Event>();
  ArrayOfLabel;
  public body:any={}
  archiveNotesArray = { 'isArchived': false }
  colorMyevent = '#ffffff';
  public interval: any;
  public choose1 = true;
  public choose2 = false;
  public  choose3 = true;
  public array1 = [];
  public array2 = [];
  public note;
  public title;
  public description;
  public notes;
  public addCheck=false;
  public status="open";
  public dataarray = [];
  token = localStorage.getItem('token');
  public check=false;
  public isChecked=false;
  public dataArrayApi=[];
  public isPinned = false;
    public isArchived=false;
    public adding: boolean;
  noteNew = {
    'id':''
  }
  @ViewChild(RemindiconComponent) childComponentMenu: RemindiconComponent;

  todaydate=new Date();
  tomorrow= new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(), 
  (this.todaydate.getDate() + 1));

  constructor(public service: HttpService, public snackBar: MatSnackBar) { }
  ngOnInit() {
    
  }

  openNote() {
    this.choose1 = false;
    this.choose2 = true;

  }
  change(event) {
    if (event) {
      this.colorMyevent = event;
    }
  }


  close() {

    this.choose1 = true;
    this.choose2 = false;
    
    this.array2 = [];
    this.title = document.getElementById('title').innerHTML;

    console.log(this.title);
    
console.log(this.choose3);

    if(this.choose3==true){
   
    this.description = document.getElementById('description').innerHTML;

    this.body = {
      "title": this.title,
      "description": this.description,
      "labelIdList": JSON.stringify(this.array1),
      "checklist": "",
      "isPined": this.isPinned,
      "color": "",
      "reminder":''


    }
    if(this.newReminder!=undefined){
      this.body.reminder=this.newReminder;
    }
    LoggerService.log('body of normal note',this.body);
    this.body.color = this.colorMyevent;
    this.colorMyevent = "#ffffff";
    this.remindArray=[];

  }
  
  else{
    for(var i=0;i<this.dataarray.length;i++){
         if(this.dataarray[i].isChecked==true){
          this.status="close"
         }
         var apiObj={
           "itemName":this.dataarray[i].data,
           "status":this.status
         }
         this.dataArrayApi.push(apiObj)
         this.status="open"
       }
       console.log("dataArrayapi",this.dataArrayApi);
       
             this.body={
               "title": this.title,
               "checklist":JSON.stringify(this.dataArrayApi),
               "isPined": this.isPinned,
               "color": "",
               "isArchived": this.isArchived,
               "labelIdList": JSON.stringify(this.array1),
               "reminder":''
              }
              if(this.newReminder!=undefined){
                this.body.reminder=this.newReminder;
              }
              console.log(this.body);
              this.body.color = this.colorMyevent;
              this.colorMyevent = "#ffffff";
              
      }
         
        this.service.postpassword("notes/addnotes", this.body, this.token).subscribe(data => {
            LoggerService.log('data',data);
            this.choose3 = true;
            this.snackBar.open("note created  successfully", "Notes", {
              duration: 10000,
      
            });
            this.dataArrayApi=[];
            this.array1 = [];
            this.array2 = [];
            this.dataarray=[];
            this.remindArray=[];
            this.newReminder='';
            this.adding=false
            this.eventClicked.emit();
      
          }
      
          ),error=>{
            console.log('error',error);
            
          }
       
  }



  getLabel() {

    this.service.getCardData("noteLabels/getNoteLabelList", this.token).subscribe(result => {
      // console.log(result['data'].details);

      this.ArrayOfLabel = [];
      for (var index = 0; index < result['data'].details.length; index++) {
        if (result['data'].details[index].isDeleted == false) {
          this.ArrayOfLabel.push(result['data'].details[index]);
        }
      }
      // console.log(this.ArrayOfLabel);
      // console.log("emitting");


    }),
      error => {
        console.log(error, "error");
      }
  }

  clickFunc(temp) {
    // console.log(temp);
    if (!this.array2.some((data) => data == temp.label)) {
      this.array1.push(temp.id);
      this.array2.push(temp.label);
    }
    else {
      /* width:60px; */

      const index = this.array2.indexOf(temp.label, 0);
      if (index > -1) {
        this.array2.splice(index, 1);
      }
    }

  }


 
  //  public checkList=[];
  public i= 0;
   public data;

  enter(event) {
    if (this.data != "") {
             this.adding = true;
           }
           else {
             this.adding = false;
         }
    this.i++;
    this.isChecked=this.addCheck;
    if (this.data != null  ) {
      // console.log(event,"keydown");
      var obj = {
        "index": this.i,
        "data": this.data,
        "isChecked":this.isChecked
      }
      this.dataarray.push(obj);
      LoggerService.log('dataArray',this.dataarray)
      this.data = null;
          this.adding=false;
          this.isChecked=false;
            this.addCheck = false;

    }
  }

  
  remove(removed) {
    for (var i = 0; i < this.dataarray.length; i++) {
      if (removed.index == this.dataarray[i].index) {
        this.dataarray.splice(i, 1);
        break;
      }
    }

  }
  remindArray=[];
  newReminder;
  reminding(event){
    if(event){
      // if(this.remindArray.length==0){
      this.newReminder=event
      this.remindArray=[];
    this.remindArray.push(event)
  // }
  }
  }
  removeReminders(){
    this.remindArray.pop();
    this.newReminder='';
  }
  removeAssignments(){
    this.array2.pop();
    this.array1.pop();
  }
  
     
  
}      
