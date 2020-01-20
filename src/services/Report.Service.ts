import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Ipadress } from './IPaddress';

const endpoint = 'http://mostafaaziema.pythonanywhere.com/api/report/';
@Injectable()
export class ReportService {
    constructor(private http:HttpClient){

    }
    SendReport(report){
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,report,{headers:headers});
    }

}

