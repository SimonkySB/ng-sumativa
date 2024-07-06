import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { ROLES } from '../constants/role.const';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({ template: '' })
export class FirstDummyComponent {}
@Component({ template: '' })
export class SecondDummyComponent {}

describe('authGuard', () => {
  
  it('permite navegar al usuario al perfil si es de tipo CLIENTE', async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        provideRouter([
          {path: 'perfil', component: FirstDummyComponent, canActivate: [authGuard(ROLES.CLIENTE)]},
        ]),
      ],
    });

    const authService = TestBed.inject(AuthService);
    const harness = await RouterTestingHarness.create("/");

    authService.setUsuario({
      id: 1,
      email: "cliente@cliente",
      password: "123",
      roles: [ROLES.CLIENTE],
      telefono: "98765544",
      direccion: "",
      activo: true
    })
    authService.cargarUsuario()

    let instance = await harness.navigateByUrl('/perfil');
    expect(instance).toBeInstanceOf(FirstDummyComponent);
  });

  it('Redirige al usuario al inicio si no tiene el rol adecuado', async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        provideRouter([
          {path: 'perfil', component: FirstDummyComponent, canActivate: [authGuard(ROLES.CLIENTE)]},
          {path: '', component: SecondDummyComponent},
        ]),
      ],
    });

    const authService = TestBed.inject(AuthService);
    const harness = await RouterTestingHarness.create("/");

    authService.setUsuario({
      id: 1,
      email: "cliente@cliente",
      password: "123",
      roles: [],
      telefono: "98765544",
      direccion: "",
      activo: true
    })
    authService.cargarUsuario()

    let instance = await harness.navigateByUrl('/perfil');
    expect(instance).toBeInstanceOf(SecondDummyComponent);
  });

  it('Redirige al usuario al inicio si no tiene esta logeado', async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService,
        provideRouter([
          {path: 'perfil', component: FirstDummyComponent, canActivate: [authGuard(ROLES.CLIENTE)]},
          {path: '', component: SecondDummyComponent},
        ]),
      ],
    });

    const authService = TestBed.inject(AuthService);
    const harness = await RouterTestingHarness.create("/");

    authService.logout()

    let instance = await harness.navigateByUrl('/perfil');
    expect(instance).toBeInstanceOf(SecondDummyComponent);
  });
});
