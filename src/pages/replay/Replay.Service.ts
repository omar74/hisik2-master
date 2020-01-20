
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

import { Ipadress } from '../../services/IPaddress';

import { Header } from 'ionic-angular';
@Injectable()
export class Reply{
    constructor(private http:HttpClient)
    {
      
    }

    
 add_reply(info){
  const endpoint='http://mostafaaziema.pythonanywhere.com/api/replay/'
  const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(endpoint,info,{headers:headers})
  }

 edit_reply(replayid ,info)
 {
   const endpoint ='http://mostafaaziema.pythonanywhere.com/api/replay/'
   const headers = new HttpHeaders({'Content-Type':'application/json'});
   return this.http.put(endpoint+replayid+'/',info,{headers:headers})
   
 }

 get_reply(reviewid)
 {
  const endpoint ='http://mostafaaziema.pythonanywhere.com/api/replay/?review__id='
  const headers = new HttpHeaders({'Content-Type':'application/json'});
  return this.http.get(endpoint+reviewid,{headers:headers})

 }

 delete_reply(replayid)
 {
   
  const endpoint ='http://mostafaaziema.pythonanywhere.com/api/replay/'
  const headers = new HttpHeaders({'Content-Type':'application/json'});
  return this.http.delete(endpoint+replayid+'/',{headers:headers})

 }

}