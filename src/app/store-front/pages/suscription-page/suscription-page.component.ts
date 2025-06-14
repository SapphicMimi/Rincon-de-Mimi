import { Component } from '@angular/core';
import { BookService } from '../../../books/service/book.service';
import { Book } from '../../../shared/interfaces/book';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { SuscriptionService } from '../../services/suscription.service';

@Component({
  selector: 'suscription-page',
  imports: [RouterModule],
  templateUrl: './suscription-page.component.html',
})

export class SuscriptionPageComponent {

  constructor(
    public bookService: BookService,
    public sessionService: SessionService,
    public suscriptionService: SuscriptionService
  ) {}

  public books: Book[] = []
  public suscription: Book[] = []

  public async getMonthlyBooks(): Promise<void> {
    this.books = await this.bookService.getMonthlyBooks();
  }

  public async getSuscription(): Promise<void> {
    this.suscription = await this.bookService.getSuscription();
  }

  public async getAllData(): Promise<void> {
    this.getMonthlyBooks();
    this.getSuscription();
  }

  public getPrice(suscription: Book[]): number {
    return suscription.map(({precio}: Book) => precio).shift()!;
  }

  ngOnInit() {
    this.getAllData();
  }
}
