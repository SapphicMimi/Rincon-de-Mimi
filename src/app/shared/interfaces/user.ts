export interface DataStateUser {
  data: User[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface User {
  id_usuario: number
  nombre: string;
  apellidos: string;
  correo: string;
  pass: string;
  suscrito: string | null
}
