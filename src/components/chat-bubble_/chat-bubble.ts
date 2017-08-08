import { Component } from '@angular/core';
import { LoopBackConfig } from '../../shared/sdk/lb.config';

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {
  public msg: any;
  public loopbackPath: string;

  constructor() {
    // Set global loopback path
    this.loopbackPath = LoopBackConfig.getPath()+'/api/containers/';
  }
}
