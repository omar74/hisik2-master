import { Component, Input } from '@angular/core';

@Component({
  selector:'timeline-time',
  template: '<span>{{time.subtitle}}</span> <span>{{time.title}}</span>'
})
export class TimelineTimeComponent{
  @Input('time') time = {};
  constructor(){

  }
}
