
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import { Header } from 'ionic-angular';
import { Ipadress } from '../../services/IPaddress';

@Injectable()
export class Edit_MyReview{
    constructor(private http:HttpClient)
    {}
  update_myreview(review_id,info){
    const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/'
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put(endpoint+review_id+'/',info,{headers:headers})
  }

}