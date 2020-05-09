import {BaseModel} from './base-model';

export class Message extends BaseModel {

  threadId: string = null;

  constructor(properties?: Partial<Message>) {

    super();
    this.setProperties(properties || {});
  }
}
