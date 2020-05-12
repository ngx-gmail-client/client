import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {
    faBan,
    faClock,
    faEdit,
    faExternalLinkAlt,
    faEye,
    faReply,
    faReplyAll,
    faSearch,
    faShare,
    faSmile,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import {Select, Store} from '@ngxs/store';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import {Message} from '../../models/message';
import {take} from 'rxjs/operators';
import {GmailService} from '../../services/gmail.service';
import {DeleteMessage, SetLabels, SetMessages, UpdateMessage} from '../../utils/state-management/gmail.actions';

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

            if (entity instanceof Message) {

                this.service.deleteMessage(entity.id).then(() => {
                    this.store.dispatch(new DeleteMessage(entity.id));
                });
            }

        });
    }

    /**
     * Swap the read/unread status of the message
     */
    swapReadStatus(): void {

        this.message.pipe(
            take(1)
        ).subscribe((entity: Message) => {

            if (entity instanceof Message) {

                const unread = entity.labelIds.indexOf('UNREAD') !== -1;

                this.service.markAsRead(entity.id, unread).then((response) => {

                    if (_.has(response.result, 'labelIds')) {
                        entity.labelIds = _.get(response.result, 'labelIds');
                        this.store.dispatch(new UpdateMessage(entity));
                    }
                });
            }
        });
    }

    /**
     * Mark the message with a star (or remove it)
     */
    swapStarred(): void {

        this.message.pipe(
            take(1)
        ).subscribe((entity: Message) => {

            if (entity instanceof Message) {

                const unread = entity.labelIds.indexOf('STARRED') !== -1;

                this.service.starred(entity.id, unread).then((response) => {

                    if (_.has(response.result, 'labelIds')) {
                        entity.labelIds = _.get(response.result, 'labelIds');
                        this.store.dispatch(new UpdateMessage(entity));
                    }
                });
            }
        });
    }

    signIn(): void {
        this.service.signIn();
    }

    /**
     * User want's to sign out
     */
    signOut(): void {

        this.service.signOut().then(() => {

            this.store.dispatch(new SetLabels([]));
            this.store.dispatch(new SetMessages([]));
        });
    }

}
