import { Location } from './locationObject';
import { LinksService } from './../../services/crowler.service';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-shoping-places',
  templateUrl: 'shoping-places.html',
})
export class ShopingPlacesPage {
  places:any=[];
  product:string;
  marker : Location;
  proceed:boolean;

  constructor(public navCtrl: NavController,private geolocation: Geolocation, public navParams: NavParams,public LinksService:LinksService) {
    this.product=this.navParams.get('product');
    this.geolocation.getCurrentPosition().then((location) => {
    
      this.LinksService.getShoppingPlaces(location.coords.latitude,location.coords.longitude,this.product).subscribe((data:any)=>
      {
        if(data)
        {
           this.places=data.results;
           console.log(this.places);
           this.proceed=true;
        }else
        {
           this.proceed=false;
        }
      }
      )
     }).catch((error) => {
       console.log('Error getting location', error);
     });
   
  }
  onSetMarker(event :any)
  {
  	console.log(event);
  	this.marker = new Location(event.coords.lat , event.coords.lng);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopingPlacesPage');
  }

}
