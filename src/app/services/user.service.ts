import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = inject(ApiService)

  constructor() { }

  listarUsuarios(){
    return this.api.usuarios$
  }


  desactivarUsuario(userId: number){
    return this.api.desactivarUsuario(userId)
  }

  activarUsuario(userId: number){
    return this.api.activarUsuario(userId)
  }

  editarUsuario(usuario: Usuario){

  }

  crearUsuario(usuario: Usuario){

  }
}
