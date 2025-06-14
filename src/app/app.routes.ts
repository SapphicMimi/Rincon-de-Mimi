import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { authenticatedGuard } from './purchase/guards/authenticated.guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.routes'),
    canMatch: [
      notAuthenticatedGuard
    ]
  },

  {
    path: 'purchase',
    loadChildren: ()=> import('./purchase/purchase.routes'),
    canMatch: [
      authenticatedGuard
    ]
  },

  {
    path: '',
    loadChildren: ()=> import('./store-front/store-front.routes')
  }


];
