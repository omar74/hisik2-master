import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SearchService } from '../../services/Search.Service';
import { ProductService } from '../../services/product.service';
import { FavouriteService } from '../../services/favourite.service';
import { AUTHService } from '../../services/user/AUTH.service';
import { ProductPage } from '../product/product';
import { SignUpPage } from '../sign-up/sign-up';
import { LogInPage } from '../log-in/log-in';

@IonicPage()
@Component({
  selector: 'page-recommanded-resualt',
  templateUrl: 'recommanded-resualt.html',
})
export class RecommandedResualtPage {
  recommandeditem:any[];
  q:string;
  text:string;
  id:any;
  usersearch;
  RateResult:any=[];
  FavResult:any=[];
  productRate:number;
  productVotes:number;
  procuctStars:number;
  products:any=[];
  result:any=[];
  user;
  isauth:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public SearchService:SearchService,public productService:ProductService,
    public FavouriteService:FavouriteService,public auth:AUTHService,
    public alertCtrl:AlertController) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommandedResualtPage');
      if(this.auth.IsAuthinticated())
      {
       
        this.user=this.auth.getUser();
        this.ShowRecommanded(this.user.id);
        this.isauth=true;
      }else
      {
        this.isauth=false;
      }  
    
  }

  ShowRecommanded(user){
    this.SearchService.ShowRecommandedSearch(user).subscribe(
      (data:any[])=>{
        console.log(data);
        data.forEach(pro => {
          this.products.push(pro);
        });
        this.CalculateRate();
        this.CheckFavourits();
      }
    );
  }
  CheckFavourits()
  {
   this.products.forEach(product=>
    { 
     let fav:boolean=false;
  
     this.FavouriteService.ProductsFavourite(product.id).subscribe((data:any[])=>{
      data.forEach(favourite =>
        {
            if(favourite.user == this.user.id)
            {
               fav=true;
            }else
            {
               fav=false;
            }
        });
        this.FavResult.push({'product':product,'isfav':fav});
        fav=false;
        console.log(this.FavResult);
      }
    );
   });
  }
  CalculateRate()
  {
   this.products.forEach(product=>
    { 
      this.productService.CalculateRate(product.id).subscribe(
        (data:any[])=>
        {
          if(data)
          {
              let rate5:number=0 ,rate4:number=0 ,rate3:number=0 ,rate2:number=0 ,rate1 :number =0; 
              console.log(data);
              data.forEach(review => {
                  if(review.rate == 5)
                  {
                      rate5=rate5+1;
                  }else if(review.rate == 4)
                  {
                      rate4=rate4+1;
                  }else if(review.rate == 3)
                  {
                      rate3=rate3+1;
                  }else if(review.rate == 2)
                  {
                      rate2=rate2+1;
                  }else if(review.rate == 1)
                  {
                      rate1=rate1+1;
                  }
              });
           this.productRate=Math.round(((1*rate1)+(2*rate2)+(3*rate3)+(4*rate4)+(5*rate5))/data.length);
           this.productVotes=data.length;
           this.procuctStars=Math.round(this.productRate);
           console.log(this.procuctStars+" "+this.productVotes+" "+this.productRate);
           this.RateResult.push({'product':product,'rate':this.productRate,'stars':this.procuctStars});
          }else
          {
           this.procuctStars=0;
           this.productRate=0.0;
           this.productVotes=0;
          }
        }
        );
    });
    console.log(this.RateResult);
  }
  Detials(item){
    let isauthinticated=this.auth.IsAuthinticated();
    if(isauthinticated)
    {
      this.navCtrl.push(ProductPage,{'product':item});

    }else
    {
      this.showAlert()
    }
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'you must be logged in',
      buttons: [
        {
          text: 'make an account!',
          handler: () => {
            this.navCtrl.push(SignUpPage)
          }
        },
        {
          text: 'LogIin!',
          handler: () => {
            this.navCtrl.push(LogInPage)
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });
    alert.present();
  }

}
