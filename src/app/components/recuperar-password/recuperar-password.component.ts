import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.scss'
})
export class RecuperarPasswordComponent {
  private messageService = inject(MessageService)
  private auth = inject(AuthService)
  private ref = inject(DynamicDialogRef)
  private fb = inject(NonNullableFormBuilder)

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
  })

  submit() {
    if(this.form.invalid){return;}
    const values = this.form.getRawValue();

    this.auth.recuperarPassword(values.email).subscribe(
      {
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Recuperar password', detail: "El correo fué enviado exitosamente", life: 20000 })
          this.ref.close()
        }
      }
    )
  }
}
