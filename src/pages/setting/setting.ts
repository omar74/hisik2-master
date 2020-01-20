import { ProductService } from './../../services/product.service';
import { ScanService } from './../../services/scan.Service';
import { LinksService } from './../../services/crowler.service';
import { AUTHService } from './../../services/user/AUTH.service';
import { Camera } from '@ionic-native/camera';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController, Events, Slides, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import { LogInPage } from '../log-in/log-in';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  imagePath="";
  user:any;
  changePassword=false;
  isauth:boolean;
  usernameEmailError:boolean=false;
  ConfirmPassowrderror:boolean=false; 
  OldPassowrderror:boolean=false; 

  constructor(public navCtrl: NavController
    ,public auth:AUTHService,
    public toastCtrl:ToastController,
    public alertCtrl :AlertController ,
    public navParams: NavParams,
    public camera :Camera , 
    public actionSheetCtrl :ActionSheetController
    ,public loadCtrl:LoadingController,public events: Events,public productService:ProductService) {
     
   }
   
  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad SettingPage')
    if(this.auth.IsAuthinticated())
      {
        this.isauth=true;
        this.user=this.auth.getUser();
        console.log(this.user);
      }else
      {
        this.isauth=false;
      }      
   ;
    this.SimilarBrandsProduct("rolex");
  }
  SimilarBrandsProduct(brand:string)
  {
    const loading = this.loadCtrl.create({
    content:"Searching ...",
     });
    loading.present();
    this.productService.getSimilarProducts(brand,null).subscribe(
     (data:any[])=>
     { 
       loading.dismiss();
     
       if(data.length>0)
       {
        if(this.auth.IsAuthinticated())
        {
          //this.navCtrl.push(SimilarProductsPage,{'products':data,'scan':this.scan});
          console.log(data);
        }else
        {
          console.log(data);
        }
       }else
       {
        loading.dismiss();
        this.toastCtrl.create({
          message:'there is no products for this brand',
          duration:3000
        }).present();
       }
     },err=>
     {
      loading.dismiss();
      this.toastCtrl.create({
        message:'there is a problem :'+err,
        duration:3000
      }).present();
     }
   );
  }
 updatingUser(form:NgForm)
  {
      const loading = this.loadCtrl.create({
      content:"Updating...",
       });
      loading.present();
      if(this.imagePath != '' && this.imagePath != this.user.ImageURL)
      { 
       const ImageRef=firebase.storage().ref("UserPictures/image-"+new Date().getMilliseconds()+".jpg");
       ImageRef.putString(this.imagePath,firebase.storage.StringFormat.DATA_URL)
       .then((snapshot)=>{
       this.user.FirstName=form.value.FirstName;
       this.user.LastName=form.value.LastName;
       this.user.UserName=form.value.Username;
       if(this.changePassword)
       {
        this.user.Password=form.value.newPassword;
       }
       else
       {
        this.user.Password=form.value.OldPassword;
       }
       this.user.Email=form.value.Email;
       this.user.ImageURL=snapshot.downloadURL;
       this.auth.updateUser(this.user.id,this.check(this.user)).subscribe((data)=>
       {
         if(data)
         {
          if(this.auth.store_user(this.user))
          {
            loading.dismiss();
            this.toastCtrl.create({
              message:'successfully updating',
              duration:3000
            }).present();
          } 
         }
       },(err)=>
       {
         loading.dismiss();
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
          this.toastCtrl.create({
            message:'problem happened during updating the data',
            duration:3000
             }).present();
         }
         });
       }).catch(error=>{
        loading.dismiss();
        this.toastCtrl.create({
          message:'Error in saving Image : '+error,
          duration:3000
        }).present();
      });
      }
      else
      {
         this.user.FirstName=form.value.FirstName;
         this.user.LastName=form.value.LastName;
         this.user.UserName=form.value.Username;
         if(this.changePassword)
         {
          this.user.Password=form.value.newPassword;
         }
         else
         {
          this.user.Password=form.value.Password;
         }
         this.user.Email=form.value.Email;
         this.auth.updateUser(this.user.id,this.check(this.user)).subscribe((data)=>
         {
          if(data)
          {
          if(this.auth.store_user(this.user))
          {
            loading.dismiss();
            this.toastCtrl.create({
              message:'successfully updating',
              duration:3000
            }).present();
          } 
         }
        },(err)=>
        {
        loading.dismiss();
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
           this.toastCtrl.create({
           message:'problem happened during updating the data',
           duration:3000
            }).present();
         }
        });
      }
       this.changePassword=false;
       console.log(this.user);
  }
  SaveChanges(form:NgForm)
  {
    if(this.changePassword) 
    { 
      if(form.value.ConfirmOldPassword===this.user.Password)
      {
        if(form.value.newPassword===form.value.ConfirmPassword)
        {
           this.updatingUser(form);
           console.log(form);
        }else
        {
          this.ConfirmPassowrderror=true;
          this.showAlert('Please, be sure that the confirm password is the same as new password');
        }
       
      }
      else
      {
        this.OldPassowrderror=true;
        this.showAlert('Please, be sure that the old password is right');
      }
      
    }else
    {
      this.updatingUser(form);
      console.log(form);
    }
    console.log(form);
  }
  check(user)
  {
     let verfingUser = user;
     if(user.Status)
     {
      verfingUser.Status=user.Status;
     }else
     {
      verfingUser.Status=false;
     }
     if(user.ImageURL)
     {
      verfingUser.ImageURL=user.ImageURL;
     }else
     {
      verfingUser.ImageURL="";
     }
     if(user.WarningScore)
     {
       verfingUser.WarningScore=user.WarningScore;
     }else
     {
       verfingUser.WarningScore=0;
     }
     if(user.BlockedBy)
     {
       verfingUser.BlockedBy=user.BlockedBy;
     }else
     {
       verfingUser.BlockedBy="";
     }
    return verfingUser;
  }
  ChangePassword()
  {
    this.changePassword=true;
    console.log(this.changePassword);
  }
  showAlert(message:string) {
    const alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  Usecamera()
  {
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      cameraDirection:this.camera.Direction.BACK,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      })
      .then(imagedata=>{
        this.imagePath= "data:image/jpeg;base64,"+imagedata;
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in Capturing Image : '+error,
          duration:3000
        }).present();
      })
  }
  UploadImage()
  {
    this.camera.getPicture({
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:this.camera.EncodingType.JPEG,
      correctOrientation:true,
      cameraDirection:this.camera.Direction.BACK,
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      })
      .then(imagedata=>{
        this.imagePath= "data:image/jpeg;base64,"+imagedata;
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in Capturing Image : '+error,
          duration:3000
        }).present();
      })
  }
  LogOut()
  {
    let log;
    log=this.auth.logout();
    if(log)
    {
      this.toastCtrl.create({
        message:'Loged out Succussfully',
        duration:3000
      }).present();
      this.navCtrl.setRoot(LogInPage);
    }else
    {
      this.toastCtrl.create({
        message:'there is a problem happend',
        duration:3000
      }).present();
    }
    
  }
  Login()
  {
    this.navCtrl.push(LogInPage);
  }
  SignUp()
  {
    this.navCtrl.push(SignUpPage);
  }
  showActionSheet()
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Update your profile photo',
      enableBackdropDismiss:true,
      //cssClass:"actionsheat",
      buttons: [
        {
          text: 'Use Camera',
          icon:'camera',
          handler: () => {
            this.Usecamera()
          }
        },
        {
          text: 'Upload Image',
          icon:'image',
          handler: () => {
            this.UploadImage()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon:'close-circle',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
}
