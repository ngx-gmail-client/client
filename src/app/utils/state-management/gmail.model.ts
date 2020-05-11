import {Label} from '../../models/label';
import {Message} from '../../models/message';

export class GmailModel {
  labels: Label[] = [];
  messages: Message[] = [];
  currentMessage: Message = null;
}
