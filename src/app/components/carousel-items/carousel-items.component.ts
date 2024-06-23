import { Component, EventEmitter, Input, Output } from '@angular/core';


import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';



@Component({
  selector: 'app-carousel-items',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    CurrencyPipe
  ],
  templateUrl: './carousel-items.component.html',
  styleUrl: './carousel-items.component.scss'
})
export class CarouselItemsComponent {


  @Input() products: Product[] = [];

  @Output() addToCartEvent = new EventEmitter<number>();
  @Output() detailEvent = new EventEmitter<number>();

  responsiveOptions = [
    {
        breakpoint: '3000px',
        numVisible: 4,
        numScroll: 4
    },
    {
        breakpoint: '1100px',
        numVisible: 3,
        numScroll: 3
    },
    {
      breakpoint: '900px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '700px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  addToCart(item: Product) {
    this.addToCartEvent.emit(item.id)
  }

  details(item: Product) {
    this.detailEvent.emit(item.id)
  }
}
