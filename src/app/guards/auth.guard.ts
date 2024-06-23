import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard = (...roles: string[]): CanActivateFn => {
  return (route, state)  => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    return authService.tienePermisos(roles).pipe(
      map((tienePermisos) => tienePermisos ?? router.createUrlTree(["/"]))
    )
  };
}