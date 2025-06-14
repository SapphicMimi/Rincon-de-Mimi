import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/user';
import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { SessionService } from '../../../shared/services/session.service';
import { Admin } from '../../../shared/interfaces/admin';
import { LoginUserService } from '../../services/login-user.service';
import { LoginAdminService } from '../../services/login-admin.service';
import { RouterModule } from '@angular/router';
import { SuscriptionService } from '../../../store-front/services/suscription.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login-page.component.html',
})

export class LoginPageComponent {

  constructor(
    public validators: ValidatorsService,
    private authService: AuthService,
    private router: Router,
    private session: SessionService,
    public loginUser: LoginUserService,
    public loginAdmin: LoginAdminService,
    public suscriptionService: SuscriptionService,
    public sessionService: SessionService
  ) {}

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  // Booleans
  public admin: boolean = false;
  public bool: boolean = false;
  public success: boolean = false;

  private userData: User[] = [];
  private adminData: Admin[] = [];

  public async onSubmit(): Promise<void> {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    await this.getData();

    this.login();

  }

  private async getData(): Promise<void> {
    this.bool = false;

    this.userData = await this.loginUser.getUser(this.loginForm.value.email);

    if(this.userData.length == 0) {
      this.adminData = await this.loginAdmin.getAdmin(this.loginForm.value.email);
      this.admin = true

      if(this.adminData.length == 0) {
        this.bool = true;
        this.admin = false;

        return
      }
    }
  }

  private async login() {
    if(this.admin) {
      if(this.authService.compareBcrypt(this.loginForm.value.pass, this.adminData.map(({pass}) => pass).toString())) {
        this.success = true;

        this.session.createSessionAdmin(this.adminData);

        this.router.navigate([""]);
      } else {
        this.bool = true;
      }
    } else {
      if(this.authService.compareBcrypt(this.loginForm.value.pass, this.userData.map(({pass}) => pass).toString())) {
        this.success = true;

        if(this.suscriptionService.updateUserSuscription(this.userData, this.userData.map(({id_usuario}) => id_usuario).shift() || 0)) {
          this.sessionService.updateSession(this.userData, null);
          this.sessionService.endedSuscription();
        } else {
          await this.session.createSession(this.userData);
        }

        this.router.navigate([""]);
      } else {
        this.bool = true;
      }
    }
  }

  ngOnInit() {
  }
}
