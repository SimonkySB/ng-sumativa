import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, map, shareReplay, switchMap, tap } from "rxjs";
import { Product } from "../models/product.model";
import { FirebaseService } from "./firebase.service";



@Injectable({providedIn: 'root'})
export class ProductService {

    private pId = 1;
    private url = "products.json"
    private storage = inject(FirebaseService)

    private _productos = new BehaviorSubject<Product[]>([])
    productos$ = this._productos.asObservable().pipe(
        shareReplay(1)
    )

    load(){
        return this.storage.get<Product[]>(this.url).pipe(
            tap((data) => {
                this._productos.next(data)
                const v = [...data].sort((a, b) => b.id - a.id)
                if(v.length > 0) {
                    this.pId = v[0].id + 1
                }
            })
        )
    }


    obtenerProductosPorCategoria(categoria: string){
        return this.productos$.pipe(
            map(p => p.filter(p => p.categoria === categoria))
        )
    }

    productosEnOferta(){
        return this.productos$.pipe(
            map(p => p.filter(p => p.precioDescuento !== null))
        )
    }


    productosDestacados(){
        return this.productos$.pipe(
            map((p) => p.slice(0, 10))
        )
    }

    obtenerProductoPorId(id: number){
        return this.productos$.pipe(
            map(p => p.find(pr => pr.id === id))
        )
    }

    obtenerProductosAdmin(){
        return this.productos$
    }

    eliminarProducto(id: number){
        const products = this._productos.value.filter(p => p.id !== id)
        return this.storage.post<Product[]>(this.url, products).pipe(
            switchMap(() => this.load())
        )
    }

    guardarProducto(producto: Product){
        const products = [...this._productos.value, {...producto, id: this.pId}]
        return this.storage.post<Product[]>(this.url, products).pipe(
            switchMap(() => this.load())
        )
    }

    editarProducto(producto: Product){
        const products = this._productos.value.map(p => 
            p.id === producto.id ? producto : p
        )
        return this.storage.post<Product[]>(this.url, products).pipe(
            switchMap(() => this.load())
        )
    }

}