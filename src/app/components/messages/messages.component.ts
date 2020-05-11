import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import {Label} from '../../models/label';
import {Message} from '../../models/message';
import {GmailService} from '../../services/gmail.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {

  @Select(GmailState.messages) messages: Observable<Message[]>;

  constructor(private service: GmailService) { }

  view(message: Message): void {
    this.service.getMessage(message.id, 'full');
  }
}
