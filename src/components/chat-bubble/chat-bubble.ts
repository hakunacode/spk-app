import { Component, Input} from '@angular/core';

@Component({
  selector: 'chat-bubble',
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {
  @Input() message: any;

  constructor() {
    setTimeout(() => {
     // console.log(this.message, 'Pesan')
    }, 300);
   }
}