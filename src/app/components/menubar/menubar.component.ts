import {Component, OnInit} from '@angular/core';
import {
  faBan, faClock, faEdit, faExternalLinkAlt, faEye, faReply, faReplyAll, faSearch, faShare, faSmile, faTrash
} from '@fortawesome/free-solid-svg-icons';
import {Select, Store} from '@ngxs/store';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import {Message} from '../../models/message';
import {take} from 'rxjs/operators';
import {GmailService} from '../../services/gmail.service';
import {DeleteMessage, SetCurrentMessage, SetLabels, SetMessages} from '../../utils/state-management/gmail.actions';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent implements OnInit {

  /**
   * Current message
   */
  @Select(GmailState.currentMessage) message: Observable<Message>;

  /**
   * Used icons
   */
  public icons = {
    edit: faEdit, close: faExternalLinkAlt, reply: faReply, replyAll: faReplyAll,
    forward: faShare, trash: faTrash, spam: faBan, snooze: faClock, favorite: faSmile,
    readstatus: faEye, search: faSearch
  };

  constructor(private service: GmailService, private store: Store) {
  }

  ngOnInit() {
  }

  remove(): void {

   this.message.pipe(
     take(1)
   ).subscribe((entity: Message) => {

     if(entity instanceof Message){

       this.service.deleteMessage(entity.id).then(() => {
         this.store.dispatch(new DeleteMessage(entity.id));
       });
     }

    });
  }

  signIn(): void {
    this.service.signIn()
  }

  signOut(): void {

    this.service.signOut().then(() => {

      this.store.dispatch(new SetLabels([]));
      this.store.dispatch(new SetMessages([]));
    });
  }

}
