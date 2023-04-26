import { Injectable, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socketStatus: boolean = false;
  usuario: Usuario | null | undefined;

  router = inject(Router);
  socket = inject(Socket);
  constructor() {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: Function) {
    // Para emit(event, payload, callback);
    // console.log('emitiendo mensaje :)');
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string) {
    console.log('Configurando Persona!')
    // this.socket.emit('configurar-usuario', { nombre }, (resp: any) => {
    // console.log(resp)
    // });
    return new Promise<void>((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (resp: any) => {
        console.log(resp)
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
      });
    });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };

    this.emit('configurar-usuario', payload, () => { });
    this.router.navigateByUrl('');
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario))
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '')
      this.loginWS(this.usuario!.nombre);
    }
  }

  getUsuario() {
    return this.usuario;
  }

}
