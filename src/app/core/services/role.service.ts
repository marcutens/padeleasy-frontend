import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../_models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private backendURL = 'http://localhost:8080/api';

  private ROLES_URL = this.backendURL + '/auth/roles';


  constructor(private http: HttpClient) {}


  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.ROLES_URL);
  }
}
