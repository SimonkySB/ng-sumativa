import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';


export interface UsuarioTbl extends Usuario {
  rolesStr: string;
  activoStr: string;
}

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmPopupModule,
    TooltipModule
  ],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.scss',
  providers: [ConfirmationService, DialogService]
})
export default class AdminUsuariosComponent implements OnInit, OnDestroy {


  message = inject(MessageService)
  confirm = inject(ConfirmationService)
  dialogService = inject(DialogService)
  userSerivce = inject(UserService)

  usuarios: UsuarioTbl[] = []

  refForm?: DynamicDialogRef;
  sub?: Subscription

  ngOnInit(): void {
    this.sub = this.userSerivce.listarUsuarios().subscribe(us => {
      this.usuarios = us.map(u => ({ ...u, rolesStr: u.roles.join(", "), activoStr: u.activo ? "Activo" : "Inactivo" }))
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
    if (this.refForm) {
      this.refForm.close();
    }
  }


  onRowCambiarEstado(user: UsuarioTbl, event: MouseEvent) {
    this.confirm.confirm({
      target: event.target as EventTarget,
      message: `Estas segur@ de ${user.activo ? "Desactivar": "Activar" } el usuario?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if(user.activo){
          this.userSerivce.desactivarUsuario(user.id).subscribe({
            next: () => {
              this.message.add({ severity: 'success', detail: 'Usuario Desactivado', life: 3000 });
            },
            error: (ex) => {
              this.message.add({ severity: "error", detail: ex.message })
            }
          })
        }
        else {
          this.userSerivce.activarUsuario(user.id).subscribe({
            next: () => {
              this.message.add({ severity: 'success', detail: 'Usuario Activado', life: 3000 });
            },
            error: (ex) => {
              this.message.add({ severity: "error", detail: ex.message })
            }
          })
        }
        
      },
      reject: () => { }
    });
  }
}
