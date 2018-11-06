import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();
  
  private msg = new Subject<boolean>();
  cMsg = this.msg.asObservable();

  private message = new Subject<boolean>();
  currentmsg = this.message.asObservable();
  
  
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  change(message: boolean) {
    this.msg.next(message)
  }
  changeAppearance(message:boolean){

    this.message.next(message);
  }


}