import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';

@Component({
  selector: 'footer-component',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
})

export class FooterComponent {

  constructor(
    public sessionService: SessionService,
  ) {}
}
