import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '../../../shared/interfaces/book';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'new-books',
  imports: [RouterModule],
  templateUrl: './new-books.component.html',
})

export class NewBooksComponent {
  constructor(
    public bookService: BookService
  ) {}

  public books: Book[] = []
  public newOrderBooks: Book[] = []
  public quantityOfBook: number = 5;

  public async getData(): Promise<void> {
    this.books = await this.bookService.getAllBooks();
  }

  public getNewOrder(): void {
    this.books.sort((a,b) => a.id_producto - b.id_producto)

    for (let index = 0; index < this.quantityOfBook; index++) {
      this.newOrderBooks[index] = this.books.pop()!
    }
  }

  public async callData() {
    await this.getData();
    this.getNewOrder();
  }

  ngOnInit() {
    this.callData();
  }
}
