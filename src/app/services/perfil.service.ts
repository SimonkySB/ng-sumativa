import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Perfil } from '../models/perfil.model';
import { UserService } from './user.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private userService = inject(UserService)
  private authService = inject(AuthService)

  constructor() { }


  actualizarPerfil(perfil: Perfil){
    return this.userService.actualizarPerfil({
      ...perfil,
      usuarioId: this.authService.usuario!.id
    })
  }

  obtenerPerfil(){
    
    return this.authService.usuario$.pipe(
      switchMap(user => {
        return this.userService.obtenerPerfil(user?.id ?? 0)
      })
    )
    
  }

  cambiarPassword(password: string){
    return this.userService.cambiarPassword(this.authService.usuario!.id, password)
  }

}
