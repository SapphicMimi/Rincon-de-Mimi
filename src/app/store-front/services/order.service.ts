import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { DataStateOrder, Facturacion, Order } from '../../shared/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  private _state = signal<DataStateOrder>({
    data: [],
    loading: false,
    error: false,
    errorMessage: ""
  })

  private data = computed(() => this._state().data);
  public loading = computed(() => this._state().loading);
  public error = computed(() => this._state().error);
  public errorMessage = computed(() => this._state().errorMessage);

  public orders: Order[] = []

  public async getOrders(id: number): Promise<Order[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",

        loading: true,
      }));

      const { data } = await this._supabaseClient
        .from('compras')
        .select('productos!inner(nombre, precio, id_producto), fecha, datos, digital')
        .eq("id_usuario_c", id)
        .returns<Order[]>()
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

  public async callData(id: number): Promise<void> {
    this.orders = await this.getOrders(id);
  }

  public checkOrders(): boolean {
    if(this.orders.length == 0) {
      return false
    }
    return true;
  }

  public unzipDirection(json: string): Facturacion[] {
    const direction: Facturacion[] = JSON.parse(json);
    return direction;
  }
}
