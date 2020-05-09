import {Component, OnInit} from '@angular/core';
import {faEdit, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent implements OnInit {

  public icons = {
    edit: faEdit,
    close: faExternalLinkAlt
  };

  constructor() { }

  ngOnInit() {
  }

}
