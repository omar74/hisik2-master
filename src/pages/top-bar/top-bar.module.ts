import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopBarPage } from './top-bar';

@NgModule({
  declarations: [
    TopBarPage,
  ],
  imports: [
    IonicPageModule.forChild(TopBarPage),
  ],
})
export class TopBarPageModule {}
