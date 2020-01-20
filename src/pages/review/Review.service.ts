
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import { Header } from 'ionic-angular';
import { Ipadress } from '../../services/IPaddress';

@Injectable()
export class ReviewService{
    constructor(private http:HttpClient)
    {
      
    }
    addreview(info)
    {const endpoint= 'http://mostafaaziema.pythonanywhere.com/api/review/';

        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,info,{headers:headers})
    }


    //el mafrod yb3t a5r 3 reviews msh kolhom
    get_product_review(productid)
    {    const endpoint2='http://mostafaaziema.pythonanywhere.com/api/review/?product__id=';

        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint2+productid,{headers:headers})
        
    }

    delete_review(review_id)
    {
        const endpoint3='http://mostafaaziema.pythonanywhere.com/api/review/';
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.delete(endpoint3+review_id+"/",{headers:headers})
        
    }

    update_product_review(review_id,info)
    {
        const endpoint3='http://mostafaaziema.pythonanywhere.com/api/review/';
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.put(endpoint3+review_id+"/",info,{headers:headers})
        
    }
        

    
}