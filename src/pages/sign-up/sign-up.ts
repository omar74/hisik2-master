import { NotficationService } from './../../services/Notfcation/notfication.service';
import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AUTHService } from '../../services/user/AUTH.service';
import { Device } from '@ionic-native/device';


/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  ConfirmPassowrderror:boolean=false; 
  usernameEmailError:boolean=false;

  constructor(public alertCtrl: AlertController,
    private device: Device,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private AUTHService:AUTHService,private pushNot:NotficationService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  Register(form:NgForm)
  { if(form.value.password===form.value.Confirmpassword)
    {
     const body= {
     'FirstName': form.value.FirstName,
     'LastName' : form.value.LastName,
     'UserName' : form.value.UserName,
     'Password' : form.value.Password,
     'Email'    : form.value.Email,
     'DeviceID' : this.device.uuid,
     'FCMToken' :this.pushNot.getToken,
      }
     this.AUTHService.register(body).subscribe((res)=>{
      let check=this.AUTHService.store_user(res);
        if(check) 
         {
           res['FCMToken'] == this.pushNot.getToken;
           console.log(res['FCMToken']);
           this.AUTHService.updateUser(res['id'],res).subscribe(data=>
            { 
              this.navCtrl.setRoot(HomePage);
            },err=>console.log(err));
         } 
        else
         {
          const alert = this.alertCtrl.create({
            title: 'error!',
            subTitle: 'something is wrong! ',
            buttons: ['OK']
          });
          alert.present();
         }
    },(err)=>
    {
      if(err.status == 400)
      {
        this.usernameEmailError=true;
        const alert = this.alertCtrl.create({
          title: 'error!',
          subTitle: 'user name or email is already exist!',
          buttons: ['OK']
        });
        alert.present();
      }else
      {
        const alert = this.alertCtrl.create({
          title: 'error!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    });
    console.log(form.value.text);
  }else
  {
    this.ConfirmPassowrderror=true;
    this.showAlert();
  }
  
}
showAlert() {
  const alert = this.alertCtrl.create({
    title: 'Warning',
    subTitle: 'Please, be sure that the confirm password is the same as password',
    buttons: ['OK']
  });
  alert.present();
}
}
