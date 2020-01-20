import { AppNotficationService } from './../../services/Notfcation/appnotification.service';
import { AUTHService } from './../../services/user/AUTH.service';
import { EditReplayPage } from './../edit-replay/edit-replay';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import {Reply} from'../replay/Replay.Service';
import { NgForm } from '@angular/forms';
import { ProductPage } from '../product/product';
import { NotficationService } from '../../services/Notfcation/notfication.service';



@IonicPage()
@Component({
  selector: 'page-replay',
  templateUrl: 'replay.html',
})
export class ReplayPage {
  Replays:any[]=[];
  user;
  review;
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private Reply:Reply,
     public modalCtrl: ModalController
     ,public auth:AUTHService,
     private PushNot:NotficationService ,
     private notSer:AppNotficationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReplayPage');
    this.review=this.navParams.get('reviewid');
    console.log(this.review);
    this.user=this.auth.getUser();
    this.Replays=[];
    this.Get_Reply();
  }

  Get_Reply(){

    this.Reply.get_reply(this.review).subscribe((data:any[])=>{
      console.log(data,"replaies");
      data.forEach(replay=>{
       this.Replays.push(replay);
      })
    },(err)=>{
      console.log(err);
    });
  }
  ADD_REPLY(form:NgForm)
  {
    const body={
      'review':this.review,
      'user':this.user.id,
      'text':form.value.text,
    }
    this.Reply.add_reply(body).subscribe((data)=>{
      this.Replays.push(data);
      this.notSer.AddUserNotification(3,this.review.userData.id,this.user.id,this.review.id).subscribe(messg=>{
        this.PushNot.pushNoticationForUser('Like',this.user.name + 'replied on your review',this.review.userData.FCMToken).subscribe((message)=>{
          console.log(message);
          this.notSer.adminNotification(3,null,this.review.id).subscribe(data=>
            {
              this.PushNot.pushNotfiation('replay','',this.user.UserName+'has replied on '+ this.review.text).subscribe();
            });
        });
      })
    },(err)=>{
      console.log(err,"555555555555555555");
    });
  }
  delete(index,replayid)
  {
    console.log(replayid);
    console.log(index);
    this.Reply.delete_reply(replayid).subscribe((data)=>{
       this.Replays.splice(index,1);
    },(err)=>{
      console.log(err);
    });
  }
  update(index,replay)
  {
    let replayModal = this.modalCtrl.create(EditReplayPage, {'replay':replay});
    replayModal.onDidDismiss(data => {
     if(data)
     {
       this.Replays[index]=data;
     } 
    });
    replayModal.present();
  } 
/*
this.Reply.edit_reply(1,body).subscribe((data)=>{

      console.log(data);

    },(err)=>{

      console.log(err);


    });

   

    this.Reply.delete_reply(1).subscribe((data)=>{

      console.log(data);

    },(err)=>{

      console.log(err);


    });

*/






}
