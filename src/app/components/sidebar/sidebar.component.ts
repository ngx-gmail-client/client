import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {Actions, ofActionCompleted, Select} from '@ngxs/store';
import {Label} from '../../models/label';
import {GmailService} from '../../services/gmail.service';
import {SetMessages} from '../../utils/state-management/gmail.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  @Select(GmailState.labels) labels: Observable<Label[]>;


  constructor(private service: GmailService, private actions: Actions) {

    this.actions.pipe(ofActionCompleted(SetMessages)).subscribe((response) => {

      if(response.action.payload.length >= 1){

        console.dir(response.action);

      }

    });


  }

  /**
   * Mark the label as active and load the messages
   * @param event
   * @param label
   */
  labelClick(event: MouseEvent, label: Label) {

    this.service.listMessages([label.id])

    const parent = _.get(event.target, 'parentElement');

    if (parent) {

      for (let element of parent.children) {
        _.get(element, 'classList').remove('active');
      }
    }

    _.get(event.target, 'classList').add('active');
  }
}
