import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddquestionService {

  constructor(public http: HttpClient, public service: HttpService) { }
  url = environment.baseUrl;


   /**question and Answer service methods */
   getNoteDetail(noteId){
    LoggerService.log(noteId)
    let url = this.url + "notes/getNotesDetail/"+noteId;
    return this.service.httpget(url);
  }
  addQuestion(body){
    let url = this.url +"/questionAndAnswerNotes/addQuestionAndAnswer"
    return this.http.post(url, body);

  }
  likeQuestion(parentId,body){
    let url = this.url +"/questionAndAnswerNotes/like/"+parentId;

    return this.http.post(url, body);

  }

}
