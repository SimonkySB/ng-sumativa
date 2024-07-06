import { Injectable, inject } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { FirebaseService } from './firebase.service';
import { BehaviorSubject, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { RegistrarseRequest } from '../models/registrarse-request.model';
import { Perfil } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private id = 1;
  private url = "users.json"
  private storage = inject(FirebaseService)

  private _usuarios = new BehaviorSubject<Usuario[]>([])
  private usuarios$ = this._usuarios.asObservable().pipe(
    shareReplay(1)
  )


  constructor() { }


  load(){
    return this.storage.get<Usuario[]>(this.url).pipe(
      tap((data) => {
          this._usuarios.next(data)
          const v = [...data].sort((a, b) => b.id - a.id)
          if(v.length > 0) {
              this.id = v[0].id + 1
          }
      })
  )
  }

  listarUsuarios(){
    return this.usuarios$
  }


  desactivarUsuario(userId: number){
    const users = this._usuarios.value.map(u => 
      u.id === userId ? {...u, activo: false} : u
    )
    return this.storage.post<Usuario[]>(this.url, users).pipe(
      switchMap(() => this.load())
    )
  }

  activarUsuario(userId: number){
    const users = this._usuarios.value.map(u => 
      u.id === userId ? {...u, activo: true} : u
    )
    return this.storage.post<Usuario[]>(this.url, users).pipe(
      switchMap(() => this.load())
    )
  }


  crearUsuarioPublico(registroData: RegistrarseRequest){
    return of([]).pipe(
      map(() => {
        if (this._usuarios.value.find(u => u.email === registroData.email)) {
          throw new Error("El email ya se encuentra en uso");
        }

        const user = {
          id: this.id,
          direccion: registroData.direccionDespacho,
          email: registroData.email,
          password: registroData.password,
          roles: ['CLIENTE'],
          telefono: registroData.telefono
        } as Usuario
        return user
      }),
      switchMap((user) => {
        const users = [...this._usuarios.value, user]
        return this.storage.post<Usuario[]>(this.url, users).pipe(
          switchMap(() => this.load()),
          map(() => [])
        ) 
      })
    )
  }


  obtenerPerfil(usuarioId: number): Observable<Perfil> {
    return this.usuarios$.pipe(
      map(us => {
        const u = us.find(u => u.id === usuarioId)
        return {
          usuarioId: u?.id ?? 0,
          telefono: u?.telefono ?? "",
          direccionDespacho: u?.direccion ?? ""
        }
      }),
    )
  }

  cambiarPassword(usuarioId: number, password: string){
    const users = this._usuarios.value.map(u =>  u.id === usuarioId  ? { ...u, password: password } : u )
    
    return this.storage.post<Usuario[]>(this.url, users).pipe(
      switchMap(() => this.load()),
      switchMap(() => this.obtenerPerfil(usuarioId)),
    ) 
  }

  actualizarPerfil(perfil: Perfil) {
    const users = this._usuarios.value.map(u => {
      if (u.id === perfil.usuarioId) {
        return {
          ...u,
          direccion: perfil.direccionDespacho,
          telefono: perfil.telefono
        } as Usuario
      }
      return u
    })

    return this.storage.post<Usuario[]>(this.url, users).pipe(
      switchMap(() => this.load()),
      switchMap(() => this.obtenerPerfil(perfil.usuarioId)),
    ) 
  }


  login(email: string, password: string): Observable<Usuario> {
    return of([]).pipe(
      map(() => {
        const usuario = this._usuarios.value.find(userDb => userDb.email === email && userDb.password === password)
        if (!usuario) {
          throw new Error("Usuario y/o contraseña inválidos")
        }
        if (!usuario.activo) {
          throw new Error("Usuario inactivo")
        }
        return { ...usuario, password: "*****" }
      })
    )

  }
  
}
