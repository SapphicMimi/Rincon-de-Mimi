import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/navBar/navBar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'store-front-layout',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './store-front-layout.component.html',
})

export class StoreFrontLayoutComponent { }
