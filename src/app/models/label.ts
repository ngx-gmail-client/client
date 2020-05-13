import {BaseModel} from './base-model';

export class Label extends BaseModel {

  id: string;
  labelListVisibility: string = null;
  messageListVisibility: string = null;
  name: string = null;
  type: string = null;
  messagesUnread: number = null;
  messagesTotal: number = null;
  threadsTotal: number = null;
  threadsUnread: number = null;

  constructor(properties?: Partial<Label>) {

    super();
    this.setProperties(properties || {});
  }

  getLabel(): string {
    return this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
  }
}
