import { computed, inject, Injectable, signal } from '@angular/core';
import { DataStateUser, User } from '../../shared/interfaces/user';
import { SupabaseService } from '../../shared/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() {}

  private _state = signal<DataStateUser>({
    data: [],
    loading: false,
    error: false,
    errorMessage: ""
  })

  // Datos del Signal
  private data = computed(() => this._state().data);
  public loading = computed(() => this._state().loading);
  public error = computed(() => this._state().error);
  public errorMessage = computed(() => this._state().errorMessage);

  async getUser(email: string): Promise<User[]> {
    try {
      this._state.update(() => ({
        data: [],
        error: false,
        errorMessage: "",
        loading: true
      }));

      const { data } = await this._supabaseClient
        .from('usuarios')
        .select()
        .eq('correo', email)
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

  async getUserId(id: number): Promise<User[]> {
    try {
      this._state.update(() => ({
        data: [],
        error: false,
        errorMessage: "",
        loading: true
      }));

      const { data } = await this._supabaseClient
        .from('usuarios')
        .select()
        .eq('id_usuario', id)
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
