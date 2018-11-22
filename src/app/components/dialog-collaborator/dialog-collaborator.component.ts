import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger/logger.service';
import { UserService } from '../../core/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-dialog-collaborator',
  templateUrl: './dialog-collaborator.component.html',
  styleUrls: ['./dialog-collaborator.component.scss']
})
export class DialogCollaboratorComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public user:UserService) { }

  @Inject(MAT_DIALOG_DATA) public data: any

  ngOnInit() {
  }
private imageNew = localStorage.getItem('imageUrl');
private img = environment.profileUrl + this.imageNew;
private mail=localStorage.getItem('first');
private firstName=localStorage.getItem('firstName');
private lastName = localStorage.getItem('lastName');
private FriendsList=[];

searchPeople(searchEmail){
  LoggerService.log('search',searchEmail);
 var  body={
"searchWord":searchEmail
  }
  this.user.getPeopleList(body)
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
LoggerService.log('UserListdata',data);
LoggerService.log('k',data['data']['details']);

this.FriendsList=(data['data']['details']);

  })

}
ngOnDestroy() { 
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}


}
