import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'basico';

  constructor(
    public wsSocket: WebsocketService,
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.chatService.getMessagesPrivate().subscribe(msg => {
      console.log('Mensaje privado', msg)
    })
  }

}
