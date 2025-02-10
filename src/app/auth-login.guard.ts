import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authLoginGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  if (auth.currentUser) {
    return true;
  } else {
    const router = inject(Router);
    return router.parseUrl('/article');
  }
};
