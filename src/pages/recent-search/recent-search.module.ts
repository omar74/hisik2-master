import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecentSearchPage } from './recent-search';

@NgModule({
  declarations: [
    RecentSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RecentSearchPage),
  ],
})
export class RecentSearchPageModule {}
