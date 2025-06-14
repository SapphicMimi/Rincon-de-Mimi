import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { DataState } from '../../shared/interfaces/purchase_user';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  private _state = signal<DataState>({
    loading: false,
    error: false,
    errorMessage: ""
  })

  public loading = computed(() => this._state().loading);
  public error = computed(() => this._state().error);
  public errorMessage = computed(() => this._state().errorMessage);

  async newOrder(data: {id: number, id_p: number, fecha: string, datos: string, digital: boolean}) {
    try {
      this._state.update((state) => ({
        ...state,
        error: false,
        errorMessage: "",
        loading: true
      }));

      await this._supabaseClient
        .from('compras')
        .insert({
          id_usuario_c: data.id,
          id_producto_p: data.id_p,
          fecha: data.fecha,
          datos: data.datos,
          digital: data. digital
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

  async updateSuscription(id: number, fecha: string|null) {
    try {
      this._state.update((state) => ({
        ...state,
        error: false,
        errorMessage: "",
        loading: true
      }));

      await this._supabaseClient
        .from('usuarios')
        .update({ suscrito: fecha })
        .eq('id_usuario', id)
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
