export interface DataStateOrder {
  data: Order[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface Order {
  id_usuario: number;
  productos: datosManga;
  fecha: string;
  datos: string;
  digital: boolean;
}

export interface Facturacion {
  direccion: string;
  codPostal: string;
  ciudad: string;
  provincia: string;
}

export interface datosManga {
  nombre: string;
  precio: string;
  id_producto: number;
}

export interface ReducedManga {
  nombre: string,
  id_producto: number
}
