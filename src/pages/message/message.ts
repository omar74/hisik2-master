import { LogInPage } from './../log-in/log-in';
import { SignUpPage } from './../sign-up/sign-up';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MassageService } from '../../services/messages.service';
import { NgForm } from '@angular/forms';
import { AUTHService } from '../../services/user/AUTH.service';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  user;
  constructor(public navCtrl: NavController,
    public alertCtrl:AlertController, 
    public navParams: NavParams,
    private messageService:MassageService
    ,public toastCtrl:ToastController
    ,public auth:AUTHService) {
      
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    if(this.auth.IsAuthinticated())
    {
      this.user=this.auth.getUser();
    }else
    {
      this.showAlert();
    } 

  }
  sendMessage(form:NgForm)
  {
    if(this.auth.IsAuthinticated)
    { 
    const body= {
      'text' : form.value.text,
      'user' : this.user.id
     } 
    this.messageService.SendMassage(body).subscribe((data)=>{
      this.toastCtrl.create({
        message:'the message is sent',
        duration:3000
      }).present();
     });
    }
    else
      {
        this.showAlert();
      }
    console.log(form.value.text);
  } 
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'you must be logged in',
      buttons: [
        {
          text: 'make an account!',
          handler: () => {
            this.navCtrl.push(SignUpPage)
          }
        },
        {
          text: 'LogIin!',
          handler: () => {
            this.navCtrl.push(LogInPage)
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
