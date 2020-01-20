import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  choose:string='';
  settingOptions:boolean;
  reviewOptions:boolean;
  constructor(public navCtrl: NavController,public ViewCtrl:ViewController ,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
    this.choose=this.navParams.get('option');
    console.log(this.choose);
    if(this.choose=="review")
    {
      this.reviewOptions=true;
    }else
    {
      this.settingOptions=true;
    }
  }
  Close(option:number)
  {
    this.ViewCtrl.dismiss(option);
  }
}
