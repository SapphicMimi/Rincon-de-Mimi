export interface DataStateBook {
  data: Book[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface Book {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  mensual: boolean;
  digital: boolean;
  proveedores: string[];
  nombre_alt: string;
  id_api: number;
}

export interface DataState {
  digital: boolean
}

//
