import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SessionService } from '../../../shared/services/session.service';
import { BookService } from '../../../books/service/book.service';

@Component({
  selector: 'app-order-page',
  imports: [],
  templateUrl: './order-page.component.html',
})

export class OrderPageComponent {
  constructor(
    public orderService: OrderService,
    public sessionService: SessionService,
    public bookService: BookService
  ) {}

  public call():void {
    if(this.sessionService.getIDUser()) {
      this.orderService.callData(this.sessionService.getIDUser()!);
    }
  }

  ngOnInit() {
    this.call();
  }
}
