import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';
import {faPaperPlane, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html'
})
export class ComposerComponent implements OnInit {

  /**
   * Icons used in this component
   */
  readonly icons = {
    send: faPaperPlane,
    cancel: faTimesCircle
  };

  constructor() { }

  ngOnInit(): void {

    const quill = new Quill('#editor', {
      modules: {},
      theme: 'snow'
    });
  }

}
