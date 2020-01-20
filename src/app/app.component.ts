// import { NotficationService } from './../services/Notfcation/notfication.service';
import { HomePage } from './../pages/home/home';
import { SettingPage } from './../pages/setting/setting';
import { AUTHService } from './../services/user/AUTH.service';
import { MyReviewsPage } from './../pages/my-reviews/my-reviews';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScannedProductsPage } from '../pages/scanned-products/scanned-products';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LogInPage } from '../pages/log-in/log-in';
import { CommonModule } from '@angular/common';
import firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';
import { NotficationService } from '../services/Notfcation/notfication.service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  scannedProductsPage = ScannedProductsPage;
  favouritesPage = FavouritesPage;
  reviewsPage = MyReviewsPage;
  signUpPage = SignUpPage;
  logInPage=LogInPage;
  homepage=HomePage;
  @ViewChild('nav') nav : NavController;


  user :any;
  isAuthinticated : boolean;
  imagePath="";

  constructor(private platform: Platform, public menuCtrl:MenuController,private statusBar: StatusBar, 
    private splashScreen: SplashScreen, private authService:AUTHService,private fcm: FCM,private pushNot:NotficationService,public toastController: ToastController
    ) {
          if(this.authService.IsAuthinticated())
          {
             this.user=this.authService.getUser();
             console.log("mneu",this.user);
             this.imagePath=this.user.ImageURL;  
             this.isAuthinticated=true;   
          }else
          {
            this.isAuthinticated=false;  
          }

         if(!firebase.apps.length)
         {   
           firebase.initializeApp({
           production: false,
           apiKey: "AIzaSyBYThMrbjOwXLTksqVd2zWKmwH86nfbydg",
           authDomain: "ionic-763e1.firebaseapp.com",
           databaseURL: "https://ionic-763e1.firebaseio.com",
           projectId: "ionic-763e1",
           storageBucket: "ionic-763e1.appspot.com",
           messagingSenderId: "543642243705"
           });
         }

         platform.ready().then(()=>
         {
           statusBar.styleDefault();
           splashScreen.hide();
         });
         this.initializeApp();
  }
  
  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
      
  }
  // getToken()
  // {
  //   this.fcm.getToken().then(token => {
  //     console.log(token);
  //   });
  // }
  // getNot()
  // {
  //   this.fcm.onNotification().subscribe(data => {
  //     console.log(data);
  //     if (data.wasTapped) {
  //       console.log('Received in background');
  //     } else {
  //       console.log('Received in foreground');
  //     }
  //   });
  // }
  // refreshToken()
  // {
  //   this.fcm.onTokenRefresh().subscribe(token => {
  //     console.log(token);
  //   });
  // }
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

 
  initializeApp() {
    this.platform.ready().then(() => {
      //Notifications
      this.fcm.subscribeToTopic('all');
      this.fcm.getToken().then(token=>{
          console.log(token);
          this.pushNot.setToken(token);
      })
      this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      })
      this.fcm.onTokenRefresh().subscribe(token=>{
        console.log(token);
      });
      //end notifications.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
    });
  }
}

