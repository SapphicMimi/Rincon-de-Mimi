import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { DataStateOrder, Order } from '../../shared/interfaces/order';
import { DataStateLibrary, OrderLibrary } from '../../shared/interfaces/library';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  private _state = signal<DataStateLibrary>({
    data: [],
    loading: false,
    error: false,
    errorMessage: ""
  })

  private data = computed(() => this._state().data);
  public loading = computed(() => this._state().loading);
  public error = computed(() => this._state().error);
  public errorMessage = computed(() => this._state().errorMessage);

  public async getOrders(id: number): Promise<OrderLibrary[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",

        loading: true,
      }));

      const { data } = await this._supabaseClient
        .from('compras')
        .select('productos!inner(nombre, id_producto), fecha, datos, digital')
        .eq("id_usuario_c", id)
        .returns<OrderLibrary[]>()
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

  public getChapters(id: number): number {
    switch (id) {
      case 2: {
        return 2
        break;
      }
      case 3: {
        return 1
        break;
      }
      case 6: {
        return 1
        break;
      }
      default: {
        return 0
        break;
      }
    }
  }


  public getImages(id:number, chapter: number): number {
    switch (id) {
      case 2: {
        switch (chapter) {
          case 1: {
            return 35
            break;
          }
          case 2: {
            return 24
            break;
          }
          default: {
            return 0
            break;
          }
        }
      }
      case 3: {
        return 6
        break;
      }
      case 6: {
        return 51
        break;
      }
      default: {
        return 0
        break;
      }
    }
  }
}
