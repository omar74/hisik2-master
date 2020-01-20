import { Chart } from 'chart.js';
import { ProductService } from './../../services/product.service';
import { MessagePage } from './../message/message';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact-support',
  templateUrl: 'contact-support.html',
})

export class ContactSupportPage {
  rate5:number=0 ;
  rate4:number=0 ;
  rate3:number=0 ;
  rate2:number=0 ;
  rate1:number=0 ; 
 
  @ViewChild('chartCanvas') chartCanvas;
  chartVar: any;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactSupportPage');
    
  }

  openMessage()
  {
    this.navCtrl.push(MessagePage);
  }
  /*ngAfterViewInit() {
    this.CalculateRate();
  }
  showChart() {
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'Ratings',
          data: [this.rate5, this.rate4, this.rate3 , this.rate2 , this.rate1 ],
          backgroundColor: [
            'rgb(217, 15, 36)',
            'rgb(234, 174, 28)',
            'rgb(220, 121, 25)',
            'rgb(219, 73, 30)',
            'rgb(219, 24, 22)',

          ],hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ],
        weight:5
        }],
        labels: [
          'five star',
          'four star',
          'three star',
          'two star',
          'one star',
        ]
 
      },
      options: {
        legend: {
          display: true,
          position:'bottom'
        },
        tooltips: {
          enabled: true,
          mode: 'point'
        },
        title:{
          display:true,
          text:"Ratings",
        }
      }
 
    })
  }
  CalculateRate()
  {
    this.productService.CalculateRate(1).subscribe(
        (data)=>
        {
          if(data)
          {
              console.log(data);
              data.forEach(review => {
                  if(review.rate == 5)
                  {
                     this.rate5= this.rate5+1;
                  }else if(review.rate == 4)
                  {
                     this.rate4=this.rate4+1;
                  }else if(review.rate == 3)
                  {
                     this.rate3=this.rate3+1;
                  }else if(review.rate == 2)
                  {
                     this.rate2=this.rate2+1;
                  }else if(review.rate == 1)
                  {
                     this.rate1=this.rate1+1;
                  }
              });
              console.log(this.rate1+" "+this.rate2+" "+this.rate3+" "+this.rate4+" "+this.rate5)
              this.showChart();
          }
    });
 }*/

}
