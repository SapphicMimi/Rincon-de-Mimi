import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const UserAndAdminGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(sessionStorage.getItem("session") != null) {
    if(localStorage.getItem('token') == authService.generateHash()) {
      return true;
    }
  }

  router.navigateByUrl("");
  return false;
};
