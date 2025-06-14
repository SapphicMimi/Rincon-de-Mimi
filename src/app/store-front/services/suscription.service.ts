import { computed, Injectable, signal } from '@angular/core';
import { DataStateSuscription } from '../../shared/interfaces/suscription';
import { SessionService } from '../../shared/services/session.service';
import { User } from '../../shared/interfaces/user';
import { PurchaseService } from '../../purchase/services/purchase.service';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {

  constructor(
    public sessionService: SessionService,
    public purchaseService: PurchaseService,

  ) {}

  public getDate(): string {
    const date = new Date();

    return `${date.getFullYear()}-${('0'+(date.getMonth()+1)).slice(-2)}-${date.getDate()}`;
  }

  public getDateSuscription(): string {
    const date = new Date();
    let newMonth: number;

    let day = date.getDate();
    let month = ('0'+(date.getMonth()+1+1)).slice(-2);
    let year = date.getFullYear();

    if(+month >= 13) {
      newMonth = +month - 12
      year++;

      return `${year}-${('0'+(newMonth)).slice(-2)}-${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  public compareDates(date1: string, date2: string): boolean {
    const nDate1 = new Date(date1);
    const nDate2 = new Date(date2);

    if(nDate1 >= nDate2) {
      return true
    }
    return false;
  }


  public checkSuscription(): boolean {
    if(!sessionStorage.getItem("session") ) {
      return false
    }

    const user: User[] = JSON.parse(sessionStorage.getItem("session")!);

    if (user.map(({suscrito}) => suscrito).shift()) {
      return true;
    } else {
      return false
    }


  }

  public checkSuscriptionLogin(user: User[]): boolean {
    if (user.map(({suscrito}) => suscrito).shift()) {
      return true;
    } else {
      return false
    }
  }

  public updateUserSuscription(user: User[], userID: number): boolean {
    if(!this.checkSuscriptionLogin(user)) {
      return false
    }

    if(!this.compareDates(user.map(({suscrito}) => suscrito).shift() || "" , this.getDate())) {
      this.purchaseService.updateSuscription(userID, null)

      return true;
    }
    return false;

  }
}
