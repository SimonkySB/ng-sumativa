import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MessageService } from 'primeng/api';


import { ToastModule } from 'primeng/toast';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { CategoriaService } from './services/categoria.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit{
  
  productService = inject(ProductService)
  catService = inject(CategoriaService)
  authService = inject(AuthService)
  cart = inject(CartService)
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.authService.cargarUsuario()
    combineLatest([
      this.productService.load(),
      this.catService.loadCategorias(),
      this.catService.loadSubcategorias()
    ])
      .pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
    this.cart.load()
  }
}
