import { Product } from "./product.model";



export interface CartItem {
    id: number;
    cantidad: number;
    subtotal: number;
    producto: Product;
}
