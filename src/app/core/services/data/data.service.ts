import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();
  
  private msg = new Subject<boolean>();
  cMsg = this.msg.asObservable();

  private message = new Subject<boolean>();
  currentmsg = this.message.asObservable();
  
  private Image = new BehaviorSubject(false);
  currentImage = this.Image.asObservable();
  

  private label = new Subject<boolean>();
  currLabel = this.label.asObservable();
  
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
  changeImage(message:boolean){
    this.Image.next(message);
  }
  changeLabel(message:boolean){
    this.label.next(message);
    
    
  }


}