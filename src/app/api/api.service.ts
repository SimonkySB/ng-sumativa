import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { RegistrarseRequest } from '../models/registrarse-request.model';
import { Perfil } from '../models/perfil.model';
import { ROLES } from '../constants/role.const';
import { Product } from '../models/product.model';
import { Categoria } from '../models/categoria.model';
import { Subcategoria } from '../models/subcategoria.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private pId = 16;

  private _productos = new BehaviorSubject<Product[]>([
    {
      id: 1,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "perros",
      categoriaId: 1,
      subcategoriaId: 1,
      subcategoria: "alimentos",
      stock: 50
    },
    {
      id: 2,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: 59990,
      categoria: "perros",
      subcategoria: "alimentos",
      categoriaId: 1,
      subcategoriaId: 1,
      stock: 50
    },
    {
      id: 3,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "perros",
      subcategoria: "casas",
      categoriaId: 1,
      subcategoriaId: 2,
      stock: 50
    },
    {
      id: 4,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "perros",
      subcategoria: "casas",
      categoriaId: 1,
      subcategoriaId: 2,
      stock: 50
    },
    {
      id: 5,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: 59990,
      categoria: "perros",
      subcategoria: "collares",
      categoriaId: 1,
      subcategoriaId: 3,
      stock: 50
    },
    {
      id: 6,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "perros",
      subcategoria: "collares",
      categoriaId: 1,
      subcategoriaId: 3,
      stock: 50
    },
    {
      id: 7,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "gatos",
      subcategoria: "alimentos",
      categoriaId: 2,
      subcategoriaId: 4,
      stock: 50
    },
    {
      id: 8,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: 59990,
      categoria: "gatos",
      subcategoria: "alimentos",
      categoriaId: 2,
      subcategoriaId: 4,
      stock: 50
    },
    {
      id: 9,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "gatos",
      subcategoria: "arenas",
      categoriaId: 2,
      subcategoriaId: 5,
      stock: 50
    },
    {
      id: 10,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: 59990,
      categoria: "gatos",
      subcategoria: "arenas",
      categoriaId: 2,
      subcategoriaId: 5,
      stock: 50
    },
    {
      id: 11,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "gatos",
      subcategoria: "antiparasitarios",
      categoriaId: 2,
      subcategoriaId: 6,
      stock: 50
    },
    {
      id: 12,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "gatos",
      subcategoria: "antiparasitarios",
      categoriaId: 2,
      subcategoriaId: 6,
      stock: 50
    },
    {
      id: 13,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "exoticos",
      subcategoria: "aves",
      categoriaId: 3,
      subcategoriaId: 7,
      stock: 50
    },
    {
      id: 14,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "exoticos",
      subcategoria: "aves",
      categoriaId: 3,
      subcategoriaId: 7,
      stock: 50
    },
    {
      id: 15,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: 59990,
      categoria: "exoticos",
      subcategoria: "peces",
      categoriaId: 3,
      subcategoriaId: 8,
      stock: 50
    },
    {
      id: 16,
      nombre: "Bil-Jac Puppy Dog Food 6.8kg",
      descripcion: "",
      imagen: "assets/images/Bil-JacPuppyDogFood6.8kg.png.webp",
      precio: 69990,
      precioDescuento: null,
      categoria: "exoticos",
      subcategoria: "peces",
      categoriaId: 3,
      subcategoriaId: 8,
      stock: 50
    }
  ])


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


  private _categorias = new BehaviorSubject<Categoria[]>([
    {
      id: 1,
      nombre: "perros"
    },
    {
      id: 2,
      nombre: "gatos"
    },
    {
      id: 3,
      nombre: "exoticos"
    }
  ])

  private _subcategorias = new BehaviorSubject<Subcategoria[]>([
    {
      id: 1,
      nombre: "alimentos",
      categoriaId: 1
    },
    {
      id: 2,
      nombre: "casas",
      categoriaId: 1
    },
    {
      id: 3,
      nombre: "collares",
      categoriaId: 1
    },
    {
      id: 4,
      nombre: "alimentos",
      categoriaId: 2
    },
    {
      id: 5,
      nombre: "arenas",
      categoriaId: 2
    },
    {
      id: 6,
      nombre: "antiparasitarios",
      categoriaId: 2
    },
    {
      id: 7,
      nombre: "peces",
      categoriaId: 3
    },
    {
      id: 8,
      nombre: "aves",
      categoriaId: 3
    }
  ])

  productos$ = this._productos.asObservable().pipe(
    shareReplay(1)
  )
  categorias$ = this._categorias.asObservable().pipe(
    shareReplay(1)
  )
  subcategorias$ = this._subcategorias.asObservable().pipe(
    shareReplay(1)
  )

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

  eliminarProducto(id: number){
    this._productos.next(this._productos.value.filter(p => p.id !== id))
  }


  guardarProducto(producto: Product){
    this.pId = this.pId + 1
    this._productos.next([{...producto, id: this.pId}, ...this._productos.value])
  }

  editarProducto(producto: Product){
    this._productos.next(this._productos.value.map(p => 
      p.id === producto.id ? producto : p
    ))
  }


}
