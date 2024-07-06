import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { Subcategoria } from '../models/subcategoria.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlCat = "categorias.json"
  private urlSub = "subcategorias.json"
  private storage = inject(FirebaseService)

  private _categorias = new BehaviorSubject<Categoria[]>([])

  private _subcategorias = new BehaviorSubject<Subcategoria[]>([])

  
  categorias$ = this._categorias.asObservable().pipe(
    shareReplay(1)
  )
  subcategorias$ = this._subcategorias.asObservable().pipe(
    shareReplay(1)
  )


  constructor() { }

  loadCategorias(){
    return this.storage.get<Categoria[]>(this.urlCat).pipe(
      tap((data) => this._categorias.next(data))
    )
  }

  loadSubcategorias(){
    return this.storage.get<Subcategoria[]>(this.urlSub).pipe(
      tap((data) => this._subcategorias.next(data))
    )
  }

}
