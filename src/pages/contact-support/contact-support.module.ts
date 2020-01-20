import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactSupportPage } from './contact-support';

@NgModule({
  declarations: [
    ContactSupportPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactSupportPage),
  ],
})
export class ContactSupportPageModule {}
