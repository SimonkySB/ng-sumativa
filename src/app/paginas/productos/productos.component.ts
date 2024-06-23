import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, startWith, switchMap, take, tap } from 'rxjs';
import { AsyncPipe, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { FieldsetModule } from 'primeng/fieldset';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    ReactiveFormsModule,
    TitleCasePipe,
    FieldsetModule,
    ListboxModule,
    ButtonModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export default class ProductosComponent {

  
  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)
  private cartService = inject(CartService)
  message = inject(MessageService)

  paramCategoria$ = this.route.paramMap.pipe(
    map((params) => params.get("categoria") ?? ''),
    tap(() => {
      this.categoriasForm.reset();
    })
  )

  
  productos$ = this.paramCategoria$.pipe(
    switchMap((categoria) => this.productService.obtenerProductosPorCategoria(categoria)),
  )

  subCategorias$ = this.productos$.pipe(
    map((p) => [...new Set(p.map(p => p.subcategoria))]),
    map(p => p.map(sp => {
      return {
        label: sp,
        value: sp
      }
    }))
  )

  categoriasForm = new FormControl<string | null>(null)

  categoriasFormChanges$ = this.categoriasForm.valueChanges.pipe(
    startWith(null)
  )

  productosFiltrados$ = combineLatest([
    this.productos$,
    this.categoriasFormChanges$
  ])
  .pipe(
    map((data) => {
      if(data[1] === null){
        return data[0]
      }
      return data[0].filter(c => c.subcategoria === data[1])
    })
  )


  addToCart(product: Product) {
    this.productService.obtenerProductoPorId(product.id)
    .pipe(take(1))
    .subscribe(p => {
      if(p) {
        this.cartService.agregarProducto(p)
        this.message.add({severity: 'success', detail: "Producto agregado al carrito"})

      }
    })
  }

  details(product: Product) {
    
  }

}
