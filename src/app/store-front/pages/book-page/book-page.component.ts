import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MangaService } from '../../services/manga.service';
import { Manga } from '@tutkli/jikan-ts';
import { Book } from '../../../shared/interfaces/book';
import { BookService } from '../../../books/service/book.service';
import { SessionService } from '../../../shared/services/session.service';
import { Order } from '../../../shared/interfaces/order';
import { OrderService } from '../../services/order.service';
import { Review } from '../../../shared/interfaces/reviews';

@Component({
  selector: 'app-book-page',
  imports: [RouterModule],
  templateUrl: './book-page.component.html',
})

export class BookPageComponent {

  public activatedRoute = inject(ActivatedRoute);

  constructor(
    public mangaService: MangaService,
    public bookService: BookService,
    public router: Router,
    public sessionService: SessionService,
    public orderService: OrderService
  ) {
    this.mangaService.getReviews(+this.api!).subscribe((response: Review) => {
      (this.reviews = response);
    });
  }

  public loaded: boolean = false;
  public purchased: boolean = false;

  public manga: Manga = {} as Manga;
  public mangaInfo: Book[] = []
  public orders: Order[] = []
  public reviews: Review = {} as Review;

  public forLoop = Array(4).fill("dummy");

  public bookId: string = this.activatedRoute.snapshot.params['id'];
  public api = this.activatedRoute.snapshot.queryParamMap.get('id_api');

  public async getData(): Promise<void> {
    if(this.api == null) {
      this.router.navigateByUrl("/")
    }

    this.orders = await this.orderService.getOrders(this.sessionService.getIDUser());
    this.manga = await this.mangaService.getManga(+this.api!);
    this.mangaInfo = await this.bookService.getBook(this.bookId);

    this.purchased = this.checkDigitalEdition(+this.bookId);

    this.loaded = true;
  }

  public checkDigitalEdition(id: number) {
    for (let index = 0; index < this.orders.length; index++) {
      if(this.orders[index].digital == true && +this.orders[index].productos.id_producto == id) {
        return true
      }
    }

    return false;
  }

  ngOnInit() {
    this.getData();
  }
}
