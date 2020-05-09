import { Component } from '@angular/core';
import {GmailService} from './services/gmail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'gmail-client';

  constructor(private service: GmailService) {

    this.service.loadClient().then(() => {

      this.service.initClient().then(() => {
        this.service.listLabels();
        this.service.listMessages(['INBOX']);
        this.service.getMessage('171fac336e4a69a4');
      });
    })

  }

}
