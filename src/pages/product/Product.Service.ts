
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import { Header } from 'ionic-angular';
@Injectable()
export class ProductReviews{
    constructor(private http:HttpClient)
    {
      
    }

    
 get_product_reviews(productid){
      const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/?product__id='
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get(endpoint+productid,{headers:headers})
  }

 Add_like(reviewid){

  const endpoint='http://mostafaaziema.pythonanywhere.com/api/like'
  const headers= new HttpHeaders({'Content-Type':'application/json'});
  return this.http.post(endpoint+reviewid,{headers:headers})
 
 }


  


 

}