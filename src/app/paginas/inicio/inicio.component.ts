import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';


import { CarouselItemsComponent } from '../../components/carousel-items/carousel-items.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    AsyncPipe,
    CarouselItemsComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export default class InicioComponent{

  productService = inject(ProductService)
  cartService = inject(CartService)
  message = inject(MessageService)

  productosEnOferta$ = this.productService.productosEnOferta()
  productosDestacados$ = this.productService.productosDestacados()

  handleAddToCartEvent(id: number) {
    this.productService.obtenerProductoPorId(id)
    .pipe(take(1))
    .subscribe(p => {
      if(p) {
        this.cartService.agregarProducto(p)
        this.message.add({severity: 'success', detail: "Producto agregado al carrito"})
      }
    })
  }

  handleDetailEvent(id: number) {
    
  }

}
