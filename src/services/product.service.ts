import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {ip} from './ip'
import { Ipadress } from './IPaddress';
@Injectable()
export class ProductService
{
    productRate:number;
    productVotes:number;
    procuctStars:number;
    headers = new HttpHeaders({'Content-Type':'application/json'});
    
    constructor(public http:HttpClient)
    {
     
    }
    getSimilarProducts(brand :string ,category:string)
    {
      let  endpoint='';
      if(brand != null)
      {
       endpoint='http://mostafaaziema.pythonanywhere.com/api/product/?brand__Name__icontains='+brand;

      }else
      {
        if(category != null)
        {
          endpoint='http://mostafaaziema.pythonanywhere.com/api/product/?Category__Name__icontains='+category;
        }
      }
      return this.http.get(endpoint,{headers : this.headers})
    }
    getProduct(productID:number)
    {
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/product/'+productID+'/';
      return this.http.get(endpoint,{headers : this.headers})
    }
    CalculateRate(ProID:number)
    {
       let endpoint='http://mostafaaziema.pythonanywhere.com/api/review/?product__id='+ProID;
       return this.http.get(endpoint,{headers : this.headers})
    }
}