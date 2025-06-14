import { inject } from '@angular/core';
import { Route, Router, UrlSegment, type CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notAuthenticatedGuard: CanMatchFn = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(sessionStorage.getItem("session") != null) {
    if(localStorage.getItem('token') == authService.generateHash()) {
      router.navigateByUrl("");
      return false;
    }
  }

  return true;
}
