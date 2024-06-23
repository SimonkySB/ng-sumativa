import { Injectable, inject } from "@angular/core";
import { Usuario } from "../models/usuario.model";
import { BehaviorSubject, map, of, shareReplay, tap } from "rxjs";
import { RegistrarseRequest } from "../models/registrarse-request.model";
import { ApiService } from "../api/api.service";


@Injectable({providedIn: 'root'})
export class AuthService {
    private apiService = inject(ApiService)

    private _usuario = new BehaviorSubject<Usuario | null>(null)

    usuario$ = this._usuario.asObservable().pipe(
        shareReplay(1)
    );

    get usuario() {
        return this._usuario.value
    }

    login(email: string, password: string){
        return this.apiService.login(email, password).pipe(
            tap((usuario) => {
                this.setUsuario(usuario)
                this.cargarUsuario();
            })
        )
    }
    
    cargarUsuario(){
        const usuario = localStorage.getItem("usuario")
        if(!usuario) {
            this._usuario.next(null)
        }

        try {
            const user = JSON.parse(usuario!) as Usuario
            this._usuario.next(user)
        } catch {
            this._usuario.next(null)
        }
    }

    setUsuario(usuario: Usuario){
        localStorage.setItem("usuario", JSON.stringify(usuario))
    }

    registrarse(registroData: RegistrarseRequest){
        return this.apiService.crearUsuario(registroData)
    }

    logout(){
        localStorage.removeItem("usuario")
        this.cargarUsuario();
    }

    recuperarPassword(email: string){
        return of([])
    }

    tienePermisos(roles: string[]){
        return this.usuario$.pipe(
            map(u => {
              if(u !== null){
                const encontrados = roles.every(r => u.roles.find(rr => rr === r))
                return encontrados;
              }
        
              return false
            })
        )
    }
}