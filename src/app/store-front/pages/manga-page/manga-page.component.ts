import { Component, inject } from '@angular/core';
import { BookCardComponent } from "../../../books/components/book-card/book-card.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'manga-page',
  imports: [BookCardComponent],
  templateUrl: './manga-page.component.html',
})

export class MangaPageComponent {

  constructor() {}

}
