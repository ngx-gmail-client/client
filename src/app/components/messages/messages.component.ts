import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as _ from 'lodash';
import {Select, Store} from '@ngxs/store';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import {Message} from '../../models/message';
import {GmailService} from '../../services/gmail.service';
import {SetCurrentMessage, UpdateMessage} from '../../utils/state-management/gmail.actions';
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent {

  /**
   * icons used by this component
   */
  icons = {
    star: faStar
  };

  /**
   * Listener for messages
   */
  @Select(GmailState.messages) messages: Observable<Message[]>;

  /**
   * @param service
   * @param store
   */
  constructor(private service: GmailService, private store: Store) {

  }

  view(element: any, message: Message): void {

    this.service.getMessage(message.id, 'full').then((message: Message) => {
      this.store.dispatch(new SetCurrentMessage(message));
      this.markAsRead(message);
    });

    this.setActive(element);
  }

  markAsRead(message: Message): void {

    this.service.markAsRead(message.id, true).then((response) => {

      if (_.has(response.result, 'labelIds')) {
        message.labelIds = _.get(response.result, 'labelIds');
        this.store.dispatch(new UpdateMessage(message));
      }
    });
  }

  setActive(element) {

    const parent = _.get(element, 'parentElement');

    if (parent) {

      for (let element of parent.children) {
        _.get(element, 'classList').remove('active');
      }
    }

    _.get(element, 'classList').add('active');
  }
}
