import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookTableComponent } from '../../components/book-table/book-table.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidatorsService } from '../../../auth/services/validators.service';
import { PurchaseService } from '../../services/purchase.service';
import { userData } from '../../../shared/interfaces/purchase_user';
import { BookService } from '../../../books/service/book.service';
import { SessionService } from '../../../shared/services/session.service';
import { Book } from '../../../shared/interfaces/book';
import { SuscriptionService } from '../../../store-front/services/suscription.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'purchase-page',
  imports: [ReactiveFormsModule, CommonModule, BookTableComponent, RouterModule],
  templateUrl: './purchase-page.component.html',
})

export class PurchasePageComponent {
  public activatedRoute = inject(ActivatedRoute);

  constructor(
    public validators: ValidatorsService,
    public purchaseService: PurchaseService,
    public bookService: BookService,
    public sessionService: SessionService,
    public router: Router,
    public suscriptionService: SuscriptionService,
  ) {}

  public bool: boolean = false;

  public bookId: string = this.activatedRoute.snapshot.params['idBook'];
  public userData: userData[] = [];

  public book: Book[] = []

  public purchaseForm: FormGroup = new FormGroup({
    direccion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    codPostal: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ciudad: new FormControl('', [Validators.required, Validators.minLength(3)]),
    provincia: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nombreTarjeta: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numeroTarjeta: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    fechaTarjeta: new FormControl('', [Validators.required, Validators.minLength(5)]),
    numeroSeguridad: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
  })

  public async getBookInfo(): Promise<void> {
    this.book = await this.bookService.getBook(this.bookId);
  }

  public async getUserData(): Promise<void> {
    this.userData = [{
      direccion: this.purchaseForm.value.direccion,
      codPostal: this.purchaseForm.value.codPostal,
      ciudad: this.purchaseForm.value.ciudad,
      provincia: this.purchaseForm.value.provincia,
    }]
  }

  public checkQuantity(): boolean {
    if(this.book.map(({cantidad}) => cantidad).shift()! == 0) {
      return true
    } else {
      return false
    }
  }

  public async purchase(): Promise<void> {
    const digital: boolean = this.book.map(({digital}) => digital).shift()!;

    if(+this.bookId == 8) {
      await this.doPurchase(digital);
      const user: User[] = JSON.parse(sessionStorage.getItem("session") || "");

      this.purchaseService.updateSuscription(user.map(({id_usuario}) => id_usuario).shift()!, this.suscriptionService.getDateSuscription());

      this.sessionService.logout();
      this.sessionService.updateSession(user, this.suscriptionService.getDate());

      setTimeout(() => {
        this.checkUserSuscription();
      }, 3000);
    } else {
      if(digital && this.bookService.digital()) {
        await this.doPurchase(this.bookService.digital());
      } else {
        await this.doPurchase(this.bookService.digital());

        await this.bookService.updateProduct(+this.bookId, (this.book.map(({cantidad}) => cantidad).shift()!)-1);
      }
    }

    this.bool = true;
  }

  public async doPurchase(bool: boolean): Promise<void> {
    await this.purchaseService.newOrder({
      id: this.sessionService.getIDUser(),
      id_p: +this.bookId,
      fecha: this.suscriptionService.getDate(),
      datos: JSON.stringify(this.userData).toString(),
      digital: bool,
    });
  }

  public async onSubmit(): Promise<void> {
    this.bool = false;
    if(this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    await this.getUserData()
    await this.purchase();

    this.getBookInfo();
    this.purchaseForm.reset();
  }

  public checkUserSuscription() {
    if(+this.bookId == 8) {
      if(this.suscriptionService.checkSuscription()) {
        this.router.navigateByUrl("");
      }
    }
  }

  ngOnInit() {
    this.getBookInfo();

    this.checkUserSuscription();
  }
}
