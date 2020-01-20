import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SearchService } from '../../services/Search.Service'
import { AUTHService } from '../../services/user/AUTH.service';

@IonicPage()
@Component({
  selector: 'page-recent-search',
  templateUrl: 'recent-search.html',
})
export class RecentSearchPage {
  recentsearch:any;  
  loading: any;
  ListItemSearch:any[];
  search: any;
  popualerSearchList:any;
  popualeritem:any[];
  recommandeditem:any[];
  user;
  isauthinticated:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public SearchService:SearchService, public loadingCtrl: LoadingController, public alertController:AlertController,
    public auth:AUTHService) {
      if(this.auth.IsAuthinticated())
      {
        this.isauthinticated=true;
        this.user=this.auth.getUser();
        this.RecentSearch(this.user.id);
      }else
      {
        this.isauthinticated=false;
      }  
      
       /*this.isauthinticated=true;
       this.user=1;*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentSearchPage');
  }

  RecentSearch(userid){
    this.SearchService.RecentSearch(userid).subscribe(
      (data) =>{
          console.log(data);
          this.recentsearch = data;
      }
    );
  }

  RemoveSearch(index){
    this.SearchService.DeleteSearch(index).subscribe(
      (data)=>{
          console.log(data);
          this.loadingItemSearch();
          const alert = this.alertController.create({
            message: "Search Deleted Successfully",
            buttons: ['OK']
          });
          alert.present();
  
        }
        
      ,(error) => {
          console.log(error);
          const alert = this.alertController.create({
            title: 'Delete failed',
            message: error.message,
            buttons: ['OK']
          });
          alert.present();
      }
      );
  }
  
  private loadingItemSearch(){
    this.SearchService.RecentSearch(this.user.id).subscribe(
      (data:any)=>{
        if(data.length>0){
          this.recentsearch = data;
        }
        else
        {
          this.recentsearch = [];
        }
      }
    );
  }

}
