import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private api = inject(ApiService)

  categorias$ = this.api.categorias$
  subcategorias$ = this.api.subcategorias$

  constructor() { }

}
