import { Injectable, computed, effect, signal } from "@angular/core";

import { Product } from "../models/product.model";
import { CartItem } from "../models/cart-item.model";


@Injectable({providedIn: 'root'})
export class CartService {

    private lsKey = "carrito"
    
    private _cart = signal<CartItem[]>([]);


    private _cartOpened = signal<boolean>(false);
    cartOpened = this._cartOpened.asReadonly();

    cart = computed(() => 
        this._cart().map(res => {
            const precio = res.producto.precioDescuento === null ? res.producto.precio : res.producto.precioDescuento
            return {...res, subtotal: precio * res.cantidad}
        })
    )
    
    cantidadTotal = computed(() => this.cart().length)

    total = computed(() => 
        this.cart().reduce((prev, curr) => prev + curr.subtotal, 0)
    )

    constructor(){
        effect(() => {
            localStorage.setItem(this.lsKey, JSON.stringify(this._cart()))
        })
    }

    load(){
        const carrito = localStorage.getItem(this.lsKey)
        if(carrito != null) {
            this._cart.set(JSON.parse(carrito))
        }
    }


    cargarCarrito(cart: CartItem[]){
        this._cart.set(cart)
    }

    agregarProducto(item: Product){
        const p = this._cart().find(p => p.id === item.id)
        if(p){
            this.incrementar(p.id)
        }
        else {
            if(item.stock > 0){
                this._cart.update((items) => [...items, {id: item.id, cantidad: 0, producto: item, subtotal: 0}])
                this.incrementar(item.id)
            }
        }
        
    }

    incrementar(id: number){
        this.#change(id, (item) => 
            item.cantidad < item.producto.stock ? {...item, cantidad: item.cantidad + 1} : item
        )
    }

    disminuir(id: number){
        this.#change(id, (item) => 
            item.cantidad > 1 ? {...item, cantidad: item.cantidad - 1} : item
        )
    }


    quitarProducto(id: number){
        const items = this._cart().filter(c => c.id !== id)
        this._cart.set(items)
    }

    #change(id: number, callback: (item: CartItem) => CartItem){
        this._cart.update((products) => 
            products.map(p => 
                {
                    const res = p.id === id ? callback(p): p
                    const precio = res.producto.precioDescuento === null ? res.producto.precio : res.producto.precioDescuento
                    return {...res, subtotal: precio * res.cantidad}
                }
            )
        )
    }

    verCarrito(){
        this._cartOpened.set(true)
    }

    cerrarCarrito(){
        this._cartOpened.set(false)
    }

}