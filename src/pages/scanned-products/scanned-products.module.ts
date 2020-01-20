import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannedProductsPage } from './scanned-products';

@NgModule({
  declarations: [
    ScannedProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannedProductsPage),
  ],
})
export class ScannedProductsPageModule {}
