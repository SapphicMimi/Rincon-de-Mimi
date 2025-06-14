import { Component } from '@angular/core';
import { SessionService } from '../../../shared/services/session.service';
import { User } from '../../../shared/interfaces/user';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PurchaseService } from '../../../purchase/services/purchase.service';
import { LoginUserService } from '../../../auth/services/login-user.service';
import { SuscriptionService } from '../../services/suscription.service';

@Component({
  selector: 'nav-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navBar.component.html',
})

export class NavBarComponent {
  constructor(
    public sessionService: SessionService,
    public suscriptionService: SuscriptionService
  ) {}

  public admin: boolean = false;
  public suscription: boolean = this.suscriptionService.checkSuscription();

  public getCredentials(): string | boolean {
    const json: string | null = sessionStorage.getItem('session');

    if(json) {
      const user: User[] = JSON.parse(json);
      const name = user.map(({nombre}) => nombre).toString();

      return this.titleCaseWord(name);
    } else {
      return false
    }
  }

  public titleCaseWord(word: string) {
    if(!word) {
      return word;
    }

    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }

  ngOnInit() {
  }
}
