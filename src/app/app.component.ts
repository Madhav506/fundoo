import { Component } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { MessagingService } from './core/services/messaging/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'Fundoo';
  message;
  constructor(private messageService:MessagingService){}

  
  ngOnInit(){
    this.messageService.getPermission();
    this.messageService.receiveMessage();
    
  }
}



 