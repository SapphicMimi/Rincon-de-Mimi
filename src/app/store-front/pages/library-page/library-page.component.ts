import { Component } from '@angular/core';
import { LibraryService } from '../../services/library.service';
import { ReducedManga } from '../../../shared/interfaces/order';
import { Book } from '../../../shared/interfaces/book';
import { BookService } from '../../../books/service/book.service';
import { SessionService } from '../../../shared/services/session.service';
import { SuscriptionService } from '../../services/suscription.service';
import { OrderLibrary } from '../../../shared/interfaces/library';
import { RouterModule } from '@angular/router';
import { ChapterParamsService } from '../../../shared/services/chapterParams.service';

@Component({
  selector: 'app-library-page',
  imports: [RouterModule],
  templateUrl: './library-page.component.html',
})

export class LibraryPageComponent {

  constructor(
    public libraryService: LibraryService,
    public bookService: BookService,
    public sessionService: SessionService,
    public suscriptionService: SuscriptionService,
    public chapterParamsService: ChapterParamsService
  ) {}

  public ready: boolean = false;

  public orders: OrderLibrary[] = []
  public monthlyBooks: Book[] = []
  public filteredOrders: OrderLibrary[] = []

  public userBooks: ReducedManga[] = []
  public listMonthlyBooks: ReducedManga[] = []

  public removeDuplicates(books: ReducedManga[]) {
    const uniqueBooks: ReducedManga[] = Array.from(new Set(books.map(a => a.nombre)))
      .map(nombre => {
        return books.find(a => a.nombre === nombre)!
      })

    return uniqueBooks;
  }

  public removePhysicalEditions(orders: OrderLibrary[], filterOrders: OrderLibrary[]): void {
    for (let index = 0; index < orders.length; index++) {
      if(orders[index].digital) {
        filterOrders.push(orders[index]);
      }
    }
  }

  public getBooks(books: ReducedManga[], orders: OrderLibrary[]): void {
    for (let index = 0; index < orders.length; index++) {
      const value: ReducedManga = {
        nombre: orders[index].productos.nombre,
        id_producto: +orders[index].productos.id_producto
      }

      books.push(value);
    }
  }

  public getArrayMonthlyBooks(books: Book[], monthlyBooks: ReducedManga[]) {
    for (let index = 0; index < books.length; index++) {
      const value: ReducedManga = {
        nombre: books[index].nombre,
        id_producto: +books[index].id_producto
      }

      monthlyBooks.push(value);
    }
  }

  public checkUserBooks(books: ReducedManga[], monthlyBook: ReducedManga[]) {
    for (let index = 0; index < books.length; index++) {

      if(books[index].id_producto == 8) {

        books.splice(books.findIndex(a => a.id_producto === 8) , 1);

        if(!this.suscriptionService.checkSuscription()) {
          return;
        }

        for (let index = 0; index < monthlyBook.length; index++) {
          books.push(monthlyBook[index])
        }
      }
    }
  }

  /*
    public checkUserBooks(books: string[], monthlyBook: string[]) {
      for (let index = 0; index < books.length; index++) {
        if(books[index] == "Suscripción - Rincon+") {
          books = books.filter((book) => book != "Suscripción - Rincon+");

          if(!this.suscriptionService.checkSuscription()) {
            return books;
          }

          for (let index = 0; index < monthlyBook.length; index++) {
            books.push(monthlyBook[index])
          }

          return books;
        }
      }

      return books;
    }
  */

  public async getOrders(): Promise<void> {
    if(this.sessionService.getAdmin()) {
      this.userBooks = await this.bookService.getMonthlyBooks();

      this.ready = true;

      return
    }

    this.orders = await this.libraryService.getOrders(this.sessionService.getIDUser());
    this.monthlyBooks = await this.bookService.getMonthlyBooks();

    this.removePhysicalEditions(this.orders, this.filteredOrders);

    this.getBooks(this.userBooks, this.filteredOrders);
    this.getArrayMonthlyBooks(this.monthlyBooks, this.listMonthlyBooks);

    this.userBooks = this.removeDuplicates(this.userBooks)

    this.checkUserBooks(this.userBooks, this.listMonthlyBooks)

    this.userBooks = this.removeDuplicates(this.userBooks)

    this.ready = true;
  }

  ngOnInit() {


    this.getOrders();
  }
}
