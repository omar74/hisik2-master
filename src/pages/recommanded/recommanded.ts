import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecommandedResualtPage } from '../recommanded-resualt/recommanded-resualt';
import { SearchService } from '../../services/Search.Service';
import { AUTHService } from '../../services/user/AUTH.service';
import { ProductService } from '../../services/product.service';

@IonicPage()
@Component({
  selector: 'page-recommanded',
  templateUrl: 'recommanded.html',
})
export class RecommandedPage {
  tshirt = 'T-shirt'
  user;
  isauthinticated:boolean;
  recommandeditem: any[];
  product:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AUTHService,
    public SearchService:SearchService,public productService:ProductService) {
      /*this.user=this.auth.getUser();
       this.RecentSearch(this.user.id);*/
       //this.isauthinticated=this.auth.IsAuthinticated();
       this.isauthinticated=true;
       this.user=1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommandedPage');
  }

  RecReslt(product){
    this.navCtrl.push(RecommandedResualtPage,{'product':product});
  }

  ShowRecommanded(user){
    this.SearchService.ShowRecommandedSearch(user).subscribe(
      (data:any[])=>{
        console.log(data);
        this.recommandeditem = data;

      }
    );
  }

}
