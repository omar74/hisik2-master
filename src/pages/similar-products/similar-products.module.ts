import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimilarProductsPage } from './similar-products';

@NgModule({
  declarations: [
    SimilarProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(SimilarProductsPage),
  ],
})
export class SimilarProductsPageModule {}
