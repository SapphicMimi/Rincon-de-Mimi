import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../store-front/components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './auth-layout.component.html',
})

export class AuthLayoutComponent {

}
