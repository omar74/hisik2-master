import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ipadress } from './IPaddress';

@Injectable()
export class ScanService
{
    headers = new HttpHeaders({'Content-Type':'application/json'});
    constructor(public http:HttpClient)
    {
    }
    getRecentScan(userid:number)
    {
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/scan/?search='+userid;
      return this.http.get(endpoint,{headers : this.headers})
    }
    AddScan(Scan:any)
    {
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/scan/';
      return this.http.post(endpoint,Scan,{headers : this.headers})
    }
    UpdateScan(scanid:number,Scan:any)
    {
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/scan/'+scanid+'/';
      return this.http.put(endpoint,Scan,{headers : this.headers})
    }
    DeleteUserScan(scanID:number)
    {
       let endpoint='http://mostafaaziema.pythonanywhere.com/api/scan/'+scanID+'/';
      return this.http.delete(endpoint,{headers : this.headers})
    }
}