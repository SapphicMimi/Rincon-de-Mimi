import { computed, inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from '../../shared/services/supabase.service';
import { Book, DataState, DataStateBook } from '../../shared/interfaces/book';
import * as math from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _supabaseClient = inject(SupabaseService).supabaseClient;

  constructor() { }

  private _state = signal<DataStateBook>({
    data: [],
    loading: false,
    error: false,
    errorMessage: ""
  })

  private _stateBook = signal<DataState>({
    digital: false,
  })

  private data = computed(() => this._state().data);
  public loading = computed(() => this._state().loading);
  public error = computed(() => this._state().error);
  public errorMessage = computed(() => this._state().errorMessage);

  public digital = computed(() => this._stateBook().digital);

  async getAllBooks(): Promise<Book[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",

        loading: true,
      }));

      const { data } = await this._supabaseClient
        .from('productos')
        .select('id_producto, nombre, nombre_alt, precio, cantidad, mensual, digital, proveedores!inner(nombre), id_api')
        .returns<Book[]>()
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

  async getBook(id: string): Promise<Book[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",
        loading: true
      }));

      const { data } = await this._supabaseClient
        .from('productos')
        .select('id_producto, nombre, nombre_alt, precio, cantidad, mensual, digital, id_api')
        .eq('id_producto', id)
        .returns<Book[]>()
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

  async getMonthlyBooks(): Promise<Book[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",

        loading: true,
      }));

      const { data } = await this._supabaseClient
        .from('productos')
        .select('id_producto, nombre, nombre_alt, precio, cantidad, mensual, digital, proveedores!inner(nombre)')
        .eq('mensual', true)
        .returns<Book[]>()
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

  async getSuscription(): Promise<Book[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",

        loading: true,
      }));

      const { data } = await this._supabaseClient
        .from('productos')
        .select('id_producto, nombre, precio')
        .eq('id_producto', 8)
        .returns<Book[]>()
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

  async updateProduct(id: number, cantidad: number) {
    try {
      this._state.update((state) => ({
        ...state,
        error: false,
        errorMessage: "",
        loading: true
      }));

      await this._supabaseClient
        .from('productos')
        .update({cantidad: cantidad })
        .eq('id_producto', id)
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

  async updateProductPrice(id: number, precio: number) {
    try {
      this._state.update((state) => ({
        ...state,
        error: false,
        errorMessage: "",
        loading: true
      }));

      await this._supabaseClient
        .from('productos')
        .update({precio: precio })
        .eq('id_producto', id)
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

  async getPhysicalBooks(): Promise<Book[]> {
    try {
      this._state.update((state) => ({
        data: [],
        error: false,
        errorMessage: "",

        loading: true,
      }));

      const { data } = await this._supabaseClient
        .from('productos')
        .select('id_producto, nombre, precio, cantidad, proveedores!inner(nombre, id_proveedor)')
        .eq('digital', false)
        .returns<Book[]>()
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

  public round(number: number) {
    return (math.round((number)*100)/ 100).toFixed(2)
  }

  public getProvider(book: Book): string {
    return Object.values(book.proveedores).shift() || "";
  }

  public getIDProvider(book: Book): string {
    return Object.values(book.proveedores).pop() || "";
  }

  public changeToDigital(): void {
    this._stateBook.update(() => ({
      digital: true,
    }));
  }

  public reset(): void {
    this._stateBook.update(() => ({
      digital: false,
    }));
  }

}
