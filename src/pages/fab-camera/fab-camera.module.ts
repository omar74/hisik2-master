import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FabCameraPage } from './fab-camera';

@NgModule({
  declarations: [
    FabCameraPage,
  ],
  imports: [
    IonicPageModule.forChild(FabCameraPage),
  ],
})
export class FabCameraPageModule {}
