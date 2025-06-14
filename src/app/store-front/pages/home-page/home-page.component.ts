import { Component } from '@angular/core';
import { BookService } from '../../../books/service/book.service';
import { SuscriptionCardComponent } from '../../components/suscription-card/suscription-card.component';
import { Router, RouterModule } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { NewBooksComponent } from '../../../books/components/new-books/new-books.component';

@Component({
  selector: 'app-home-page',
  imports: [SuscriptionCardComponent, RouterModule, NewBooksComponent],
  templateUrl: './home-page.component.html',
})

export class HomePageComponent {
  constructor(
    public bookService: BookService,
    public router: Router,
    public sessionService: SessionService
  ) {}
}
