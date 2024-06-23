import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {

  private fb = inject(NonNullableFormBuilder)
  private ref = inject(DynamicDialogRef)
  private refCfg = inject(DynamicDialogConfig)
  private router = inject(Router)
  private auth = inject(AuthService)
  private messageService = inject(MessageService)

  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.maxLength(50)]]
  })

  submit() {
    if(this.form.invalid){return;}

    const values = this.form.getRawValue();

    this.auth.login(values.email, values.password).subscribe({
      next: () => {
        this.router.navigate(["perfil"])
        this.ref.close()
      },
      error: (ex) => {
        this.messageService.add({ severity: 'error', summary: 'Login', detail: ex.message, life: 20000 })
      }
    })
    
  }

  recuperarPassword() {
    this.refCfg.data.recuperarPasswordCallback();
  }


}
