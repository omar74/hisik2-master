import { AppNotficationService } from './../../services/Notfcation/appnotification.service';
import { OptionsPage } from './../options/options';
import { LikesPage } from './../likes/likes';
import { AUTHService } from './../../services/user/AUTH.service';
import { MyReviews } from './../reviews/Reviews.Service';
import { ReplayPage } from './../replay/replay';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, PopoverController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditReviewsPage } from '../edit-reviews/edit-reviews';
import {My_Reviews} from '../my-reviews/MyReviews.Service';
import { NgForm } from '@angular/forms';
import { NotficationService } from '../../services/Notfcation/notfication.service';

/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-reviews',
  templateUrl: 'my-reviews.html',
})
export class MyReviewsPage {
  user;
  productid;
  Reviews:any=[];
  ReviewsLikeResult=[];
  ReviewsReplayResult=[];
  likeID:number=null;
  islike:Boolean=false;
  ReplayCount=0;
  likecount=0;
  mydata;
  constructor(public navCtrl: NavController,
    public toastCtrl:ToastController, public navParams: NavParams,public options:PopoverController,
    private MyReviews:MyReviews,private My_Reviews:My_Reviews,public modalCtrl: ModalController ,
    public auth:AUTHService ,private PushNot:NotficationService,private notSer:AppNotficationService) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyReviewsPage');
    this.user=this.auth.getUser();
    this.User_Reviews();
  }

  back(){
    this.navCtrl.push(HomePage);
  }
  Setting(myevent,index,review,reviewid)
  {
   const more =this.options.create(OptionsPage,{'option':'review'});
   more.present({ev : myevent});
   more.onDidDismiss(
     (option:number)=>
       {
         switch (option) {
          case 4:
               this.update(index,review);
             break;
          case 5:
               this.delete(index,reviewid);
             break;
          default:
             break;
         }
       }
   );
  }
  update(index,review)
  {
    let reviewModal = this.modalCtrl.create(EditReviewsPage, {'review':review});
    reviewModal.onDidDismiss(data => {
     if(data)
     {
       this.ReviewsLikeResult[index].review=data;
       this.toastCtrl.create({
        message:'the review is updated',
        duration:3000
      }).present();
     } 
    });
    reviewModal.present();
  }

  delete(index,reviewid)
  {
    console.log(index);
    console.log(reviewid);
    this.My_Reviews.delete_myreview(reviewid).subscribe((data:any)=>{
       this.ReviewsLikeResult.splice(index,1);
       this.toastCtrl.create({
        message:'the review is deleted',
        duration:3000
      }).present();
    },(err)=>{console.log(err);})
  }

 
  User_Reviews()
  {
    this.My_Reviews.get_myreviews(this.user.id).subscribe((data:any[])=>
    {
      data.forEach(review=>
        {
          //console.log(data);
          this.Reviews.push(review);
        });
        console.log(this.Reviews);
        this.IsLiked();
        this.ReplayCounts();
    },(err)=>{

      console.log(err);
    })
  }
  
  IsLiked()
  {
    this.Reviews.forEach(review=>
      { 
        console.log(review);
        this.MyReviews.GetLikes(review.id).subscribe(
        (data:any[])=>
        {
         if(data)
         {
            this.likecount=data.length;
            console.log(data);
            data.forEach((like)=>
            {
              if(like.user==this.user.id)
              {
                this.islike=true;
                this.likeID=like.id
              }else
              {
                this.islike=false;
              }
            });
         }else
         {
           console.log(data);
           this.likecount=data.length;
           this.islike=false;
         }
         
         this.ReviewsLikeResult.push({'review':review,'likeid':this.likeID,'islike':this.islike,'likecount':this.likecount});  
         this.islike=false;
         this.likecount=0;
         this.ReplayCount=0;
        });
      });
      console.log(this.ReviewsLikeResult);
  }
  ReplayCounts()
  {
    this.Reviews.forEach(review=>
      {  
       this.MyReviews.get_reply(review.id).subscribe(
      (data:any[])=>
       {
        if(data)
        {
          this.ReplayCount=data.length;
        }else
        {
         this.ReplayCount=0;
        }
        this.ReviewsReplayResult.push({'review':review,'replayCount':this.ReplayCount})
      }); 
    });
    console.log(this.ReviewsReplayResult);
  }
  Like(reviewindex:number,reivewID:number){
    console.log(reivewID);
    console.log(reviewindex);
    this.ReviewsLikeResult[reviewindex].islike=true;
    this.ReviewsLikeResult[reviewindex].likecount+=1;
    let review = this.ReviewsLikeResult[reviewindex].review;
    this.MyReviews.Like(this.user.id,reivewID).subscribe((data:any)=>{

      if(data){
        this.ReviewsLikeResult[reviewindex].likeid=data.id;
        this.toastCtrl.create({
          message:'you liked this review',
          duration:3000
        }).present();
        this.notSer.AddUserNotification(3,review.userData.id,this.user.id,review.id).subscribe(messg=>{
          this.PushNot.pushNoticationForUser('Like',this.user.name + 'liked your review',review.userData.FCMToken).subscribe((message)=>{
            console.log(message);
          });
        })
      }else
      {
        this.ReviewsLikeResult[reviewindex].islike=false;
        this.ReviewsLikeResult[reviewindex].likecount-=1;
      }
    },err=>
    {
      this.ReviewsLikeResult[reviewindex].islike=false;
      this.ReviewsLikeResult[reviewindex].likecount-=1;
    });
  }

  dislike(reviewindex:number,likeID:number){
    console.log(likeID);
    console.log(reviewindex);
    this.MyReviews.DeleteLike(likeID).subscribe((data)=>{

        this.ReviewsLikeResult[reviewindex].islike=false;
        this.ReviewsLikeResult[reviewindex].likecount-=1;
        this.toastCtrl.create({
          message:'you disliked this review',
          duration:3000
        }).present();
      
    });

  }
  AddReplay(reviewId)
  {
    this.navCtrl.push(ReplayPage,{'reviewid':reviewId});
  }
  showlikes(reviewid:number)
  {
   let likesModal = this.modalCtrl.create(LikesPage, {'reviewid':reviewid});
   likesModal.onDidDismiss(data => {
    console.log('likespage close')
   });
   likesModal.present();
  }
}