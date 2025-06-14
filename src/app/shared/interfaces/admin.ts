export interface DataStateAdmin {
  data: Admin[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

export interface Admin {
  id_admin: number;
  nombre: string;
  correo: string;
  pass: string;
  admin: boolean;
}
