import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();
  private msg = new Subject<boolean>();
  cMsg = this.msg.asObservable();
  private modals: any[] = [];
  
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  change(message: boolean) {
    this.msg.next(message)
  }

//   open(id: string) {
//     // open modal specified by id
//     let modal: any = this.modals.filter(x => x.id === id)[0];
//     modal.open();
// }

// close(id: string) {
//     // close modal specified by id
//     let modal: any = this.modals.filter(x => x.id === id)[0];
//     modal.close();
// }
}