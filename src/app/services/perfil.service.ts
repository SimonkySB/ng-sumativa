import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { AuthService } from './auth.service';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiService = inject(ApiService)
  private authService = inject(AuthService)

  constructor() { }


  actualizarPerfil(perfil: Perfil){
    return this.apiService.actualizarPerfil({
      ...perfil,
      usuarioId: this.authService.usuario!.id
    })
  }

  obtenerPerfil(){
    return this.apiService.obtenerPerfil(this.authService.usuario!.id)
  }

  cambiarPassword(password: string){
    return this.apiService.cambiarPassword(this.authService.usuario!.id, password)
  }

}
