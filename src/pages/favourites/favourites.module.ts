import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritesPage } from './favourites';

@NgModule({
  declarations: [
    FavouritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouritesPage),
  ],
})
export class FavouritesPageModule {}
