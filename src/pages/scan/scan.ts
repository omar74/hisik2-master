import { AUTHService } from './../../services/user/AUTH.service';
import { ScanService } from './../../services/scan.Service';
import { ScanResultPage } from './../scan-result/scan-result';
import { HttpClient } from '@angular/common/http';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, Slides } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})


export class ScanPage {
  public err ;
  imageResult;
  Drow = false;
  @ViewChild(Slides) slides: Slides;
  public result;
  public ROOT_URL = 'https://vision.googleapis.com';
  public API_KEY = 'AIzaSyAdDscyxa7qmSXQjMPRUMU516yD_AI_7xg'; // YOUR CLOUD PLATFORM API KEY
  public visionRequest = {
    "requests": [{
        "image": {
          "content": ''
        },
        "features": [
        {
          "type": "TEXT_DETECTION",
          "maxResults": 10
        },
        {
          "type": "OBJECT_LOCALIZATION",
          "maxResults": 10
        },
        {
          "type": "LOGO_DETECTION",
          "maxResults": 5
        },
        {
          "type": "LABEL_DETECTION",
          "maxResults": 10
        },       
        {
          "type": "SAFE_SEARCH_DETECTION",
          "maxResults": 10
        },       
       ]
    }]
  };
  canvas = document.getElementById('tempCanvas');
  @ViewChild('layout')canvasref;
  public visionResult ;
  picture ='';

  labelAnotation :Array<any> = [];

  cameraOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    toBack: true,
    camera: 'rear',
    //tapPhoto: true,
    //previewDrag: true,
    //alpha: 1
  };

  cameraPictureOpts: CameraPreviewPictureOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    quality: 100
  };
  constructor( public cameraPreview: CameraPreview 
              ,public toastCtrl :ToastController
              ,private loader :LoadingController
              ,public navCtrl   :NavController
              ,public navParams: NavParams,public http: HttpClient,public alertCtrl: AlertController,
               public ScanService:ScanService, public auth:AUTHService, public camera:Camera,private tts: TextToSpeech
               ) 
               {
                 //this.picture = "../assets/imgs/download.jpg";
               }
  
 ionViewDidLoad() {
    this.startCamera();
  }

  async startCamera() {
    this.picture = null;
    const result = await this.cameraPreview.startCamera(this.cameraOpts);
    console.log(result);
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }
  gohome(){
    this.navCtrl.push(HomePage)
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
        let loader = this.loader.create({
          content: "Processing..."
        });
        loader.present(); 
        this.picture= "data:image/jpeg;base64,"+imagedata;
        this.visionRequest.requests[0].image.content=this.picture;
        this.http.post(`${this.ROOT_URL}/v1/images:annotate?key=${this.API_KEY}`, this.visionRequest)
        .subscribe((data: any) => {
          this.visionResult = data;
          this.labelAnotation = this.visionResult.responses[0].labelAnnotations;
          console.log(data,'working');
          loader.dismiss(); // hide loading component
         
        }, (err) => {
          loader.dismiss(); // hide loading component
          this.err = err;
          this.showAlert('there is a problem , may be a network problem');
          console.log(err);
        })
      })
      .catch((error)=>{
        this.toastCtrl.create({
          message:'Error in Capturing Image : '+error,
          duration:3000
        }).present();
      })
  }
  async takePicture() {
    await this.cameraPreview.takePicture(this.cameraPictureOpts).then(
      (res) => {
        this.picture = 'data:image/jpeg;base64,' + res;//`data:image/jpeg;base64,${res}`;
        console.log(res)
        let loader = this.loader.create({
          content: "Processing..."
        });
        loader.present(); 
        this.imageResult = 'data:image/jpeg;base64,' + res;
        this.visionRequest.requests[0].image.content=res[0];
        this.http.post(`${this.ROOT_URL}/v1/images:annotate?key=${this.API_KEY}`, this.visionRequest)
        .subscribe((data: any) => {
          this.visionResult = data;
          this.labelAnotation = this.visionResult.responses[0].labelAnnotations;
          console.log(data,'working');
          loader.dismiss(); // hide loading component
         
        }, (err) => {
          loader.dismiss(); // hide loading component
          this.err = err;
          this.showAlert('there is a problem , may be a network problem');
          console.log(err);
        })
        console.log('google api');
    

      },
      (err) => {
        console.log(err)
      });
    
    await this.cameraPreview.stopCamera();
    
  }
  goback()
  {
    console.log('baaack');
    this.navCtrl.pop();
  }
  classify()
  {
    if(this.picture !=null)
      {
       if(this.auth.IsAuthinticated())
       {
        let user = this.auth.getUser() 
        const ImageRef=firebase.storage().ref("ScanPictures/image-"+new Date().getMilliseconds()+".jpg");
        ImageRef.putString(this.picture,firebase.storage.StringFormat.DATA_URL)
        .then((snapshot)=>{
        const scan =
        {
          user: user.id,
          product: null,
          brand: null,
          Category: null,
          ImageURL:snapshot.downloadURL,
        }
        this.ScanService.AddScan(scan).subscribe((data)=>
        {
          if(data)
          {
           this.navCtrl.push(ScanResultPage,{'visionresult':this.visionResult,'ScannedImage':this.picture,'scan':data});
          }
        },(err)=>
        {
         this.toastCtrl.create({
         message:'problem happened during saving the data'+err,
         duration:3000
          }).present();
        });
        }).catch(error=>{
         this.toastCtrl.create({
           message:'Error in saving Image : '+error,
           duration:3000
         }).present();
       });
      }
      else
      {
        this.navCtrl.push(ScanResultPage,{'visionresult':this.visionResult,'ScannedImage':this.picture});
      }    
    }
  }
  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Hisik',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }
  drow ()
  {
    let image = this.picture;
    
      let canvas = this.canvasref.nativeElement;
      let context = this.canvasref.getContext('2d');

      let source = new Image(); 
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
          canvas.height = source.height;
          canvas.width = source.width;
          context.drawImage(source, 0, 0);

          context.font = "100px impact";
          context.textAlign = 'center';
          context.fillStyle = 'black';
          context.fillText('HELLO WORLD', canvas.width / 2, canvas.height * 0.8);

          image = canvas.toDataURL();  
      };
      source.src = image;
      
    
  }
  swaptoLeft()
  {
    this.slides.slidePrev();
  }
  swaptoRight()
  {
    this.slides.slideNext();
  }
  slideChanged()
  {
    let currentIndex = this.slides.getActiveIndex();
    this.tts.speak(this.labelAnotation[currentIndex].description)
   .then(() => console.log('Success'))
   .catch((reason: any) => console.log(reason));
  }
}

