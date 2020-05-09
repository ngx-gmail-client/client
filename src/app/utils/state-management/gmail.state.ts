import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GmailModel} from './gmail.model';
import {SetLabels, SetMessages} from './gmail.actions';

const GMAIL_STATE_TOKEN = new StateToken<GmailModel>('gmail');

@State<GmailModel>({
  name: GMAIL_STATE_TOKEN,
  defaults: {
    labels: [],
    messages: []
  }
})
@Injectable()
export class GmailState {

  @Selector()
  static labels(state: GmailModel): any[] {
    return state.labels;
  }

  @Selector()
  static messages(state: GmailModel): any[] {
    return state.messages;
  }

  @Action(SetLabels)
  setLabels({getState, patchState}: StateContext<GmailModel>, action: SetLabels): any {

    patchState({
      labels: action.payload
    });
  }

  @Action(SetMessages)
  setMessages({getState, patchState}: StateContext<GmailModel>, action: SetMessages): any {

    patchState({
      messages: action.payload
    });
  }
}
