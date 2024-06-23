export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    precioDescuento: number | null;
    categoria: string;
    categoriaId: number;
    subcategoria: string;
    subcategoriaId: number;
    stock: number;
}