import {Action, Selector, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GmailModel} from './gmail.model';
import {SetLabels} from './gmail.actions';

const GMAIL_STATE_TOKEN = new StateToken<GmailModel>('gmail');

@State<GmailModel>({
  name: GMAIL_STATE_TOKEN,
  defaults: {
    labels: []
  }
})
@Injectable()
export class GmailState {

  @Selector()
  static labels(state: GmailModel): any[] {
    return state.labels;
  }

  @Action(SetLabels)
  setLabels({getState, patchState}: StateContext<GmailModel>, action: SetLabels): any {

    patchState({
      labels: action.payload
    });
  }
}
