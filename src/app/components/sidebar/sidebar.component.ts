import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GmailState} from '../../utils/state-management/gmail.state';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {Label} from '../../models/label';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  @Select(GmailState.labels) labels: Observable<Label[]>;

  constructor(  ) { }

  ngOnInit() {
  }

}
