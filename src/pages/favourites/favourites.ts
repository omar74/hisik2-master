import { AUTHService } from './../../services/user/AUTH.service';
import { FavouriteService } from './../../services/favourite.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  
   user :any; 
   FavouriteProducts =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public favouriteService :FavouriteService,public AUTHService:AUTHService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavouritesPage');
    this.user=this.AUTHService.getUser();
    this.userfavourites(this.user.id);
    //this.userfavourites(1);
  }


  back(){
    this.navCtrl.push(HomePage);
  }

  product(ProductDetails){
    this.navCtrl.push(ProductPage,{'product':ProductDetails});
    console.log(ProductDetails)
  }

userfavourites(userid)
{
  this.favouriteService.MyFavourites(userid)
  .subscribe(
    (data:any[])=>
    {
      if(data.length>0)
      {
        this.FavouriteProducts=data;
        console.log(this.FavouriteProducts);
      }
      else
      {
        this.FavouriteProducts=[];
      }
    }
    );

}


}
