
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const pushEndPoint = 'https://fcm.googleapis.com/fcm/send';
const NotEndPoint = '192.168.0.12:8000/api/Noitifaction/';
const PushHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAfpOaUnk:APA91bF4BHLlm5qFRfYcnyr-v4ZyJznr7moEs_sacdBnMHp0PNXSymtBhNpGMkj7kPv2ird68OsxKW1rss4xNEuIaQVVfL3uU5FrlA0kFTAbHbctLBHD8qxgGCmEboLr66J10mZfsk_I'
  })
};
const NotHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  })
};

@Injectable()
export class NotficationService{
     token:string='';
    constructor( private http:HttpClient)
    {

    }
    setToken(token)
    {
      this.token=token;
      console.log(this.token,token);
    }
    getToken()
    {
      console.log(this.token);
      return this.token;
    }
    PushGeneralNotfiation(title:string,Body:string)
    {
        let body = {
            "notification":{
              "title":title,
              "body":Body,
              "sound":"default",
              "click_action":"FCM_PLUGIN_ACTIVITY",
              "icon":"fcm_push_icon"
            },
              "to":"/topics/all",
              "priority":"high",
              "restricted_package_name":""
          }
          let options = new HttpHeaders().set('Content-Type','application/json');
          this.http.post("https://fcm.googleapis.com/fcm/send",body,{
            headers: options.set('Authorization', 'key=AAAAfpOaUnk:APA91bF4BHLlm5qFRfYcnyr-v4ZyJznr7moEs_sacdBnMHp0PNXSymtBhNpGMkj7kPv2ird68OsxKW1rss4xNEuIaQVVfL3uU5FrlA0kFTAbHbctLBHD8qxgGCmEboLr66J10mZfsk_I'),
          });
    }
    pushNoticationForUser(title:string,Body:string,token)
    {
        let body = {
            "notification":{
              "title":title,
              "body":Body,
              "sound":"default",
              "click_action":"FCM_PLUGIN_ACTIVITY",
              "icon":"fcm_push_icon"
            },
              "to":token,
              "priority":"high",
              "restricted_package_name":""
          }
          let options = new HttpHeaders().set('Content-Type','application/json');
           return this.http.post("https://fcm.googleapis.com/fcm/send",body,{
            headers: options.set('Authorization', 'key=AAAAfpOaUnk:APA91bF4BHLlm5qFRfYcnyr-v4ZyJznr7moEs_sacdBnMHp0PNXSymtBhNpGMkj7kPv2ird68OsxKW1rss4xNEuIaQVVfL3uU5FrlA0kFTAbHbctLBHD8qxgGCmEboLr66J10mZfsk_I'),
          });
    }
    getNotfications(){
        return this.http.get(NotEndPoint,NotHeaders);
      }
    
      addNotfication(body)
      {
        return this.http.post(NotEndPoint,body,NotHeaders);
      }

      pushNotfiation(title,body,b)
      {
        let Body = {
          "notification": {
            "title": title, 
            "body": b,
           },
           
           "to" : "cK1gZi-Hkgo:APA91bHOiUevUN5DgI7tQVVClDE5XokVTlwdsGO4SclT4sj6j5Q5NrQ0g-XsxjIEF6D-2J_l2T7zPowrq7xF-xlLPaBSQLfbFk8TY4jqobLtUGEpiA2HX8o0ptOtZq3GifOXktWTC02b"
           
          }
          
        return this.http.post(pushEndPoint,body,PushHeaders);
      }

    
}