import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger/logger.service';
import { UserService } from '../../core/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotesService } from '../../core/services/notes/notes.service';
import { DialogData,DialogComponent } from '../dialog/dialog.component'
import { User } from 'firebase';
@Component({
  selector: 'app-dialog-collaborator',
  templateUrl: './dialog-collaborator.component.html',
  styleUrls: ['./dialog-collaborator.component.scss']
})
export class DialogCollaboratorComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
 
  constructor(public user: UserService,
    public dialogRef: MatDialogRef<DialogCollaboratorComponent>,
     public noteService: NotesService,public dialog:MatDialog,

  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    // for(let ind)
    for(let i=0 ;i<this.data['collaborators'].length;i++){
      this.receiverList.push(this.data['collaborators'][i]);
      }
  }
  private imageNew = localStorage.getItem('imageUrl');
  private img = environment.profileUrl + this.imageNew;
  private mail = localStorage.getItem('first');
  private firstName = localStorage.getItem('firstName');
  private lastName = localStorage.getItem('lastName');
  
  //  private FriendsList:User[]=[];
  // private receiverList:User[]=[];
  private FriendsList=[];
  private receiverList=[];
  searchEmail;

  searchPeople(searchEmail) {
    LoggerService.log('search', searchEmail);
    var body = {
      "searchWord": searchEmail
    }
    this.user.getPeopleList(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('UserListdata', data);
        LoggerService.log('k', data['data']['details']);
this.FriendsList=data['data']['details'];
        // let FriendsList:User[]=[] = (data['data']['details']);

      })

  }
  onEnter(searchFriend){
    
    for(let index=0;index<this.FriendsList.length;index++){
      if(this.FriendsList[index].email==searchFriend){
      this.receiverList=this.FriendsList[index];
    }
    }
    LoggerService.log('list',this.receiverList)

  }

  addingCollaborator(receiver) {
    LoggerService.log('receiver', receiver);
    var body = {
      "firstName": receiver.firstName,
      "lastName": receiver.lastName,
      "userId": receiver.userId,
      "email": receiver.email
    }
    this.noteService.addCollaborator(this.data['id'], body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        LoggerService.log('item', response);
        this.receiverList=response['data']['details'];

        // var receiverList:User[]=[]=response['data']['details'];
      
      })

  }
  removeCollaborator(user_detail){
    LoggerService.log('remove', user_detail);

  }
  cancel(){
  this.dialogRef.close()
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '450px',
        height: 'auto',
        data:this.data,
        panelClass: 'myapp-no-padding-dialog'
  
      });
  
  
  
  }
  clickUser(userMail){
    this.searchEmail=userMail;
    // LoggerService.log(selectedEmail)
  }
  friendsNewList=[];

 
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
