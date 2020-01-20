import { NotficationService } from './../../services/Notfcation/notfication.service';
import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
import { SignUpPage } from '../sign-up/sign-up';
import { AUTHService } from '../../services/user/AUTH.service';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';


/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  constructor(public navCtrl: NavController,private emailComposer: EmailComposer ,private PushNot:NotficationService ,
    public navParams: NavParams, private AUTHService:AUTHService , public alertCtrl: AlertController) {
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad LogInPage');
  }

  forget(){
    this.navCtrl.push(ForgetpasswordPage);
  }

  Create(){
    this.navCtrl.push(SignUpPage);
  }


  login(form:NgForm)
  {

    this.AUTHService.login(form.value.Email,form.value.Password).subscribe((data)=>{
      console.log(data);
      if (data[0]['Status'] == true )
      {

          const alert = this.alertCtrl.create({
            title: 'error!',
            subTitle: 'you are boclked ',
            buttons: ['OK']
          });
          alert.present();
      }
      else 
      {
        let check=this.AUTHService.store_user(data[0]);
        if(check)
         {
           data[0]['FCMToken'] == this.PushNot.getToken;
           this.AUTHService.updateUser(data[0]['id'],data[0]).subscribe(data=>
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
         
      }
    });
    console.log(form.value.text);
  }


} 
