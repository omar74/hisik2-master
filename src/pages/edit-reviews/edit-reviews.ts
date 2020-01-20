import { AUTHService } from './../../services/user/AUTH.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { Edit_MyReview } from './EditReviews.Service';
import { NgForm } from '@angular/forms';
//import { ReviewsPage } from '../reviews/reviews';

/**
 * Generated class for the EditReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-reviews',
  templateUrl: 'edit-reviews.html',
})
export class EditReviewsPage {
  review;
  user:any;
  body={
    'text':null,
    'rate':null,
    'user':null,
    'product':null
  }
  constructor(public navCtrl: NavController
    , public navParams: NavParams,
     private Edit_MyReview:Edit_MyReview,
     public events: Events,
     public viewCtrl: ViewController,public auth:AUTHService) {
  }

  ionViewDidLoad() {
    this.review=this.navParams.get('review');
    console.log(this.review);
    this.user=this.auth.getUser();
    console.log('ionViewDidLoad EditReviewsPage');
  }

  back(){
    this.navCtrl.pop();
  }
  getrate()
  {
    this.events.subscribe('star-rating:changed', (starRating) =>
     {
       this.body.rate=starRating;
       console.log(this.body.rate);
     }
    );
  }
  UpdateReview(form:NgForm){

    this.body.text=form.value.text;
    this.body.user=this.review.user;
    this.body.product=this.review.product;
    console.log(this.body);
    this.Edit_MyReview.update_myreview(this.review.id,this.body).subscribe((data)=>{
       this.review=data;
       console.log(this.review)
       this.viewCtrl.dismiss(this.review);
    },(err)=>{
      console.log(err);
    })
  }
  cancel()
  {
    this.viewCtrl.dismiss();
  }

}
