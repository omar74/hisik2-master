import { FavouriteService } from './../../services/favourite.service';
import { SignUpPage } from './../sign-up/sign-up';
import { LogInPage } from './../log-in/log-in';
import { AUTHService } from './../../services/user/AUTH.service';
import { ProductPage } from './../product/product';
import { ScanService } from './../../services/scan.Service';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the SimilarProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-similar-products',
  templateUrl: 'similar-products.html',
})
export class SimilarProductsPage {
  scan;
  RateResult:any=[];
  FavResult:any=[];
  productRate:number;
  productVotes:number;
  procuctStars:number;
  products:any=[];
  result:any=[];
  user;
  isauth=false;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public productService:ProductService,
     public scanService: ScanService,
     public auth:AUTHService,
     public FavouriteService:FavouriteService,
     public alertCtrl:AlertController
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimilarProductsPage');
    this.result=this.navParams.get('products');
    this.result.forEach(pro => {
      this.products.push(pro);
    });
    if(this.auth.IsAuthinticated())
      {
        this.scan=this.navParams.get('scan');
        this.user=this.auth.getUser();
        this.isauth=true;
        this.CheckFavourits();
      }else
      {
        this.isauth=true;
      }
     this.CalculateRate();
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
  ShowProduct(product)
  {
    let isauthinticated=this.auth.IsAuthinticated();
    if(isauthinticated)
    {
      const userscan=
      {
      user: this.scan.user,
      product: product.product.id,
      brand: product.product.brand,
      Category: product.product.Category,
      ImageURL:this.scan.ImageURL,
      Blocked: this.scan.Blocked,
      satisfy: true,
     }
     this.scanService.UpdateScan(this.scan.id,userscan).subscribe(
      (data)=>
      {
        if(data)
        {
          this.navCtrl.push(ProductPage,{'product':product,'scanimage':this.scan.ImageURL});
        }
      }
     );
     
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
            this.navCtrl.setRoot(SignUpPage);
          }
        },
        {
          text: 'LogIin!',
          handler: () => {
            this.navCtrl.setRoot(LogInPage);
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
