import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { passwordMatch, passwordPattern, phonoContactoPattern } from '../../utils/form.utils';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule
  ],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent{

  private fb = inject(NonNullableFormBuilder)
  private authService = inject(AuthService)
  private messageService = inject(MessageService)
  private ref = inject(DynamicDialogRef)

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(passwordPattern)]],
    passwordRepeat: ["", [Validators.required]],
    telefono: ["", [Validators.required, Validators.pattern(phonoContactoPattern)]],
    direccionDespacho: [""]
  }, {
    validators: passwordMatch
  })



  getError(ctrlName: string, error: string){
    return this.form.get(ctrlName)?.getError(error)
  }
 
  registrarse() {
    const values = this.form.getRawValue()

    this.authService.registrarse({
      email: values.email, 
      password: values.password, 
      passwordRepeat: values.passwordRepeat, 
      telefono: values.telefono, 
      direccionDespacho: values.direccionDespacho, 
    }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Registro', detail: "Registro exitoso", life: 20000 })
        this.ref.close()
      },
      error: (ex) => {
        console.log(ex)
        this.messageService.add({ severity: 'error', summary: 'Registro', detail: ex.message, life: 20000 })
      }
    })

  }
  
}
