import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Role } from '../../_models/Role';
import { RoleService } from './role.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleResolverService implements Resolve<Role[]>{

  constructor(private roleService: RoleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
    // Aquí obtienes los roles desde el backend
    return this.roleService.getRoles();
  }

}
