import { MessagePage } from './../message/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-faq-help',
  templateUrl: 'faq-help.html',
})
export class FaqHelpPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqHelpPage');
  }
  OpenMessage()
  {
    this.navCtrl.push(MessagePage);
  }
 
}
