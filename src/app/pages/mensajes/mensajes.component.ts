import { Component, inject } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent {

  wsService = inject(WebsocketService);
  constructor() { }

  salir() {
    this.wsService.logoutWS();
  }
}
