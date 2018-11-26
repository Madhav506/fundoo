import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger/logger.service';
import { UserService } from '../../core/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotesService } from '../../core/services/notes/notes.service';
import { DialogData, DialogComponent } from '../dialog/dialog.component'
import { User } from 'firebase';
import { DataService } from '../../core/services/data/data.service';
@Component({
  selector: 'app-dialog-collaborator',
  templateUrl: './dialog-collaborator.component.html',
  styleUrls: ['./dialog-collaborator.component.scss']
})
export class DialogCollaboratorComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public user: UserService,
    public dialogRef: MatDialogRef<DialogCollaboratorComponent>,
    public noteService: NotesService, public dialog: MatDialog,
    public dataService: DataService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  @Output() remove = new EventEmitter<string>()

  ngOnInit() {
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.friendsNewList.push(this.data['collaborators'][i]);
    }

  }

  private receiverImage = this.data['user'];
  private img = environment.profileUrl + this.receiverImage.imageUrl;

  private mail = localStorage.getItem('first');
  private firstName = localStorage.getItem('firstName');
  private lastName = localStorage.getItem('lastName');
  private friendsNewList = [];
  private FriendsList = [];
  private receiverList = [];
  searchEmail;
/**SearchPeople() to search for users list  */
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
        this.FriendsList = data['data']['details'];

      })

  }
  /**onEnter() to search for users list  */

  onEnter(searchFriend) {

LoggerService.log('nnn',this.FriendsList[0].email);
LoggerService.log('ndddnn',searchFriend);

    for (let index = 0; index < this.FriendsList.length; index++) {
      if (this.FriendsList[index].email == searchFriend ) {
        this.friendsNewList.push(this.FriendsList[index]);
      }
     
    }
   
    this.searchEmail = [];
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
        this.receiverList = response['data']['details'];
        this.data['collaborators'].push(receiver);
      })

  }
  
  removeCollaborator(user_Id) {
    LoggerService.log('remove', user_Id);
    this.noteService.removeCollab(user_Id, this.data['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {

        LoggerService.log('item', response);

        for (var i = 0; i < this.friendsNewList.length; i++) {
          if (this.friendsNewList[i].userId == user_Id) {
            this.friendsNewList.splice(i, 1)
            this.data['collaborators'].splice(i,1);

          }
        }

      })

  }
  cancel() {
    this.dialogRef.close()
   const dialogRef= this.dialog.open(DialogComponent, {
    maxWidth: 'auto',
      height: 'auto',
      data: this.data,
      panelClass: 'myapp-no-padding-dialog'

    });


  }

  clickUser(userMail) {
    this.searchEmail = userMail;
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
