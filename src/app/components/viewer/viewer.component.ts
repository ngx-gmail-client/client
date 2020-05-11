import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import {Message} from '../../models/message';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html'
})
export class ViewerComponent implements OnInit {

  /**
   * Current message
   */
  @Select(GmailState.currentMessage) message: Observable<Message>;

  /**
   * Subject of the message
   */
  subject: string = null;

  /**
   * Recipient
   */
  from: { name: string, email: string } = null;

  /**
   * Message contnet
   */
  content: string = null;

  constructor() {
  }

  ngOnInit(): void {

    this.message.subscribe((entity) => {

      if (entity instanceof Message) {

        this.subject = entity.subject();
        this.from = entity.from();

        entity.received();

        this.content = entity.content();
      }

    });
  }

}
