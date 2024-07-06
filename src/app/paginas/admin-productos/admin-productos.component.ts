import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Subscription, combineLatest, finalize } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';


import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { AdminProductosFormComponent } from '../../components/admin-productos-form/admin-productos-form.component';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { Subcategoria } from '../../models/subcategoria.model';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmPopupModule
  ],
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.scss',
  providers: [ConfirmationService, DialogService]
})
export default class AdminProductosComponent implements OnInit, OnDestroy {


  productoService = inject(ProductService)
  message = inject(MessageService)
  confirm = inject(ConfirmationService)
  dialogService = inject(DialogService)
  catService = inject(CategoriaService)
  loader = inject(LoaderService)

  prodSub?: Subscription
  refForm?: DynamicDialogRef;

  products: Product[] = []
  categorias: Categoria[] = []
  subcategorias: Subcategoria[] = []

  ngOnInit(): void {
    this.prodSub = combineLatest([
      this.productoService.obtenerProductosAdmin(),
      this.catService.categorias$,
      this.catService.subcategorias$,
    ]).subscribe(res => {
      this.products = res[0]
      this.categorias = res[1]
      this.subcategorias = res[2]
    })
  }

  ngOnDestroy(): void {
    this.prodSub?.unsubscribe()
    if (this.refForm) {
      this.refForm.close();
    }
  }


  new() {
    this.refForm = this.dialogService.open(AdminProductosFormComponent, {
      header: 'Detalle del Producto',
      width: "450px",
      styleClass: "p-fluid",
      data: {
        categorias: this.categorias,
        subcategorias: this.subcategorias,
        onsubmit: (product: Product) => {
          this.loader.show()
          this.productoService.guardarProducto(product).pipe(
            finalize(() => this.loader.hide())
          ).subscribe({
            next: () => {
              this.message.add({ severity: "success", detail: "Producto registrado exitosamente" })
              this.refForm?.close();
            },
            error: (ex) => {
              this.message.add({ severity: "error", detail: ex.message })
            }
          })
        }
      }
    })
  }

  onRowEdit(product: Product, event: MouseEvent) {
    this.refForm = this.dialogService.open(AdminProductosFormComponent, {
      header: 'Detalle del Producto',
      width: "450px",
      styleClass: "p-fluid",
      data: {
        categorias: this.categorias,
        subcategorias: this.subcategorias,
        product: product,
        onsubmit: (product: Product) => {
          this.loader.show()
          this.productoService.editarProducto(product).pipe(
            finalize(() => this.loader.hide())
          ).subscribe({
            next: () => {
              this.message.add({ severity: "success", detail: "Producto actualizado exitosamente" })
              this.refForm?.close();
            },
            error: (ex) => {
              this.message.add({ severity: "error", detail: ex.message })
            }
          })
        }
      }
    })
  }

  onRowDelete(product: Product, event: MouseEvent) {
    this.confirm.confirm({
      target: event.target as EventTarget,
      message: 'Estas segur@ de eliminar el producto?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loader.show()
        this.productoService.eliminarProducto(product.id).pipe(
          finalize(() => this.loader.hide())
        ).subscribe({
          next: () => {
            this.message.add({ severity: 'success', detail: 'Producto eliminado', life: 3000 });
          },
          error: (ex) => {
            this.message.add({ severity: "error", detail: ex.message })
          }
        })
      },
      reject: () => { }
    });
  }
}
