import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditReviewsPage } from './edit-reviews';

@NgModule({
  declarations: [
    EditReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditReviewsPage),
  ],
})
export class EditReviewsPageModule {}
