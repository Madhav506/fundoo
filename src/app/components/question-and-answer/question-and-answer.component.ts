import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Note } from '../../core/model/note';
import { AddquestionService } from '../../core/services/quesAndAnswers/addquestion.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})
export class QuestionAndAnswerComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute,private notesService:NotesService,
    public router:Router,public quesService:AddquestionService) { }
private noteId;
private noteTitle;
private noteDescription;
private noteDetails;
private noteCheckList;
private noteColor;
private message;
private user;
private question;
private parentId;
// private receiverImage = this.data['user'];
//   private img = environment.profileUrl + this.receiverImage.imageUrl;

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
    this.noteId=params['noteid'];
    LoggerService.log('noteDetails',this.noteId);
    });
    this.getNoteDetailsInQuestion();


  }
  getNoteDetailsInQuestion(){
    this.quesService.getNoteDetail(this.noteId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
    LoggerService.log('getNoteDetail',data);
    this.noteDetails=data['data'].data[0];
    this.noteTitle=this.noteDetails.title;
    this.noteDescription=this.noteDetails.description;
    this.noteColor=this.noteDetails.color;
    if(this.noteDetails.questionAndAnswerNotes[0]!=undefined){
    this.message=this.noteDetails.questionAndAnswerNotes[0].message;
LoggerService.log(this.message)
}
this.parentId= this.noteDetails.questionAndAnswerNotes[0].id;

    })
  }
  closeQuestion(){
    this.router.navigate(['home/notes']);
  }
  questionEnter(){

  }
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  
askQuestion(questionAsked){
  var content={
    'message':questionAsked,
    'notesId':this.noteId
  }
  this.quesService.addQuestion(content).subscribe(data=>{
    LoggerService.log('success in adding',data);
this.message=data['data']['details'].message;

  })

}
private noOfLikes;
like(){
  var content={
    'like':true,
  }
  this.quesService.likeQuestion(this.parentId,content).subscribe(data=>{
    this.noOfLikes=data['data']['details'].count;
    LoggerService.log('success in like',this.noOfLikes);

  })

}

}
