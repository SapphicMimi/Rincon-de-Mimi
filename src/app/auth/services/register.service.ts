import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { DataStateUser, User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  private _state = signal<DataStateUser>({
    data: [],
    loading: false,
    error: false,
    errorMessage: ""
  })

  private data = computed(() => this._state().data);
  public loading = computed(() => this._state().loading);
  public error = computed(() => this._state().error);
  public errorMessage = computed(() => this._state().errorMessage);

  async getAllUser(): Promise<User[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",
        loading: true
      }));

      const { data } = await this._supabaseClient
        .from('usuarios')
        .select()
        .returns<User[]>()
        .throwOnError();

      if(data) {
        this._state.update((state) => ({
          ...state,
          data: data,
        }));
      }
    } catch (error: any) {
      this._state.update((state) => ({
        ...state,
        error: true,
        errorMessage: error
      }));
    } finally {
      this._state.update((state) => ({
        ...state,
        loading: false,
      }));

      return this.data();
    }
  }

  async newUser(data: {name: string, surname: string, email: string, pass: string}) {
    try {
      this._state.update((state) => ({
        ...state,
        error: false,
        errorMessage: "",
        loading: true
      }));

      await this._supabaseClient
        .from('usuarios')
        .insert({
          nombre: data.name,
          apellidos: data.surname,
          correo: data.email,
          pass: data.pass
        })
        .throwOnError();

    } catch (error: any) {
      this._state.update((state) => ({
        ...state,
        error: true,
        errorMessage: error
      }));

    } finally {
      this._state.update((state) => ({
        ...state,
        loading: false
      }));
    }
  }

  async getUser(): Promise<User[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",
        loading: true
      }));

      const { data } = await this._supabaseClient
        .from('usuarios')
        .select()
        .eq('id_usuario', 1)
        .returns<User[]>()
        .throwOnError();

      if(data) {
        this._state.update((state) => ({
          ...state,
          data: data,
        }));
      }
    } catch (error: any) {
      this._state.update((state) => ({
        ...state,
        error: true,
        errorMessage: error
      }));
    } finally {
      this._state.update((state) => ({
        ...state,
        loading: false,
      }));

      return this.data();
    }
  }
}
