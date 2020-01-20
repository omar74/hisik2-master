import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Ipadress } from './IPaddress';

const endpoint = 'http://mostafaaziema.pythonanywhere.com/api/message/';
@Injectable()
export class MassageService {
    constructor(private http:HttpClient){

    }

    SendMassage(massage){
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,massage,{headers:headers});
    }


}
