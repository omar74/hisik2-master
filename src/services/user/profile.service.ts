
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable} from 'rxjs';
import { Ipadress } from '../IPaddress';

const endpoint= 'http://mostafaaziema.pythonanywhere.com/api/user/';

@Injectable()
export class ProfileService{
    constructor(private http:HttpClient)
    {
      
    }



    show_recent_scan()
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers})
    }
        
}