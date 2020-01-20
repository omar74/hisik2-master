import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopingPlacesPage } from './shoping-places';

@NgModule({
  declarations: [
    ShopingPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopingPlacesPage),
  ],
})
export class ShopingPlacesPageModule {}
