import { Component, EventEmitter, OnInit, Output, Input, ViewChild, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { MatSnackBar } from '@angular/material';
import { LoggerService } from '../../core/services/logger/logger.service';
import { RemindiconComponent } from '../remindicon/remindicon.component';
import { NotesService } from '../../core/services/notes/notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() eventClicked = new EventEmitter<Event>();
  @Output() notesNew = new EventEmitter<Event>();

  ArrayOfLabel;
  private body:any={}
  archiveNotesArray = { 'isArchived': false }
  colorMyevent = '#ffffff';
  // public interval: any;
  private choose1 = true;
  private choose2 = false;
  private  choose3 = true;
  private array1 = [];
  private array2 = [];
  private note;
  private title;
  private description;
  public notes;
  private addCheck=false;
  private status="open";
  private dataarray = [];
  private token = localStorage.getItem('token');
  private check=false;
  private isChecked=false;
  private dataArrayApi=[];
  private isPinned = false;
  private isArchived=false;
    private adding: boolean;
  noteNew = {
    'id':''
  }
  // @ViewChild(RemindiconComponent) childComponentMenu: RemindiconComponent;

  todaydate=new Date();
  tomorrow= new Date(this.todaydate.getFullYear(), this.todaydate.getMonth(), 
  (this.todaydate.getDate() + 1));

  constructor(public service: HttpService, public snackBar: MatSnackBar,public notesService:NotesService) { }
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
    for(let i=0;i<this.dataarray.length;i++){
         if(this.dataarray[i].isChecked==true){
          this.status="close"
         }
         let apiObj={
           "itemName":this.dataarray[i].data,
           "status":this.status
         }
         this.dataArrayApi.push(apiObj)
         this.status="open"
       }
       LoggerService.log("dataArrayapi",this.dataArrayApi);
       
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
              LoggerService.log(this.body);
              this.body.color = this.colorMyevent;
              this.colorMyevent = "#ffffff";
              
      }
         
        this.notesService.addNotes( this.body)     
         .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.notesNew.emit(data['status'].details)
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
            LoggerService.log('error',error);
            
          }
       
  }



  getLabel() {

    this.notesService.getLabels( )
    .pipe(takeUntil(this.destroy$))

    .subscribe(result => {

      this.ArrayOfLabel = [];
      for (let index = 0; index < result['data'].details.length; index++) {
        if (result['data'].details[index].isDeleted == false) {
          this.ArrayOfLabel.push(result['data'].details[index]);
        }
      }
     

    }),
      error => {
        LoggerService.log(error, "error");
      }
  }

  clickFunc(temp) {
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
      let obj = {
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
    for (let i = 0; i < this.dataarray.length; i++) {
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
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
     
  
}      
