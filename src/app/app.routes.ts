import { Routes } from '@angular/router';
import { PublicShellComponent } from './components/public-shell/public-shell.component';
import { authGuard } from './guards/auth.guard';
import { ROLES } from './constants/role.const';

export const routes: Routes = [
    {
        path: '',
        component: PublicShellComponent,
        children: [
            {
                path: '',
                loadComponent: () => import("./paginas/inicio/inicio.component")
            },
            {
                path: 'productos/:categoria',
                loadComponent: () => import("./paginas/productos/productos.component")
            },
            {
                path: 'perfil',
                canActivate: [authGuard(ROLES.CLIENTE)],
                loadComponent: () => import("./paginas/mi-perfil/mi-perfil.component")
            },
            {
                path: 'admin-productos',
                canActivate: [authGuard(ROLES.ADMIN)],
                loadComponent: () => import("./paginas/admin-productos/admin-productos.component")
            },
            {
                path: 'admin-usuarios',
                canActivate: [authGuard(ROLES.ADMIN)],
                loadComponent: () => import("./paginas/admin-usuarios/admin-usuarios.component")
            }

            
        ]
    }
];
