import { Component, OnInit, Inject, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service'
import { MatSnackBar } from '@angular/material';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';

export interface DialogData {
  "title": String,
  "description": String,
  "notesIdList": String,
  "color": String
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Output() archiveEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  archiveNotesArray={'isArchived': false}
  eventOne = new EventEmitter<boolean>();
  model: { 'noteIdList': any[]; };

  constructor(public service: HttpService, public dataService: DataService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public snackBar: MatSnackBar) {

  }
  public title;
  public note;
  public id;
  public array1 = [];
  public array2 = [];
  public temp;
  public newLabel;
  public tempArray=[];
  public newList;
  public newData:any={}
  public modifiedCheckList;
  public checklist=false;
  public bgcolor=this.data.color;
  ngOnInit() {
    // console.log(this.data['noteLabels']);
    this.array1 = this.data['noteLabels'];
    this.array2=this.data['reminder'];
    if (this.data['noteCheckLists'].length>0){
            this.checklist=true;
          }
          this.tempArray=this.data['noteCheckLists']

  }

  onClick(): void {
    this.dialogRef.close();
  }
  more(temp) {
    this.array1.push(temp);

  }
  archive(event) {
    this.archiveEvent.emit();
  }
  close() {
    this.update();

  }
  token = localStorage.getItem('token');

  update() {

    if(this.checklist==false){
    var id = this.data['id'];
    this.title = document.getElementById('title').innerHTML;
    this.note = document.getElementById('note').innerHTML;

    var model = {
      "noteId": [id],
      "title": this.title,
      "description": this.note,
      "color": "",
      "noteLabels": ""

    }
  
    this.service.postpassword("notes/updateNotes", model, this.token).subscribe(data => {
      // console.log(data,"data");
      this.snackBar.open("note updated successfully", "update", {
        duration: 10000,


      });
      this.archiveEvent.emit();

    
    })
  }
  else{
        var apiData={
          "itemName": this.modifiedCheckList.itemName,
          "status":this.modifiedCheckList.status
      }
      var url = "notes/" +this.data['id']+ "/checklist/" + this.modifiedCheckList.id + "/update";
      this.service.postDelete(url, JSON.stringify(apiData), this.token).subscribe(response => {
        console.log(response);
        this.archiveEvent.emit();

      })
     
    
      }
      error => {
        console.log(error);
      }
  }




  editing(editedList,event){
      
    console.log(editedList);
    if(event.code=="Enter"){
    this.modifiedCheckList=editedList;
    this.update();
    }
    
  }

  checkBox(checkList){
    
    if (checkList.status=="open"){
      checkList.status = "close"
    }
    else{
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList=checkList;
    this.update();
  }
  
  public removedList;
  removeList(checklist){
    console.log(checklist)
    this.removedList=checklist;
    this.removeCheckList()
  }
  removeCheckList(){
    var url = "notes/" + this.data['id']+ "/checklist/" + this.removedList.id + "/remove";

    this.service.postDelete(url,null,this.token).subscribe((response)=>{
      console.log(response);
      for(var i=0;i<this.tempArray.length;i++){
        if(this.tempArray[i].id==this.removedList.id){
          this.tempArray.splice(i,1)
        }
      }
    })
  }
  public adding=false;
  public addCheck=false;
  public status="open"

  addList(event){
    if(this.newList!=""){
      this.adding = true;
    }
   else{
      this.adding = false;
   }
    if (event.code == "Enter") {
      if(this.addCheck==true){
        this.status="close";
      }
      else{
        this.status="open"
      }
      this.newData={
        "itemName":this.newList,
        "status":this.status
      }
  var url = "notes/" + this.data['id'] + "/checklist/add";

    this.service.postDelete(url, this.newData, this.token)
    .subscribe(response => {
      console.log(response);
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      console.log(response['data'].details);
      
      this.tempArray.push(response['data'].details)

      console.log(this.tempArray)

    })
  }
  }

  emit(event){

    this.bgcolor=event
  }
























































  removeAssignments(label, noteid) {
    // console.log(label);
    // console.log(noteid);
    this.service.postDelete("notes/" + noteid + "/addLabelToNotes/" + label.id + "/remove", {},
     this.token).subscribe(response => {
      // console.log("removing labels",response);
      this.eventOne.emit(true)
      const index = this.array1.indexOf(label, 0);
      if (index > -1) {
        this.array1.splice(index, 1);
      }

    });
    error => {
      console.log("error");

    }

  }
  removeReminders(item,noteid) {
    LoggerService.log(noteid)
  this.model={

'noteIdList': [noteid],
  }
    this.service.postDelete("notes/removeReminderNotes", this.model, this.token)
      .subscribe(data => {
        LoggerService.log('reminder data removed',data);
        this.eventOne.emit(true);
        const index=this.array2.indexOf(item,0);
        if(index>-1){
          this.array2.splice(index,1);
        }

      });
    error => {
      LoggerService.log("error");

    }

  }

}
