import { computed, inject, Injectable, signal } from '@angular/core';
import { Admin, DataStateAdmin } from '../../shared/interfaces/admin';
import { SupabaseService } from '../../shared/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  private _state = signal<DataStateAdmin>({
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

  async getAdmin(email: string): Promise<Admin[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",
        loading: true
      }));

      const { data } = await this._supabaseClient
        .from('administradores')
        .select()
        .eq('correo', email)
        .returns<Admin[]>()
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
