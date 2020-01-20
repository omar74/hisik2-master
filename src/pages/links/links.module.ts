import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LinksPage } from './links';

@NgModule({
  declarations: [
    LinksPage,
  ],
  imports: [
    IonicPageModule.forChild(LinksPage),
  ],
})
export class LinksPageModule {}
