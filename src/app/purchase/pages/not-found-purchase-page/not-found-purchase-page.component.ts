import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found-purchase-page',
  imports: [],
  templateUrl: './not-found-purchase-page.component.html',
})

export class NotFoundPurchasePageComponent {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.router.navigateByUrl("")
  }
}
