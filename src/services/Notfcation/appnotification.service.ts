import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Ipadress} from '../IPaddress'
@Injectable()
export class AppNotficationService{
    headers = new HttpHeaders({'Content-Type':'application/json'});
    ipadress = Ipadress;
    constructor(public http:HttpClient)
    {
    }
    getUserNotification(userid:number)
    {
        let endpoint='http://mostafaaziema.pythonanywhere.com/api/userNoitifaction/?owner__id='+userid;
        return this.http.get(endpoint,{headers : this.headers})
    } 
    getUserUnSeenNotification(userid:number)
    {
        let endpoint='http://mostafaaziema.pythonanywhere.com/api/userNoitifaction/?owner__id='+userid+'&Status='+false;
        return this.http.get(endpoint,{headers : this.headers})
    }
    AddUserNotification(type,ownerid,senderid,reviewid)
    {
        let notification=
        { 
            Status:false,
            Type:type,
            notifyuser:senderid,
            owner:ownerid,
            Product:null,
            review:reviewid  
        }
        let endpoint='http://mostafaaziema.pythonanywhere.com/api/userNoitifaction/';
        return this.http.post(endpoint,notification,{headers : this.headers})
    }  
    updateUserNotification(id,notification:any)
    {
        let endpoint='http://mostafaaziema.pythonanywhere.com/api/userNoitifaction/'+id+'/';
        return this.http.put(endpoint,notification,{headers : this.headers})
    }
    adminNotification(type,ScanId,reviewid)
    {
        let notification=
        { 
            Status:false,
            Type:type,
            ProductReviewID:reviewid,
            ScanId:ScanId  
        }
        let endpoint='http://mostafaaziema.pythonanywhere.com/api/adminNoitifaction/';
        return this.http.post(endpoint,notification,{headers : this.headers})
    }  
}