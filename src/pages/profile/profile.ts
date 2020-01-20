import { ProductPage } from './../product/product';
import { ScannedProductsPage } from './../scanned-products/scanned-products';
import { ProfileService } from '../../services/user/profile.service';
import { Component } from '@angular/core';
import { NavController,  } from 'ionic-angular';
import { AUTHService } from './../../services/user/AUTH.service';
import { scannedproductServices } from './../../services/user/scannedproduct.services';
import { ScanService } from '../../services/scan.Service';


@Component({
  selector: 'page-profile',
  templateUrl:'profile.html'
})
export class ProfilePage {
  isauthinticated:boolean;
  user :any;
  ScannedProducts:any[] =[];
  constructor(public navCtrl: NavController,public authService:AUTHService ,public scannedproductServices:ScanService) {
    if(this.authService.IsAuthinticated())
    {
      this.isauthinticated=true;
      this.user=this.authService.getUser();
      console.log(this.user);
      this.userScanned(this.user.id);
    }else
    {
      this.isauthinticated=false;
    } 
  }
 ionViewDidLoad() 
  {
    console.log('ionViewDidLoad profilePage'); 
  }
 detail(product)
  {
    this.navCtrl.push(ProductPage,{'products':product});
  }
 more()
  {
    this.navCtrl.push(ScannedProductsPage);
  }

 userScanned(userid)
 {
  this.scannedproductServices.getRecentScan(userid)
  .subscribe(
    (data:any[])=>
    {
      if(data.length>0)
      {
        this.ScannedProducts=data;
        console.log(this.ScannedProducts);
      }
      else
      {
        this.ScannedProducts=[];
      }
    }
    );
 }

}