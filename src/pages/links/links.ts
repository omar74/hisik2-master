import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-links',
  templateUrl: 'links.html',
})
export class LinksPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  SwipedTabsIndicator :any= null;
  tabTitleWidthArray :any= [];
  tabElementWidth_px :number= 50;
  screenWidth_px :number= 0;
  isRight :boolean= true;
  isLeft:boolean= true;
  tabs:any=[];
  lastTime:number;
  title:string="";
  product:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,platform: Platform) 
  {
    this.tabs=["link","locate"];
    console.log('Width: ' + platform.width());
    this.screenWidth_px=platform.width();
    this.lastTime=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinksPage');
    this.SwipedTabsIndicator = document.getElementById("indicator");
    for (let i in this.tabs)
      this.tabTitleWidthArray.push(document.getElementById("tabTitle"+i).offsetWidth);
    this.selectTab(this.lastTime);
    console.log(this.lastTime);
    /*if(this.UnreadNotificationNumber>=100)
    {
      this.UnreadNotificationNumber=99;
    }*/
  }
  selectTab(index)
  {
    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index]+"px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.calculateDistanceToSpnd(index))+'px,0,0)';
    this.SwipedTabsSlider.slideTo(index);
    this.lastTime=index;
    console.log(this.lastTime);
    if(index==0)
    {
      this.title="Shopping Links";
    }else
    {
      this.title="Shopping places";
    }
  }

  calculateDistanceToSpnd(index)
  {
    var result=0;
    for (var _i = 0; _i < index; _i++) {
      result=result+this.tabTitleWidthArray[_i];
    }
    return result;
  }

  updateIndicatorPosition() {
    var index=this.SwipedTabsSlider.getActiveIndex();
    
    if( this.SwipedTabsSlider.length()==index)
      index=index-1;
    this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[index]+"px";
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.calculateDistanceToSpnd(index))+'px,0,0)';
    this.lastTime=index;
    console.log(this.lastTime);
    if(index==0)
    {
      this.title="Shopping Links";
    }else
    {
      this.title="Shopping places";
    }
  }

  updateIndicatorPositionOnTouchEnd()
  {
    setTimeout( () => { this.updateIndicatorPosition(); }, 200);
  }

  animateIndicator($event)
  {

    this.isLeft=false;
    this.isRight=false;
    var currentSliderCenterProgress =(1/(this.SwipedTabsSlider.length()-1) )*this.SwipedTabsSlider.getActiveIndex();
    if($event.progress < currentSliderCenterProgress)
    {
      this.isLeft=true;
      this.isRight=false;

    } if($event.progress > currentSliderCenterProgress)
    {
      this.isLeft=false;
      this.isRight=true;
    }

    if(this.SwipedTabsSlider.isEnd())
      this.isRight=false;

    if( this.SwipedTabsSlider.isBeginning())
      this.isLeft=false;

    if(this.isRight)
      this.SwipedTabsIndicator.style.webkitTransform =
      'translate3d('+( this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
        +($event.progress - currentSliderCenterProgress) *(this.SwipedTabsSlider.length()-1)*this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()+1])
      +'px,0,0)';

    if(this.isLeft)
      this.SwipedTabsIndicator.style.webkitTransform =
      'translate3d('+( this.calculateDistanceToSpnd(this.SwipedTabsSlider.getActiveIndex())
        +($event.progress - currentSliderCenterProgress) *(this.SwipedTabsSlider.length()-1)*this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()-1])
      +'px,0,0)';

    if(!this.isRight && !this.isLeft)
      this.SwipedTabsIndicator.style.width = this.tabTitleWidthArray[this.SwipedTabsSlider.getActiveIndex()]+"px";

  }

}
