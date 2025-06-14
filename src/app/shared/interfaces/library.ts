export interface DataStateLibrary {
  data: OrderLibrary[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface OrderLibrary {
  id_usuario: number;
  productos: ReducedManga;
  fecha: string;
  datos: string;
  digital: boolean;
}

export interface ReducedManga {
  nombre: string,
  id_producto: number
}
