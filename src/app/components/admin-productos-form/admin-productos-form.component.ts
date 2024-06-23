import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, TitleCasePipe } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonClickEvent, RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { Categoria } from '../../models/categoria.model';
import { Subcategoria } from '../../models/subcategoria.model';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-admin-productos-form',
  standalone: true,
  imports: [
    TitleCasePipe,
    JsonPipe,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule,
    RippleModule
  ],
  templateUrl: './admin-productos-form.component.html',
  styleUrl: './admin-productos-form.component.scss'
})
export class AdminProductosFormComponent {

  private dynamicDialogConfig = inject(DynamicDialogConfig)
  private fb = inject(NonNullableFormBuilder)

  form = this.fb.group({
    id: 0,
    nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    descripcion: ["", [Validators.maxLength(200)]],
    imagen: [""],
    precio: [1, [Validators.required, Validators.min(0)]],
    precioDescuento: this.fb.control<number | null>(null, [Validators.min(0)]),
    categoriaId: [1],
    subcategoriaId: [1],
    stock: [1, [Validators.required, Validators.min(0)]]
  })

  categorias = signal<Categoria[]>([])
  subcategorias = signal<Subcategoria[]>([])
  _subcategorias = signal<Subcategoria[]>([])

  producto?: Product

  constructor() {
    const { categorias, subcategorias, product }: {
      categorias: Categoria[],
      subcategorias: Subcategoria[],
      product?: Product
    } = this.dynamicDialogConfig.data

    this._subcategorias.set(subcategorias)
    this.categorias.set(categorias)

    this.producto = product

    if (product) {
      this.setForm(product)
    }
    this._handleCategoriaChange();

  }

  setForm(product: Product) {
    this.form.patchValue({
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      imagen: product.imagen,
      precio: product.precio,
      precioDescuento: product.precioDescuento,
      categoriaId: product.categoriaId,
      subcategoriaId: product.subcategoriaId,
      stock: product.stock,
    }, { emitEvent: false })
  }

  guardar() { 
    if(this.form.invalid){ return; }

    const values = this.form.getRawValue()
    const producto: Product = {
      ...values,
      categoria: this.categorias().find(c => c.id === values.categoriaId)?.nombre ?? "",
      subcategoria: this._subcategorias().find(c => c.id === values.subcategoriaId)?.nombre ?? "",
    };

    this.dynamicDialogConfig.data.onsubmit(producto)
  }


  handleCategoriaChange(event: RadioButtonClickEvent) {
    this._handleCategoriaChange()
    this.form.controls.subcategoriaId.setValue(this.subcategorias()[0].id)
  }

  private _handleCategoriaChange() {
    const categoriaId = this.form.controls.categoriaId.value
    const subcategoriasFiltradas = this._subcategorias().filter(s => s.categoriaId === categoriaId)
    this.subcategorias.set(subcategoriasFiltradas)
  }

  getError(ctrlName: string, error: string){
    return this.form.get(ctrlName)?.getError(error)
  }
}
