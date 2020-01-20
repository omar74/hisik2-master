
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable} from 'rxjs';
import { Ipadress } from '../IPaddress';

const endpoint= 'http://mostafaaziema.pythonanywhere.com/api/scan/?search=';
@Injectable()
export class scannedproductServices{
    constructor(private http:HttpClient)
    {  
    } 
    showscannedproduct(userid :number)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint+userid,{headers:headers})
    }
        
}