import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GmailModel} from './gmail.model';
import {AddMessage, DeleteMessage, SetCurrentMessage, SetLabels, SetMessages} from './gmail.actions';
import {Message} from '../../models/message';
import {Label} from '../../models/label';

const GMAIL_STATE_TOKEN = new StateToken<GmailModel>('gmail');

@State<GmailModel>({
  name: GMAIL_STATE_TOKEN,
  defaults: {
    labels: [],
    messages: [],
    currentMessage: null
  }
})
@Injectable()
export class GmailState {

  @Selector()
  static labels(state: GmailModel): Label[] {
    return state.labels;
  }

  @Selector()
  static messages(state: GmailModel): Message[] {
    return state.messages;
  }

  @Selector()
  static currentMessage(state: GmailModel): Message {
    return state.currentMessage;
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

  @Action(SetCurrentMessage)
  setCurrentMessage({getState, patchState}: StateContext<GmailModel>, action: SetCurrentMessage): any {

    patchState({
      currentMessage: action.payload
    });
  }

  @Action(DeleteMessage)
  deleteMessage({getState, setState}: StateContext<GmailModel>, {id}: DeleteMessage) {

    const state = getState();

    setState({
      ...state,
      messages: state.messages.filter(item => item.id !== id)
    });
  }
}
