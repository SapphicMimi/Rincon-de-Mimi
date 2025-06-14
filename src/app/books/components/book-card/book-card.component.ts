import { Component } from '@angular/core';
import { BookService } from '../../service/book.service';
import { Book } from '../../../shared/interfaces/book';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'book-card',
  imports: [RouterModule],
  templateUrl: './book-card.component.html',
})

export class BookCardComponent {

  constructor(
    public bookService: BookService
  ) {}

  public books: Book[] = []

  public async getData(): Promise<void> {
    this.books = await this.bookService.getAllBooks();
  }

  public async call() {
    await this.getData();
  }

  ngOnInit() {
    this.call();
  }
}
