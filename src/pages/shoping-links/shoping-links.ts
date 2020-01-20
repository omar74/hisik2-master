import { SettingPage } from './../setting/setting';
import { LinksService } from './../../services/crowler.service';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@IonicPage()
@Component({
  selector: 'page-shoping-links',
  templateUrl: 'shoping-links.html',
})
export class ShopingLinksPage {
  Links :any=[];
  product:string;
  proceed:boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public LinksService:LinksService,
    private browserTab: BrowserTab,
    public alertCtrl:AlertController,
    private clipboard: Clipboard, 
    public toastCtrl: ToastController
    ) {
    console.log('ionViewDidLoad ShopingLinksPage');
    this.product=this.navParams.get('product');
    console.log(this.product)
    this.LinksService.getShoppingLinks(this.product).subscribe((data:any)=>
      {
        if(data)
        {
          this.Links=data.shopping_results;
          console.log(this.Links);
          this.proceed=true;
        }else
        {
          this.proceed=false;
        }
      },err=>console.log(err));
  }
  OpenUrl(Link)
  {
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(Link);
      } else {
        this.showAlert(Link);
      }
    });
      
  }
  showAlert(Link) {
    const alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: "Can't open the Link in the phone browser",
      buttons: [
        {
          text: 'Copy Link',
          handler: data => {
            this.clipboard.copy(Link);
            this.toastCtrl.create({
              message:'the link is copied',
              duration:2000
               }).present();
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            this.clipboard.clear();
          }
        }
      ]
    });
    alert.present();
  }

}
