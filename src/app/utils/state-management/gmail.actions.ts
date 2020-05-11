import {Message} from '../../models/message';
import {Label} from '../../models/label';

export class SetLabels {

  static readonly type = '[GMAIL] Labels';

  constructor(public payload: Label[]) {
  }
}

export class SetMessages {

  static readonly type = '[GMAIL] Messages';

  constructor(public payload: Message[]) {
  }
}

export class SetCurrentMessage {

  static readonly type = '[GMAIL] Current message';

  constructor(public payload: Message) {
  }
}

export  class DeleteMessage {

  static readonly type = '[GMAIL] Delete message';

  constructor(public id: string) { }
}
