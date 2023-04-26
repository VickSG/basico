import { Component, OnInit, inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  chatService = inject(ChatService);
  usuariosActivos$!: Observable<any>;

  ngOnInit(): void {
    this.usuariosActivos$ = this.chatService.getUsuariosActivos();
    this.chatService.obtenerUsuariosActivos();
  }



}
