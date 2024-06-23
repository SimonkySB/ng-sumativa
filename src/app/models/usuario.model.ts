export interface Usuario {
    id: number;
    email: string;
    password: string;
    roles: string[]
    direccion: string
    telefono: string;
    activo: boolean;
}