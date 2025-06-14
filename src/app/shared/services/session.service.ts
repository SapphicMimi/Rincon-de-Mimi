import { computed, Injectable, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../interfaces/user';
import { Admin } from '../interfaces/admin';
import { LoginUserService } from '../../auth/services/login-user.service';
import { DataStateSuscription } from '../interfaces/suscription';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private authService: AuthService,
    public loginUserService: LoginUserService,
    public router: Router
  ) {}

  private _state = signal<DataStateSuscription>({
    suscription: false
  })

  // Datos del Signal
  public suscription = computed(() => this._state().suscription);

  public createSession(user: User[]) {
    sessionStorage.setItem('session', JSON.stringify(user));
    localStorage.setItem('token', this.authService.generateHash());
  }

  public createSessionAdmin(admin: Admin[]) {

    const newAdmin = Object.entries(admin).map(([name, value]) => ({...value, _admin: true}))

    sessionStorage.setItem('session', JSON.stringify(newAdmin));
    localStorage.setItem('token', this.authService.generateHash());
  }

  public checkSession(): boolean {
    if(sessionStorage.getItem("session") != null) {
      if(localStorage.getItem('token') == this.authService.generateHash()) {
        return true;
      }
    }

    return false;
  }

  public logout(): void {
    if(this.checkSession()) {
      sessionStorage.removeItem("session");
      localStorage.removeItem("token");

      // this.router.navigateByUrl("");
    }
  }

  public logoutWithRedirect(): void {
    this.logout();

    this.router.navigateByUrl("");
  }

  public getAdmin(): boolean {
    if(!this.checkSession()) {
      return false;
    }

    const boolArray = JSON.parse(sessionStorage.getItem("session")!).map(({_admin }: any) => _admin);

    return boolArray.shift() || false;
  }

  public getIDUser(): number {
    if(!this.checkSession()) {
      return 0;
    }

    const user: User[] = JSON.parse(sessionStorage.getItem("session") || "");

    return user.map(({id_usuario}) => id_usuario).shift()!;
  }

  public getIDAdmin(): number {
    if(!this.checkSession()) {
      return 0;
    }

    const user: Admin[] = JSON.parse(sessionStorage.getItem("session") || "");

    return user.map(({id_admin}) => id_admin).shift()!;
  }

  public getUserSuscription(): string {
    const user: User[] = JSON.parse(sessionStorage.getItem("session") || "");

    return user.map(({suscrito}) => suscrito).shift() || "";
  }

  public async updateSession(user: User[], date: string | null): Promise<void> {
    const newUser: User[] = Object.entries(user).map(([name, value]) => ({...value, suscrito: date}))

    this.createSession(newUser);
  }

  public endedSuscription(): void {
    this._state.update(() => ({
        suscription: true,
      }));
    setTimeout(() => {
      this._state.update(() => ({
        suscription: false,
      }));
    }, 5000);
  }
}
