import { ScanService } from './../../services/scan.Service';
import { AUTHService } from './../../services/user/AUTH.service';
import { scannedproductServices } from './../../services/user/scannedproduct.services';
import { ProductPage } from './../product/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


/**
 * Generated class for the ScannedProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanned-products',
  templateUrl: 'scanned-products.html',
})
export class ScannedProductsPage { 
  title:string="Scannned Product";
  UnreadNotificationNumber:any=1;  

  user :any;
  ScannedProducts =[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams, public AUTHService:AUTHService , 
     public scannedproductServices:ScanService,public toastCtrl:ToastController
    ) {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ScannedProductsPage');
     this.user=this.AUTHService.getUser();
     this.userScanned(this.user.id)
     //this.userScanned(1);
  }
  detail(product){
    this.navCtrl.push(ProductPage,{'product':product});
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
   Delete(index:number,scanid:number)
   {
     this.scannedproductServices.DeleteUserScan(scanid).subscribe(
       (data)=>
       {
        this.ScannedProducts.splice(index,1);
        this.toastCtrl.create({
          message:'this scan is deleted succussfully',
          duration:2000
        }).present();
       }
     );
   }  
}
