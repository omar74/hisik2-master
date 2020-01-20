import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTextPage } from './search-text';

@NgModule({
  declarations: [
    SearchTextPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchTextPage),
  ],
})
export class SearchTextPageModule {}
