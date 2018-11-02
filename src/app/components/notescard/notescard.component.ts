import { Component, OnInit,Output,EventEmitter,Input} from '@angular/core';
import{HttpService} from '../../services/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-notescard',
  templateUrl: './notescard.component.html',
  styleUrls: ['./notescard.component.css']
})
export class NotescardComponent implements OnInit {
  @Output() noteEvent = new EventEmitter<any>();
  @Output() colorevent = new EventEmitter<any>();
  @Output() archive = new EventEmitter<any>();
@Output() updateEvent=new EventEmitter<any>();
@Output() newEvent=new EventEmitter<any>();

token=localStorage.getItem('token')
public element;
   @Input() myData
   @Input() searchInput;

  constructor(public service:HttpService,public dialog: MatDialog,public dataService:DataService) {
    // this.dataService.cMsg.subscribe()
    this.dataService.cMsg.subscribe(message=>{
      console.log(message);
      if(message){
        this.updateEvent.emit();

      }
    })
   }
   public data;

   gotMessage($event){
     this.noteEvent.emit();

   }
   color($event){
    this.colorevent.emit(); 

  }
  myArchive($event){
    this.archive.emit();

  }
  openDialog(dialogData): void {
    console.log(dialogData.id);
    console.log(dialogData);
    console.log(dialogData.noteLabels);
    // this.updateEvent.emit();
    const dialogRef = this.dialog.open(DialogComponent,{
      width: '450px',
      height:'auto',
      data: dialogData,
      panelClass:'myapp-no-padding-dialog'
      
    });
    const sub = dialogRef.componentInstance. eventOne.subscribe((data) => {
      console.log("sub", data);
      this.updateEvent.emit();
    });
// console.log(dialogRef,"dialogggg")
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      this.updateEvent.emit();
    });
  }
   
 

  ngOnInit() {
  
  }

  removeAssignments(labelid,noteid){
    console.log(labelid);
    console.log(noteid);
    
    this.service.postDelete("notes/"+noteid+"/addLabelToNotes/"+labelid+"/remove",{},this.token).subscribe(response=>{
          console.log("removing labels",response);
          this.updateEvent.emit();
         
  });
  error=>{
    console.log("error");
    
  }

}
}



