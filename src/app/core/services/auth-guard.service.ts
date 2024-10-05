import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Role } from '../../_models/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const expectedRoles = route.data['roles'] as Role[];
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    
    const hasRole = expectedRoles.some(role => { 
      return this.authService.hasRole(role);
    });

    if (!hasRole) {
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
