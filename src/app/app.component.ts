import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MessageService } from 'primeng/api';


import { ToastModule } from 'primeng/toast';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { CategoriaService } from './services/categoria.service';
import { combineLatest, finalize } from 'rxjs';
import { UserService } from './services/user.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, LoaderComponent],
  template: `
  <p-toast position="top-center"/>
  <app-loader />
  <router-outlet></router-outlet>
    `,
  styles: [],
  providers: [MessageService]
})
export class AppComponent implements OnInit{
  
  productService = inject(ProductService)
  catService = inject(CategoriaService)
  authService = inject(AuthService)
  userService = inject(UserService)
  loader = inject(LoaderService)
  cart = inject(CartService)
  destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.loader.show()
    this.authService.cargarUsuario()
    combineLatest([
      this.userService.load(),
      this.productService.load(),
      this.catService.loadCategorias(),
      this.catService.loadSubcategorias()
    ])
      .pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loader.hide())
    ).subscribe(() => {
      
    })
    this.cart.load()
  }
}
