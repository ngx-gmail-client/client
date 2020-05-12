import {Injectable, NgZone} from '@angular/core';
import {environment} from '../../environments/environment';
import {Store} from '@ngxs/store';
import {SetCurrentMessage, SetLabels, SetMessages} from '../utils/state-management/gmail.actions';
import {Label} from '../models/label';
import {Message} from '../models/message';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor(private zone: NgZone, private store: Store) {
  }

  loadClient(): Promise<any> {

    return new Promise((resolve, reject) => {

      this.zone.run(() => {
        gapi.load('client', {
          callback: resolve,
          onerror: reject,
          timeout: 1000,
          ontimeout: reject
        });
      });
    });
  }

  initClient(): Promise<any> {

    const initObj = {
      apiKey: environment.google.api_key,
      clientId: environment.google.client_id,
      discoveryDocs: environment.google.discovery_docs,
      scope: environment.google.scopes.join(' ')
    };

    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.client.init(initObj).then(resolve, reject);
      });
    });
  }

  /**
   * Lists all labels in the user's mailbox.
   */
  listLabels(): void {

    gapi.client.gmail.users.labels.list({
      userId: 'me'
    }).then((response) => {

      const labels: Label[] = [];

      if (Array.isArray(response.result.labels)) {

        response.result.labels.forEach((entity) => {
          labels.push(new Label(entity));
        });
      }

      this.store.dispatch(new SetLabels(labels));
    });
  }

  /**
   * Lists the messages in the user's mailbox.
   * @param labelIds
   * @param pageToken
   * @param query
   * @param maxResults
   */
  listMessages(labelIds: string[], pageToken: string = null, query: string = null, maxResults: number = 25): any {

    if (!Array.isArray(labelIds)) {
      labelIds = ['INBOX'];
    }

    const parameters = {userId: 'me', labelIds, q: query, pageToken, maxResults};

    gapi.client.gmail.users.messages.list(parameters).then((response) => {

      const messages: Message[] = [];

      if (Array.isArray(response.result.messages)) {

        response.result.messages.forEach((entity) => {

          this.getMessage(entity.id, 'metadata').then((message: Message) => {
            messages.push(message);
          });
        });
      }

      this.store.dispatch(new SetMessages(messages));
    });
  }

  /**
   * Gets the specified message.
   * @param id
   * @param format
   */
  getMessage(id: string, format: string = 'metadata'): Promise<any> {

    const parameters = {userId: 'me', id, format};

    return gapi.client.gmail.users.messages.get(parameters).then((response) => {

      const message = new Message(response.result);

      return message;
    });
  }

  /**
   * Immediately and permanently deletes the specified message. This operation cannot be undone. Prefer messages.trash instead.
   * @param id
   */
  deleteMessage(id: string): Promise<any> {

    return gapi.client.gmail.users.messages.delete({
      userId: 'me',
      id
    });
  }

  /**
   * Deletes many messages by message ID. Provides no guarantees that messages were not already deleted or even existed at all.
   * @param ids
   */
  batchDeleteMessage(ids: string[]): any {

    gapi.client.gmail.users.messages.delete({
      userId: 'me',
      ids
    });
  }

  /**
   * Remove a label from the message like e.g. UNREAD
   * @param labelId
   */
  markAsRead(id, remove: boolean = true) {

    return  gapi.client.gmail.users.messages.modify({
      userId: 'me',
      id,
      addLabelIds: remove === false ? ['UNREAD'] : [],
      removeLabelIds: remove === true ? ['UNREAD'] : []
    });
  }

  /**
   * Remove a label from the message like e.g. UNREAD
   * @param labelId
   */
  starred(id, remove: boolean = true) {

    return  gapi.client.gmail.users.messages.modify({
      userId: 'me',
      id,
      addLabelIds: remove === false ? ['STARRED'] : [],
      removeLabelIds: remove === true ? ['STARRED'] : []
    });
  }

  signIn() : void {
    gapi.auth2.getAuthInstance().signIn();
  }

  signOut(): Promise<any> {
    return gapi.auth2.getAuthInstance().signOut();
  }
}
