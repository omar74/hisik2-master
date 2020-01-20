import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Ipadress } from '../../services/IPaddress';

@Injectable()
export class MyReviews{
    constructor(private http:HttpClient)
    {
      
    }

    headers = new HttpHeaders({'Content-Type':'application/json'});

    GetLikes(reviewid:number)
    {
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/like/?review__id='+reviewid;
      return this.http.get(endpoint,{headers : this.headers})
    }

    Like(userID:number,reviewid:number)
    {
      const like_data={'review':reviewid,'user':userID} ; 
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/like/';
      return this.http.post(endpoint,like_data,{headers : this.headers})
    }
    DeleteLike(likeID:number)
    {
       let endpoint='http://mostafaaziema.pythonanywhere.com/api/like/'+likeID+'/';
      return this.http.delete(endpoint,{headers : this.headers})
    }
    
 get_product_reviews(productid:number)
  {
      const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/?product__id='
    return this.http.get(endpoint+productid,{headers:this.headers})
  }

  get_reply(reviewid)
  {
   const endpoint ="http://mostafaaziema.pythonanywhere.com/api/replay/?review__id="
   return this.http.get(endpoint+reviewid,{headers:this.headers})
  }
  update_myreviews(review_id,info)
  {
    const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/'
    return this.http.put(endpoint+review_id+'/',info,{headers:this.headers})

  }

 delete_myreviews(review_id)
 {
    const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/'
    return this.http.delete(endpoint+review_id+'/',{headers:this.headers})
 }

 

}