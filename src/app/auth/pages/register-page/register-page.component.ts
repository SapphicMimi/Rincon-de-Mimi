import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user';
import { CommonModule } from '@angular/common';
import { ValidatorsService } from '../../services/validators.service';
import { RegisterService } from '../../services/register.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent {

  constructor(
    private authService: AuthService,
    public validators: ValidatorsService,
    public registerService: RegisterService
  ) {}

  public users: User[] = [];

  public success: boolean = false;
  public bool: boolean = false;

  public registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  async getData(): Promise<void> {
    this.users = await this.registerService.getAllUser();
  }

  public checkEmail(email: string): boolean | null {
    const result = this.users.find(({correo}) => correo === email)

    if(result == undefined) {
      return false
    } else {
      return true
    }
  }

  private register(): void {
    if(this.checkEmail(this.registerForm.value.email)) {
      this.success = false
      this.bool = true;

      this.registerForm.markAllAsTouched();

      return;
    } else {
      this.bool = false
      this.success = true

      this.registerService.newUser({
        name: this.registerForm.value.name,
        surname: this.registerForm.value.surname,
        email: this.registerForm.value.email,
        pass: this.authService.encryptBcrypt(this.registerForm.value.pass)
      })
    }
  }

  public async onSubmit(): Promise<void> {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    await this.getData();

    this.register();

    this.registerForm.reset();
  }
}
