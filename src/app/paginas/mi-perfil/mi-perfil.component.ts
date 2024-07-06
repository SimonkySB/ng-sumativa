import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';

import { passwordMatch, passwordPattern, phonoContactoPattern } from '../../utils/form.utils';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../models/perfil.model';
import { finalize, take } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    PasswordModule
  ],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss'
})
export default class MiPerfilComponent implements OnInit {


  private fb = inject(NonNullableFormBuilder)
  private msgService = inject(MessageService)
  private perfilService = inject(PerfilService)
  private loader = inject(LoaderService)

  modoEdicion = false

  perfil?: Perfil


  form = this.fb.group({
    usuarioId: 0,
    telefono: ["", [Validators.required, Validators.pattern(phonoContactoPattern)]],
    direccionDespacho: [""]
  })

  passForm = this.fb.group({
    password: ["", [Validators.required, Validators.pattern(passwordPattern)]],
    passwordRepeat: ["", [Validators.required]],
  }, {
    validators: passwordMatch
  })

  ngOnInit(): void {
    this.perfilService.obtenerPerfil().subscribe({
      next: (perfil) => {
        this.setFormValues(perfil)
        this.perfil = perfil
      }
    })
  }


  setFormValues(perfil: Perfil) {
    this.form.patchValue({
      telefono: perfil.telefono,
      direccionDespacho: perfil.direccionDespacho
    })
  }


  getError(ctrlName: string, error: string) {
    return this.form.get(ctrlName)?.getError(error)
  }

  getPassError(ctrlName: string, error: string) {
    return this.passForm.touched || this.passForm.dirty
      ? this.passForm.get(ctrlName)?.getError(error)
      : false
  }

  actualizarPerfil() {
    const values = this.form.getRawValue();
    this.loader.show()

    this.perfilService.actualizarPerfil(values).pipe(
      take(1),
      finalize(() => this.loader.hide())
    ).subscribe({
      next: (perfil) => {
        this.perfil = perfil
        this.msgService.add({ severity: 'success', detail: 'Perfil actualizado' })
        this.cambiarModoEdicion(false)
      }
    })

  }

  cambiarModoEdicion(activar: boolean) {
    this.modoEdicion = activar;
    if (!this.modoEdicion) {
      this.setFormValues(this.perfil!)
    }
  }

  cambiarPassword() {
    const values = this.passForm.getRawValue()

    this.loader.show()
    this.perfilService.cambiarPassword(values.password).pipe(
      finalize(() => this.loader.hide())
    ).subscribe({
      next: () => {
        this.msgService.add({ severity: 'success', detail: 'Contraseña Actualizada exitosamente.' })
        this.passForm.reset();
      }
    })
  }

}
