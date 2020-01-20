import { LinksPage } from './../links/links';
import { AppNotficationService } from './../../services/Notfcation/appnotification.service';
import { LogInPage } from './../log-in/log-in';
import { AUTHService } from './../../services/user/AUTH.service';
import { SimilarProductsPage } from './../similar-products/similar-products';
import { ScanService } from './../../services/scan.Service';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { NotficationService } from '../../services/Notfcation/notfication.service';

/**
 * Generated class for the ScanResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-result',
  templateUrl: 'scan-result.html',
})
export class ScanResultPage {
  visionResponse;
  labelAnotation :Array<any> = [];
  localizedObjectAnnotations :Array<any> = [];
  //adults :Array<any> = [];
  adults:any;
  text :Array<any> = [];
  logo :Array<any> = [];
  image; 
  scan:any;
  user:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private tts: TextToSpeech,
     public productService:ProductService,
     public scanService: ScanService,
     public toastCtrl:ToastController, 
     public alertCtrl :AlertController,
     public loadCtrl:LoadingController,
     public auth:AUTHService,
     private pushNot:NotficationService,private notSer:AppNotficationService) {
  }

  ionViewDidLoad() {
    
    this.image=this.navParams.get('ScannedImage');
      if(this.auth.IsAuthinticated())
      {
        this.scan=this.navParams.get('scan');
        this.user=this.auth.getUser();
      }
    this.visionResponse = this.navParams.get('visionresult');
    console.log(this.visionResponse.responses[0].labelAnnotations);
    this.adults = this.visionResponse.responses[0].safeSearchAnnotation;
    console.log(this.adults,'adults');
    this.CheckNudity();
    this.labelAnotation = this.visionResponse.responses[0].labelAnnotations;
    //console.log(this.visionResponse.responses[0].labelAnnotations);
    this.logo   = this.visionResponse.responses[0].logoAnnotations;
    //console.log(this.visionResponse.responses[0].labelAnnotations);
    this.text   = this.visionResponse.responses[0].textAnnotations;
    console.log(this.labelAnotation,'anotation');
    this.adults = this.visionResponse.responses[0].safeSearchAnnotation;
    console.log(this.adults,'adults');
    this.localizedObjectAnnotations = this.visionResponse.responses[0].localizedObjectAnnotations;
    console.log(this.localizedObjectAnnotations,'multible objects');
  }
  round(num)
  {
    let result = num*100;
    return Math.round(result);
  }
  CheckNudity()
  {
    if(this.adults.adult == 'LIKELY' || this.adults.racy == 'LIKELY')
    {
      if(this.auth.IsAuthinticated())
      {
        if(this.user.WarningScore == 0)
        {
          this.user.WarningScore == 1;
          this.scan.Blocked=true;
          this.auth.updateUser(this.user.id,this.user).subscribe((data)=>
            {
              this.scanService.UpdateScan(this.scan.id,this.scan).subscribe((data)=>
              {
                this.showAlert("this is your frist warning don't scan a nudity  object again ,please!");
                this.notSer.adminNotification(1,this.scan.id,null).subscribe(data=>
                  {
                    this.pushNot.pushNotfiation('Nudity Alerted',null,this.user.UserName + 'has reached the limit of scanning +18 content.').subscribe();
                  }); 
             });
            });
        }else
        {
          if(this.user.WarningScore == 1)
          {
           this.user.WarningScore == 2;
           this.scan.Blocked=true;
           this.auth.updateUser(this.user.id,this.user).subscribe((data)=>
            {
              this.scanService.UpdateScan(this.scan.id,this.scan).subscribe((data)=>
              {
                this.showAlert("this is your second warning don't scan a nudity  object again ,please!");
                this.notSer.adminNotification(1,this.scan.id,null).subscribe(data=>
                  {
                    this.pushNot.pushNotfiation('Nudity Alerted',null,this.user.UserName + 'has reached the limit of scanning +18 content.').subscribe();
                  });              
              });
            });
          }else
          {
            if(this.user.WarningScore == 2)
            {
             this.user.WarningScore == 3;
             this.user.Status=true;
             this.scan.Blocked=true;
             this.auth.updateUser(this.user.id,this.user).subscribe((data)=>
             {
              this.scanService.UpdateScan(this.scan.id,this.scan).subscribe((data)=>
              {
                this.showAlert("this was your third time you scan a nudity object so you are blocked until the admin unblocked you");
                this.notSer.adminNotification(1,this.scan.id,null).subscribe(data=>
                  {
                    this.pushNot.pushNotfiation('Nudity Alerted',null,this.user.UserName + 'has reached the limit of scanning +18 content.').subscribe();
                    this.navCtrl.setRoot(LogInPage);
                  });
              });
             });
            }
          }
        }
      }else
      {
         this.showAlert("please don't scan a nudity object again.");
         this.navCtrl.setRoot(LogInPage);
        }
    }else
    {
      if(this.adults.adult == 'VERY_LIKELY' || this.adults.racy == 'VERY_LIKELY')
      {
        this.user.WarningScore == 3;
        this.user.Status=true;
        this.scan.Blocked=true;
        this.auth.updateUser(this.user.id,this.user).subscribe((data)=>
         {
           this.scanService.UpdateScan(this.scan.id,this.scan).subscribe((data)=>
           {
            this.showAlert("you scan a very nudity object so you are blocked until the admin unblocked you");
            this.notSer.adminNotification(1,this.scan.id,null).subscribe(data=>
              {
                this.pushNot.pushNotfiation('Nudity Alerted',null,this.user.UserName + 'has reached the limit of scanning +18 content.').subscribe(data=>
                  {
                    this.navCtrl.setRoot(LogInPage);
                  });
              }); 
           });
         }); 
      }  
    }
  }
  showAlert(message:string) {
    const alert = this.alertCtrl.create({
      title: 'this scan might have a nudity object',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  speak(message)
  {
   this.tts.speak(message)
   .then(() => console.log('Success'))
   .catch((reason: any) => console.log(reason));
  }

  SimilarCategoryProduct(Category:string)
  {
    const loading = this.loadCtrl.create({
    content:"Searching ...",
     });
    loading.present();
    this.productService.getSimilarProducts(null,Category).subscribe(
     (data:any[])=>
     { 
       loading.dismiss();
     
       if(data.length>0)
       {
        if(this.auth.IsAuthinticated())
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data,'scan':this.scan});
        }else
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data});
        }
       }else
       {
        loading.dismiss();
        this.toastCtrl.create({
          message:'there is no products for this category',
          duration:3000
        }).present();
        this.showSaerchAlert("category",Category);
       }
     },err=>
     {
      loading.dismiss();
      this.toastCtrl.create({
        message:'there is a problem :'+err,
        duration:3000
      }).present();
     }
   );
  }

  SimilarBrandsProduct(brand:string)
  {
    const loading = this.loadCtrl.create({
    content:"Searching ...",
     });
    loading.present();
    this.productService.getSimilarProducts(brand,null).subscribe(
     (data:any[])=>
     { 
       loading.dismiss();
     
       if(data.length>0)
       {
        if(this.auth.IsAuthinticated())
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data,'scan':this.scan});
        }else
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data});
        }
       }else
       {
        loading.dismiss();
        this.toastCtrl.create({
          message:'there is no products for this brand',
          duration:3000
        }).present();
        this.showSaerchAlert("brand",brand);
       }
     },err=>
     {
      loading.dismiss();
      this.toastCtrl.create({
        message:'there is a problem :'+err,
        duration:3000
      }).present();
     }
   );
  }
  showSaerchAlert(type,object) {
    const alert = this.alertCtrl.create({
      title: 'Recommend',
      subTitle: 'if you want to know places or links for this'+type,
      buttons: [
        {
          text: 'make an account!',
          handler: () => {
            this.navCtrl.push(LinksPage,{'product':object});
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
