import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';


import { ToastModule } from 'primeng/toast';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit{
  authService = inject(AuthService)
  cart = inject(CartService)

  ngOnInit(): void {
    this.authService.cargarUsuario()
    this.cart.load()
  }
}
