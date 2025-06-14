import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { SessionService } from '../../shared/services/session.service';

export const authenticatedGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const sessionService = inject(SessionService);

  if(sessionStorage.getItem("session") != null) {
    if(localStorage.getItem('token') == authService.generateHash()) {
      if(!sessionService.getAdmin()) {
        return true;
      }
    }
  }

  router.navigateByUrl("");
  return false;
};
