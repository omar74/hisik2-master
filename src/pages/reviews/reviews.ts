import { AppNotficationService } from './../../services/Notfcation/appnotification.service';
import { NotficationService } from './../../services/Notfcation/notfication.service';
import { ProductService } from './../../services/product.service';
import { AUTHService } from './../../services/user/AUTH.service';
import { ReplayPage } from './../replay/replay';
import { Chart } from 'chart.js';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import {MyReviews} from'../reviews/Reviews.Service';
import { LikesPage } from '../likes/likes';




/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})

export class ReviewsPage {
  user;
  productid;
  Reviews:any=[];
  ReviewsLikeResult=[];
  ReviewsReplayResult=[];
  likeID:number=null;
  islike:Boolean=false;
  ReplayCount=0;
  likecount=0;

  
  @ViewChild('chartCanvas') chartCanvas;
  chartVar: any;  
  rate5:number=0 ;
  rate4:number=0 ;
  rate3:number=0 ;
  rate2:number=0 ;
  rate1:number=0 ; 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private MyReviews:MyReviews
    ,public modalCtrl: ModalController
    ,public productService: ProductService
    ,public toastCtrl:ToastController
    ,public auth:AUTHService,
    private PushNot: NotficationService,
    private notSer:AppNotficationService
    ) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
    this.productid=this.navParams.get('productid');
    this.product_Reviews();
    this.user=this.auth.getUser();
  }
  product_Reviews()
  {
    this.MyReviews.get_product_reviews(this.productid).subscribe((data:any[])=>
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
  
  ngAfterViewInit() {
    this.CalculateRate();
  }
  showChart() {
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'Ratings',
          data: [this.rate5, this.rate4, this.rate3 , this.rate2 , this.rate1 ],
          backgroundColor: [
            'rgb(217, 15, 36)',
            'rgb(234, 174, 28)',
            'rgb(220, 121, 25)',
            'rgb(219, 73, 30)',
            'rgb(219, 24, 22)',

          ],hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ],
        weight:5
        }],
        labels: [
          'five star',
          'four star',
          'three star',
          'two star',
          'one star',
        ]
 
      },
      options: {
        legend: {
          display: true,
          position:'bottom'
        },
        tooltips: {
          enabled: true,
          mode: 'point'
        },
        title:{
          display:true,
          text:"Ratings",
        }
      }
 
    })
  }
  CalculateRate()
  {
    this.productService.CalculateRate(1).subscribe(
        (data:any[])=>
        {
          if(data)
          {
              console.log(data);
              data.forEach(review => {
                  if(review.rate == 5)
                  {
                     this.rate5= this.rate5+1;
                  }else if(review.rate == 4)
                  {
                     this.rate4=this.rate4+1;
                  }else if(review.rate == 3)
                  {
                     this.rate3=this.rate3+1;
                  }else if(review.rate == 2)
                  {
                     this.rate2=this.rate2+1;
                  }else if(review.rate == 1)
                  {
                     this.rate1=this.rate1+1;
                  }
              });
              console.log(this.rate1+" "+this.rate2+" "+this.rate3+" "+this.rate4+" "+this.rate5)
              this.showChart();
          }
    });
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

  






  

  






