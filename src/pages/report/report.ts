import { LogInPage } from './../log-in/log-in';
import { SignUpPage } from './../sign-up/sign-up';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { MassageService } from '../../services/messages.service';
import { ReportService } from '../../services/Report.Service';
import { AUTHService } from '../../services/user/AUTH.service';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  user;
  product;
  constructor(public navCtrl: NavController,public toastCtrl:ToastController,
    public alertCtrl:AlertController,public navParams: NavParams
    ,private ReportService:ReportService,public auth:AUTHService) {

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    if(this.auth.IsAuthinticated())
    {
      this.user=this.auth.getUser();
      this.product=this.navParams.get('product');
    }
    
  }

  SendReport(form:NgForm)
  {
    if(this.auth.IsAuthinticated())
    {
      const body= {
      'user' : this.user.id,
      'proudct':this.product.id,
      'Description':form.value.Description,
      'name':form.value.Name,
      'brand':form.value.Brand,
      'category':form.value.Category,
      'comment':form.value.Comment,
     } 
      this.ReportService.SendReport(body).subscribe((data)=>{
        this.toastCtrl.create({
          message:'the report is sent',
          duration:3000
        }).present();
       });
     console.log(form.value.text);
    }else
    {
      this.showAlert();
    }
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