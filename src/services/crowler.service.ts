import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ipadress } from './IPaddress';
@Injectable()
export class LinksService 
{
  
  headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(public http:HttpClient)
  {

  }

  getShoppingLinks(product:string)
  {
    let endpoint = "http://mostafaaziema.pythonanywhere.com/api/product/links/"+product+"/" ; 
    return this.http.get(endpoint,{headers : this.headers});
  }
  getShoppingPlaces(latitude:number,Langitude:number,product:string)
  {
    let endpoint = "http://mostafaaziema.pythonanywhere.com/api/product/places/"+latitude+"/"+Langitude+"/"+product+"/"   
    return this.http.get(endpoint,{headers : this.headers})
  }

}