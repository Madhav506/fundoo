import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild("replyEntered") public replyText: ElementRef;

  constructor(private route: ActivatedRoute, private notesService: NotesService,
    public router: Router, public quesService: AddquestionService) { }
  private noteId;
  private noteTitle;
  private noteDescription;
  private noteDetails;
  private checkList = [];
  private noteColor;
  private message;
  private parentId;
  private userName;
  private userDetails;
  private img;
  private img1;
  private questionAnswerArray;
  private show = true;
  replyQuestion;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteId = params['noteid'];
      LoggerService.log('noteDetails', this.noteId);
    });
    this.getNoteDetailsInQuestion();

  }
  getNoteDetailsInQuestion() {
    this.quesService.getNoteDetail(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('getNoteDetail', data);
        this.userDetails = data['data']['data'][0].user;
        this.img = environment.profileUrl ;
        this.noteDetails = data['data'].data[0];
        this.noteTitle = this.noteDetails.title;
        this.noteDescription = this.noteDetails.description;
        this.noteColor=this.noteDetails.color;

        for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
          if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(data['data']['data'][0].noteCheckLists[i])
          }
        }

        if (this.noteDetails.questionAndAnswerNotes[0] != undefined) {
          this.message = this.noteDetails.questionAndAnswerNotes[0].message;
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;
          this.img1=environment.profileUrl+this.noteDetails.questionAndAnswerNotes[0].user.imageUrl

        }
        if (this.noteDetails.questionAndAnswerNotes != undefined) {
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;

          LoggerService.log('questionArray', this.questionAnswerArray)
        }
      })
  }
  closeQuestion() {
    this.router.navigate(['home/notes']);
  }
  questionEnter() {

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  askQuestion(questionAsked) {
    var content = {
      'message': questionAsked,
      'notesId': this.noteId
    }
    this.quesService.addQuestion(content).subscribe(data => {
      this.getNoteDetailsInQuestion();
      LoggerService.log('success in adding', data);
      this.message = data['data']['details'].message;

    })

  }
  like(value) {
    LoggerService.log(value);
    var content = {
      'like': true,
    }

    this.quesService.likeQuestion(value, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetailsInQuestion();
        LoggerService.log('success in like', data);
      });
  }
  ratingAnswer(value, event) {

    var content = {
      'rate': event
    }
    this.quesService.rateAnswer(value.id, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetailsInQuestion();
        LoggerService.log('success in rating', data);
      })
  }
  // reply(){
  //   console.log('iamshow',this.show);
    
  //   this.show=!this.show;
  //   console.log('i m not show',this.show);

  // }
  leaveReply(replyId) {
    let replySend=this.replyText.nativeElement.textContent
    LoggerService.log('msgggg',replySend);
  let  content = {
      'message': replySend
    }
    LoggerService.log(replyId);
    this.quesService.leaveReplyAdd(replyId, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetailsInQuestion();
        LoggerService.log('success in replying', data);

      })
      // replySend='';
  }
//   rateCount(data){
// if(data.length==0){
//   return 0;
// }
// else{
//   for(let i=0;i<data.length;i++){
//   }
// }
//   }
}