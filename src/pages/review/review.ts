import { AppNotficationService } from './../../services/Notfcation/appnotification.service';
import { NotficationService } from './../../services/Notfcation/notfication.service';
import { AUTHService } from './../../services/user/AUTH.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import {ReviewService} from'../review/Review.service';
import { NgForm } from '@angular/forms';
import { ProductPage } from '../product/product';


@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  productID;
  user;
  rate=0;
  isRate:boolean;
  constructor(private ReviewService:ReviewService,
    public events: Events,public navParams: NavParams,
     public navCtrl: NavController
     ,public viewCtrl: ViewController
     ,public auth:AUTHService ,
     private PushNot :NotficationService,private notSer:AppNotficationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
    this.productID=this.navParams.get('productid');
    this.user=this.auth.getUser();
    this.isRate=false;
  }
  getrate()
  {
    this.events.subscribe('star-rating:changed', (starRating) =>
     {
       this.rate=starRating;
       this.isRate=true;
       console.log(this.rate);
     });
  }
  ADDREVIEW(form:NgForm){
    const body={
      'text':form.value.text,
      'rate':this.rate,
      'user':this.user.id,
      'product':this.productID,
    }
    this.ReviewService.addreview(body).subscribe((data:any)=>{
     this.notSer.adminNotification(2,null,data.id).subscribe(data=>
      {
        this.PushNot.pushNotfiation('Review','',form.value.text).subscribe();
        this.viewCtrl.dismiss(data);
      });
    },(err)=>{
      console.log(err);
    });

}   
cancel()
{
  this.viewCtrl.dismiss();
}
/*
 this.ReviewService.get_product_review(1).subscribe((data)=>{
      
      console.log(data);
    console.log("data is returned ");
  },(err)=>{
    console.log(err);
  
  
  });


  this.ReviewService.update_product_review(1,body).subscribe((data)=>{
      
    console.log(data);
  console.log("data is updated ");
},(err)=>{
  console.log(err);

    this.navCtrl.push(ProductPage);



});

*/









}