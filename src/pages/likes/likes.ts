import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MyReviews } from '../reviews/Reviews.Service';

/**
 * Generated class for the LikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
})
export class LikesPage {
  UseresLikes:any[]=[];
  reviewid:number;
  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController, private MyReviews:MyReviews,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikesPage');
    this.reviewid=this.navParams.get('reviewid'); 
    this.getLikes();
  }
  getLikes()
  {
    this.MyReviews.GetLikes(this.reviewid).subscribe(
      (data:any[])=>
      {
       if(data)
       {
         this.UseresLikes=data;
       }
      }); 
  }
  dismiss()
  {
    this.viewCtrl.dismiss();
  }
}
