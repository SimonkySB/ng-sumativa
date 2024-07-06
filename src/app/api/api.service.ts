import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { RegistrarseRequest } from '../models/registrarse-request.model';
import { Perfil } from '../models/perfil.model';
import { ROLES } from '../constants/role.const';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private _usuarios = new BehaviorSubject<Usuario[]>([
    {
      id: 1,
      email: "cliente@cliente",
      password: "123",
      roles: [ROLES.CLIENTE],
      telefono: "98765544",
      direccion: "",
      activo: true
    },
    {
      id: 2,
      email: "admin@admin",
      password: "123",
      roles: [ROLES.CLIENTE, ROLES.ADMIN],
      telefono: "12312412",
      direccion: "",
      activo: true
    }
  ])



  usuarios$ = this._usuarios.asObservable().pipe(
    shareReplay(1)
  )

  constructor() { }



  activarUsuario(userId: number){
    const users = this._usuarios.value.map(u => 
      u.id === userId ? {...u, activo: true} : u
    )
    this._usuarios.next(users)
    return of([])
  }

  desactivarUsuario(userId: number){
    const users = this._usuarios.value.map(u => 
      u.id === userId ? {...u, activo: false} : u
    )
    this._usuarios.next(users)
    return of([])
  }


  crearUsuario(registroData: RegistrarseRequest) {

    return of([]).pipe(
      map(() => {
        if (this._usuarios.value.find(u => u.email === registroData.email)) {
          throw new Error("El email ya se encuentra en uso");
        }

        const user = {
          id: this._usuarios.value.length + 1,
          direccion: registroData.direccionDespacho,
          email: registroData.email,
          password: registroData.password,
          roles: ['CLIENTE'],
          telefono: registroData.telefono
        } as Usuario

        this._usuarios.next([...this._usuarios.value, user])
        return user
      })
    )
  }

  obtenerUsuarioPorEmail(email: string) {
    return this._usuarios.pipe(
      map(p => p.find(u => u.email === email))
    )
  }

  obtenerPerfil(usuarioId: number): Observable<Perfil> {
    return this._usuarios.pipe(
      map(us => {
        const u = us.find(u => u.id === usuarioId)
        if (!u) {
          throw new Error("Perfil no encontrado")
        }
        return {
          usuarioId: u.id,
          telefono: u.telefono,
          direccionDespacho: u.direccion
        }
      }),
    )
  }


  cambiarPassword(usuarioId: number, password: string){
    const users = this._usuarios.value.map(u =>  u.id === usuarioId  ? { ...u, password: password } : u )
    this._usuarios.next(users)
    return of([])
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

    this._usuarios.next(users)
    return of(perfil)
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
