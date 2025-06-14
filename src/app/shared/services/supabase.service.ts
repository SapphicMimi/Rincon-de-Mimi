import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js/src';
import { environment } from '../../environments/environment';
import { Database } from '../interfaces/supabase';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  public supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient<Database>(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    )
  }

}
