import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AUTHService } from '../../services/user/AUTH.service';
import { NgForm } from '@angular/forms';
/**
 * Generated class for the ForgetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private AUTHService:AUTHService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }
 

  reset(form:NgForm){
    
    this.AUTHService.forgetpassword(form.value.email);
  
  }
}

