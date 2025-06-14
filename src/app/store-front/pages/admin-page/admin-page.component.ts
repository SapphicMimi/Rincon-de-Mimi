import { Component } from '@angular/core';
import { Book } from '../../../shared/interfaces/book';
import { BookService } from '../../../books/service/book.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../auth/services/validators.service';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../shared/services/session.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'admin-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-page.component.html',
})

export class AdminPageComponent {

  constructor(
    public bookService: BookService,
    public validators: ValidatorsService,
    public sessionService: SessionService,
    public adminService: AdminService
  ) {}

  public book: string = ""

  public physicalBooks: Book[] = []
  public allBooks: Book[] = []

  public boolUpdate: boolean = false;
  public boolPrice: boolean = false;

  public updateQuantityForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    actualQuantity: new FormControl(''),
    quantity: new FormControl('', [Validators.required, Validators.minLength(1), Validators.min(1)])
  })

  public updatePriceForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.minLength(1), Validators.min(1)])
  })

  public async getPhysicalBooks(): Promise<void> {
    this.physicalBooks = await this.bookService.getPhysicalBooks();
  }

  public async getAllBooks(): Promise<void> {
    this.allBooks = await this.bookService.getAllBooks();
  }

  public showFormQuantity(id: number, quantity: number, name: string) {
    this.boolUpdate = true;

    this.book = name;

    this.updateQuantityForm.setValue({
      quantity: 0,
      id: id,
      actualQuantity: quantity,
    })
  }

  public showFormPrice(id: number, quantity: number, name: string) {
    this.boolPrice = true;

    this.book = name;

    this.updatePriceForm.setValue({
      price: 0,
      id: id,
    })
  }

  public async onSubmitUpdate(): Promise<void> {
    if(this.updateQuantityForm.invalid) {
      this.updateQuantityForm.markAllAsTouched();
      return;
    }

    await this.bookService.updateProduct(+this.updateQuantityForm.value.id, +(this.updateQuantityForm.value.actualQuantity + this.updateQuantityForm.value.quantity));
    await this.adminService.newOrderAdmin({
      id_admin: this.sessionService.getIDAdmin(),
      id_prod: +this.updateQuantityForm.value.id,
      quantity: this.updateQuantityForm.value.quantity
    })

    this.updateQuantityForm.reset();

    await this.getPhysicalBooks();
  }

  public async onSubmitPrice(): Promise<void> {
    if(this.updatePriceForm.invalid) {
      this.updatePriceForm.markAllAsTouched();
      return;
    }

    await this.bookService.updateProductPrice(+this.updatePriceForm.value.id, +this.updatePriceForm.value.price);

    this.updateQuantityForm.reset();

    await this.getAllBooks();
  }

  ngOnInit() {
    this.getPhysicalBooks();
    this.getAllBooks()
  }
}
