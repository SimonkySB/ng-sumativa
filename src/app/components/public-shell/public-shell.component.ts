import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-public-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CartComponent
  ],
  templateUrl: './public-shell.component.html',
  styleUrl: './public-shell.component.scss'
})
export class PublicShellComponent {

}
