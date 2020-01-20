import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ReplayPage } from '../replay/replay';
import { Reply } from '../replay/Replay.Service';

@IonicPage()
@Component({
  selector: 'page-edit-replay',
  templateUrl: 'edit-replay.html',
})
export class EditReplayPage {
  replay;
  constructor(public navCtrl: NavController,private Reply:Reply, public viewCtrl: ViewController ,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditReplayPage');
    this.replay=this.navParams.get('replay');
  }
  EditRepaly(form:NgForm)
  {
    const info=
    {
      "review": this.replay.review,
      "user": this.replay.user,
      "text": form.value.text,
    }
    this.Reply.edit_reply(this.replay.id,info).subscribe((data)=>
    {
       this.replay=data;
       this.viewCtrl.dismiss(this.replay);
    },(err)=>{
      console.log(err);
    });
  }
  cancel()
  {
    this.viewCtrl.dismiss();
  }
}
