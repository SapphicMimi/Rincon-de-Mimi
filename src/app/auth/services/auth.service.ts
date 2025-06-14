import { Injectable } from '@angular/core';
import bcrypt from 'bcryptjs';
import { SupabaseService } from '../../shared/services/supabase.service';
import * as CryptoJS from "crypto-js";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  public encryptBcrypt(password: string): string {
    const salt = bcrypt.genSaltSync(12);

    return bcrypt.hashSync(password, salt)
  }

  public compareBcrypt(string: string, hash: string): boolean {
    return bcrypt.compareSync(string, hash);
  }

  public generateHash(): string {
    const hash = CryptoJS.HmacSHA256(environment.SUPABASE_URL, environment.SECRET_KEY);

    return CryptoJS.enc.Base64.stringify(hash);
  }

}
