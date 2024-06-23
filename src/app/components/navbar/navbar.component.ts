import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';

import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';
import { Usuario } from '../../models/usuario.model';
import { ROLES } from '../../constants/role.const';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLinkActive,
    MenubarModule,
    RippleModule,
    ButtonModule,
    BadgeModule,
    MenuModule,
    NgClass
  ],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  dialogService = inject(DialogService)
  router = inject(Router)
  cartService = inject(CartService)
  authService = inject(AuthService)

  userSub?: Subscription;

  refInicioSesion?: DynamicDialogRef;
  refRegistrarse?: DynamicDialogRef;
  refRecuperarPassword?: DynamicDialogRef;

  userMenu: MenuItem[] = []

  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: "",
    },
    {
      label: 'Perros',
      icon: 'pi pi-star',
      routerLink: "productos/perros",
    },
    {
      label: 'Gatos',
      icon: 'pi pi-star',
      routerLink: "productos/gatos",
    },
    {
      label: 'Exóticos',
      icon: 'pi pi-star',
      routerLink: "productos/exoticos",
    }
  ];

  registrarse() {
    this.refRegistrarse = this.dialogService.open(RegistrarseComponent, {
      header: 'Registrarse',
      width: "70vw",
      breakpoints: {
        '960px': '80vw',
        '640px': '90vw'
      },
    });
  }

  iniciarSesion() {
    this.refInicioSesion = this.dialogService.open(InicioSesionComponent, {
      header: 'Iniciar Sesión',
      width: "40vw",
      breakpoints: {
        '960px': '60vw',
        '640px': '90vw'
      },
      data: {
        recuperarPasswordCallback: () => this.recuperarPasswordCallback()
      }
    });
  }

  recuperarPasswordCallback() {
    this.refInicioSesion?.close();
    this.refRecuperarPassword = this.dialogService.open(RecuperarPasswordComponent, {
      header: 'Recuperar Contraseña',
      width: "40vw",
      breakpoints: {
        '960px': '60vw',
        '640px': '90vw'
      },
    })
  }



  ngOnInit(): void {
    this.userSub = this.authService.usuario$.subscribe(u => {
      if (!u) {
        this.userMenu = []
      } else {
        this.userMenu = this.getUserMenu(u)
      }
    })

  }

  ngOnDestroy() {
    if (this.refInicioSesion) {
      this.refInicioSesion.close();
    }
    if (this.refRegistrarse) {
      this.refRegistrarse.close();
    }
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
  }


  private getUserMenu(u: Usuario) {
    let menu: MenuItem[] = []
    const admin: MenuItem[] = [
      {
        label: 'Administración',
        items: [
          {
            label: 'Productos',
            icon: 'pi pi-box',
            routerLink: "admin-productos"
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            routerLink: "admin-usuarios"
          },
        ]
      }
    ]

    const cliente: MenuItem[] = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Configuración',
            icon: 'pi pi-cog',
            routerLink: "perfil"
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.logout()
              this.router.navigate(["/"])
            }
          }
        ]
      }
    ]

    if(u.roles.includes(ROLES.ADMIN)) {
      menu = [...menu, ...admin]
    }
    if(u.roles.includes(ROLES.CLIENTE)){
      menu = [...menu, ...cliente]
    }
    return menu
  }

}
