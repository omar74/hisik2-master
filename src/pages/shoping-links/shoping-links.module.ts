import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopingLinksPage } from './shoping-links';

@NgModule({
  declarations: [
    ShopingLinksPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopingLinksPage),
  ],
})
export class ShopingLinksPageModule {}
