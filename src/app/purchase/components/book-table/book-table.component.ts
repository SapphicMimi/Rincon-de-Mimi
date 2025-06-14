import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/interfaces/book';
import { BookService } from '../../../books/service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'book-table',
  imports: [],
  templateUrl: './book-table.component.html',
})

export class BookTableComponent {

  constructor(
    public bookService: BookService,
    public router: Router
  ) {}

  @Input() public id: string = "";
  public book: Book[] = [];

  public async getBookData(id: string): Promise<void> {
    this.book = await this.bookService.getBook(id);

    if(this.book.length == 0) {
      this.router.navigateByUrl("")
    }
  }

  ngOnInit() {
    this.getBookData(this.id);
  }
}
