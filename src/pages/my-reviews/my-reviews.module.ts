import { MyReviewsPage } from './my-reviews';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    MyReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyReviewsPage),
  ],
})
export class ReviewsPageModule {}
