import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline/timeline';
import { TimelineItemComponent } from './timelineitem/timelineitem';
import { TimelineTimeComponent } from './timelinetime/timelinetime';
@NgModule({
	declarations: [TimelineComponent,
        TimelineItemComponent,
        TimelineTimeComponent],
    imports:
     [
        IonicModule 
     ],
	exports: [TimelineComponent,
        TimelineItemComponent,
        TimelineTimeComponent]
})
export class ComponentsModule {}
