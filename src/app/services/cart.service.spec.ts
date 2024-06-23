import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';


describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    service = TestBed.inject(CartService);
    expect(service).toBeTruthy();
  });

  it('Deberia tener un producto el carrito', () => {
    service = TestBed.inject(CartService);
    service.agregarProducto({
      id: 1,
      categoria: "perros",
      descripcion: "",
      imagen: "",
      nombre: "",
      precio: 2000,
      precioDescuento: null,
      subcategoria: "alimentos",
      categoriaId: 0,
      subcategoriaId: 0,
      stock: 50
    })

    expect(service.cantidadTotal()).toBe(1);
  });
  it('Deberia el carrito calcular el precio total cuando se incrementa la cantidad de los productos en este', () => {
    service = TestBed.inject(CartService);
    service.agregarProducto({
      id: 1,
      categoria: "perros",
      descripcion: "",
      imagen: "",
      nombre: "",
      precio: 2000,
      precioDescuento: null,
      subcategoria: "alimentos",
      categoriaId: 0,
      subcategoriaId: 0,
      stock: 50
    })
    service.agregarProducto({
      id: 2,
      categoria: "perros",
      descripcion: "",
      imagen: "",
      nombre: "",
      precio: 3000,
      precioDescuento: null,
      subcategoria: "alimentos",
      categoriaId: 0,
      subcategoriaId: 0,
      stock: 50
    })
    expect(service.total()).toBe(5000);
    service.incrementar(1)
    expect(service.total()).toBe(7000);
  });
  it('Deberia disminuir la cantidad total del carrito cuando se elimina un producto de este', () => {
    service = TestBed.inject(CartService);
    service.agregarProducto({
      id: 1,
      categoria: "perros",
      descripcion: "",
      imagen: "",
      nombre: "",
      precio: 2000,
      precioDescuento: null,
      subcategoria: "alimentos",
      categoriaId: 0,
      subcategoriaId: 0,
      stock: 50
    })
    service.agregarProducto({
      id: 2,
      categoria: "perros",
      descripcion: "",
      imagen: "",
      nombre: "",
      precio: 3000,
      precioDescuento: null,
      subcategoria: "alimentos",
      categoriaId: 0,
      subcategoriaId: 0,
      stock: 50
    })
    expect(service.cantidadTotal()).toBe(2);
    service.quitarProducto(1)
    expect(service.cantidadTotal()).toBe(1);
  });
});
