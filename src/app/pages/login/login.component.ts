import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  nombre: string = '';

  constructor(public wsService: WebsocketService, public router: Router) { }

  ingresar() {
    this.wsService.loginWS(this.nombre).then(() => {
      this.router.navigate(['/mensajes']);
    })
  }


}
