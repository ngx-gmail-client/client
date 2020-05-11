import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {Select} from '@ngxs/store';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import {Message} from '../../models/message';
import {GmailService} from '../../services/gmail.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {

  @Select(GmailState.messages) messages: Observable<Message[]>;

  constructor(private service: GmailService) { }

  view(event: MouseEvent, message: Message): void {

    this.service.getMessage(message.id, 'full');
    this.setActive(event);
  }

  setActive(event: MouseEvent){

    const parent = _.get(event.target, 'parentElement');

    if(parent){

      for (let element of  parent.children){
        _.get(element, 'classList').remove('active');
      }
    }

    _.get(event.target, 'classList').add('active');
  }
}
