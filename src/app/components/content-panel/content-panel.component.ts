import {Component, Input, OnInit} from '@angular/core';
import {Layouts} from '../../utils/enums/layouts';

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html'
})
export class ContentPanelComponent implements OnInit {

  Layouts = Layouts;

  @Input() layout = Layouts.left;

  constructor() {
  }

  ngOnInit() {
  }

}
