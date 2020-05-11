import {Component, OnInit} from '@angular/core';
import {faBan, faEdit, faExternalLinkAlt, faReply, faReplyAll, faShare, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent implements OnInit {

  public icons = {
    edit: faEdit,
    close: faExternalLinkAlt,
    reply: faReply,
    replyAll: faReplyAll,
    forward: faShare,
    trash: faTrash,
    spam: faBan
  };

  constructor() { }

  ngOnInit() {
  }

}
