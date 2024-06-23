import { Component, inject } from '@angular/core';


import { SidebarModule } from 'primeng/sidebar';
import { CartService } from '../../services/cart.service';
import { CartItem } from "../../models/cart-item.model";
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { CurrencyPipe, NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe,
    CurrencyPipe,
    SidebarModule,
    ButtonModule,
    DataViewModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  cartService = inject(CartService)

  abierto = this.cartService.cartOpened
  cart = this.cartService.cart
  total = this.cartService.total
  cantidadTotal = this.cartService.cantidadTotal



  cerrarCarrito() {
    this.cartService.cerrarCarrito()
  }

  quitarDelCarrito(item: CartItem) {
    this.cartService.quitarProducto(item.id)
  }

  disminuir(item: CartItem) {
    this.cartService.disminuir(item.id)
  }

  aumentar(item: CartItem) {
    this.cartService.incrementar(item.id)
  }

  handleVisibleChange($event: boolean) {
    if(!$event){ this.cartService.cerrarCarrito() }
  }

  checkout() {
    
  }
}
