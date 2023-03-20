import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  mensajes: any = [];
  texto: string = '';
  chatSubs!: Subscription;
  elemento!: HTMLElement;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('chat-mensajes') as HTMLElement;
    this.chatSubs = this.chatService.getMessages().subscribe(msg => {
      console.log(msg);
      this.mensajes.push(msg);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    })
  }

  enviar() {
    if (!!this.texto.length) {
      this.chatService.sendMessage(this.texto);
      this.texto = '';
    }
  }

  ngOnDestroy() {
    this.chatSubs.unsubscribe();
  }
}
