import { ScanPage } from './../scan/scan';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FabCameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fab-camera',
  template:
   `
  <ion-fab right bottom id="fabs">
    <button ion-fab icon-only (click)="openScan()">
      <ion-icon name="camera" color="blue"></ion-icon>
    </button>
  </ion-fab>
  `,
})
export class FabCameraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FabCameraPage');
  }
  openScan()
  {
    this.navCtrl.push(ScanPage);
  }

}
