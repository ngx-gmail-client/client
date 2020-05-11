import {Component, OnInit} from '@angular/core';
import {
  faBan, faClock, faEdit, faExternalLinkAlt, faEye, faReply, faReplyAll, faSearch, faShare, faSmile, faTrash
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent implements OnInit {

  public icons = {
    edit: faEdit, close: faExternalLinkAlt, reply: faReply, replyAll: faReplyAll,
    forward: faShare, trash: faTrash, spam: faBan, snooze: faClock, favorite: faSmile,
    readstatus: faEye, search: faSearch
  };

  constructor() {
  }

  ngOnInit() {
  }

}
