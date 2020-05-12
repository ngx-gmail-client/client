import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MenubarComponent} from './components/menubar/menubar.component';
import {ContentPanelComponent} from './components/content-panel/content-panel.component';
import {MainPanelComponent} from './components/main-panel/main-panel.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ViewerComponent} from './components/viewer/viewer.component';
import {MessagesComponent} from './components/messages/messages.component';
import {GmailService} from './services/gmail.service';
import {NgxsModule} from '@ngxs/store';
import {GmailState} from './utils/state-management/gmail.state';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {MatDialogModule} from '@angular/material/dialog';
import {SnoozeDialogComponent} from './components/snooze-dialog/snooze-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ComposerComponent } from './components/composer/composer.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, MenubarComponent, ContentPanelComponent, MainPanelComponent, ViewerComponent,
    MessagesComponent,
    SnoozeDialogComponent,
    ComposerComponent],
  imports: [
    BrowserModule, AppRoutingModule, FontAwesomeModule, NgxsModule.forRoot([GmailState], {
      developmentMode: false
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(), MatDialogModule, BrowserAnimationsModule
  ],
  providers: [GmailService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
