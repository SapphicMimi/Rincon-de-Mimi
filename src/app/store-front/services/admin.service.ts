import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { DataStateQUpdate } from '../../shared/interfaces/adminPanel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  private _state = signal<DataStateQUpdate>({
    loading: false,
    error: false,
    errorMessage: ""
  })

  public loading = computed(() => this._state().loading);
  public error = computed(() => this._state().error);
  public errorMessage = computed(() => this._state().errorMessage);

  async newOrderAdmin(data: {id_admin: number, id_prod: number, quantity: number}) {
    try {
      this._state.update((state) => ({
        ...state,
        error: false,
        errorMessage: "",
        loading: true
      }));

      await this._supabaseClient
        .from('pedidos')
        .insert({
          id_admin_p: data.id_admin,
          id_producto_p: data.id_prod,
          cantidad: data.quantity
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
}
