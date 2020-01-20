import { Device } from '@ionic-native/device';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable} from 'rxjs';
import { stringify } from '@angular/core/src/render3/util';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { global } from '@angular/core/src/util';
import { EmailComposer } from '@ionic-native/email-composer';
import { Ipadress } from '../IPaddress';
const endpoint= 'http://mostafaaziema.pythonanywhere.com/api/user/';
const endpoint2='http://mostafaaziema.pythonanywhere.com/api/user/?';
@Injectable()
export class AUTHService{
   Login:Boolean=false;
   checkUser:Boolean=false;
   user:any={};
   isauth:boolean=false;
    constructor(private http:HttpClient ,
       private emailComposer: EmailComposer,
       public alertCtrl: AlertController , 
       private device: Device,
       private storage: Storage)
    {
      
    }
    register(message)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,message,{headers:headers})
    }
    updateUser(userid,user)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.put(endpoint+userid+"/",user,{headers:headers})
    }    

    forgetpassword(email)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        this.http.get(endpoint+"?Email="+email,{headers:headers}).subscribe((data:any[])=>
        {
           if(data.length>0)
           {
            console.log(data); 
            let userID= data[0]['id'];
            data[0]['Password']=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            let body= {
              'FirstName'     : data[0].FirstName,
              'LastName'      : data[0].LastName,
              'UserName'      : data[0].UserName,
              'Password'      : data[0].Password,
              'Email'         : data[0].Email,
              'DeviceID'      : this.device.uuid,
              'Status'        : false,
              'ImageURL'      : "",
              'WarningScore'  : 0,
              'BlockedBy'     : "",
              'FCMToken'      : "",
             }
            if(data[0]['Status'])
            {
              body.Status=data[0]['Status'];
            }else
            {
              body.Status=false;
            }

            if(data[0]['ImageURL'])
            {
              body.Status=data[0]['ImageURL'];
            }else
            {
              body.ImageURL="";
            }

            if(data[0]['WarningScore'])
            {
              body.WarningScore=data[0]['WarningScore'];
            }else
            {
              body.WarningScore=0;
            }

            if(data[0]['BlockedBy'])
            {
              body.Status=data[0]['BlockedBy'];
            }else
            {
              body.BlockedBy="";
            }if(data[0]['FCMToken'])
            {
              body.Status=data[0]['FCMToken'];
            }else
            {
              body.FCMToken="";
            }
            
             console.log(body);
            this.http.put(endpoint+userID+'/',body,{headers:headers}).subscribe((data)=>
            {
                this.emailComposer.isAvailable().then((available: boolean) =>{
                    if(available) {
                        let emailContent = {
                            to: email,
                            subject: 'Hisik Updated your Password',
                            body: 'the new password is :'+data[0]['Password'],
                            isHtml: true,
                            app:'Gmail'
                          };
                        this.emailComposer.open(emailContent);  
                    }
                    
                   }); 
                   console.log(data);
              this.store_user(data);
              const alert = this.alertCtrl.create({
                title: 'hint!',
                subTitle: 'password was updated and sent to this eamil:'+ email,
                buttons: ['OK']
              });
              alert.present();
            },(err)=>{console.log(err)})
           }else
           {
            const alert = this.alertCtrl.create({
                title: 'Warning!',
                subTitle: 'this email :'+email+' not exist plaese write the email you signUp with!',
                buttons: ['OK']
              });
              alert.present();    
           } 
        },(err)=>{});
    }

    login(email:string,password:string)
    { 
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint2+"Email="+email+"&Password="+password,{headers:headers})
    }

    /*store_user(user,loginvalue)
    {
         this.user=user;
         console.log(this.user);
         this.storage.set('login',loginvalue)
         this.Login=true
         this.storage.set('user',user)
        
         console.log(this.getUser());
      return true;
       
       
    }

    getUser()
    {
      this.storage.get('user').then((val:any) => {
           this.user = val;  
          console.log(val);
        });
        console.log(this.user);
      return this.user;
    }

    IsAuthinticated()
    {
      this.storage.get('login').then(val=>console.log(val));
      return this.storage.get('login');
    }
    

    logout()
    {
      this.storage.remove("user");
      this.storage.remove("login");
      return true;
    }*/
    store_user(user)
    {
         this.user=user;
         this.isauth=true;
         console.log(this.user);
         return true; 
    }

    getUser()
    {
      return this.user;
    }

    IsAuthinticated()
    {
      return this.isauth;
    }
    

    logout()
    {
      this.user=null;
      this.isauth=false;
      return true;
    }
}