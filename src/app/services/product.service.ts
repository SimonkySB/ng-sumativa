import { Injectable, inject } from "@angular/core";
import { EMPTY, map, of } from "rxjs";
import { ApiService } from "../api/api.service";
import { Product } from "../models/product.model";



@Injectable({providedIn: 'root'})
export class ProductService {

    private api = inject(ApiService)


    obtenerProductosPorCategoria(categoria: string){
        return this.api.productos$.pipe(
            map(p => p.filter(p => p.categoria === categoria))
        )
    }

    productosEnOferta(){
        return this.api.productos$.pipe(
            map(p => p.filter(p => p.precioDescuento !== null))
        )
    }


    productosDestacados(){
        return this.api.productos$.pipe(
            map((p) => p.slice(0, 10))
        )
    }

    obtenerProductoPorId(id: number){
        return this.api.productos$.pipe(
            map(p => p.find(pr => pr.id === id))
        )
    }

    obtenerProductosAdmin(){
        return this.api.productos$
    }

    eliminarProducto(id: number){
        this.api.eliminarProducto(id)
        return of(EMPTY)
    }

    guardarProducto(producto: Product){
        this.api.guardarProducto(producto)
        return of(EMPTY)
    }

    editarProducto(producto: Product){
        this.api.editarProducto(producto)
        return of(EMPTY)
    }

}