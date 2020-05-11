import {BaseModel} from './base-model';
import * as _ from 'lodash';

export class Message extends BaseModel {

  threadId: string = null;
  labelIds: string[] = [];
  snippet: string = null;
  historyId: string = null;
  internalDate: string = null;
  payload: object = {};
  sizeEstimate: number = null;

  constructor(properties?: Partial<Message>) {

    super();
    this.setProperties(properties || {});
  }

  subject(): string {

    const entity = _.find(_.get(this.payload, 'headers'), {name: 'Subject'});

    if (entity) {
      return entity.value;
    } else {
      return null;
    }
  }

  from(): { name: string, email: string } {

    const entity = _.find(_.get(this.payload, 'headers'), {name: 'From'});

    if (entity) {

      const start = entity.value.indexOf('<');
      const end = entity.value.indexOf('>');

      return {
        name: entity.value.substring(0, start),
        email: entity.value.substring(start + 1, end)
      };
    }
  }

  received(): Date {

    const entity = _.find(_.get(this.payload, 'headers'), {name: 'Date'});

    if(entity){
      return new Date(entity.value);
    }
  }
}
