import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../_models/Role';
import { User } from '../../../_models/User';
import { Court } from '../../../_models/Court';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendURL = 'http://localhost:8080/api';



  private LOGIN_URL = this.backendURL + '/auth/login';
  private REGISTER_URL = this.backendURL + '/auth/register';
  private USER_PROFILE_URL = this.backendURL + '/user';
  private ROLES_URL = this.backendURL + '/auth/roles';
  private COURTS_URL =  this.backendURL + '/court';
  private LIST_COURT_URL = this.backendURL + '/court/list-court';
  private tokenKey = 'authToken';
  private userKey = 'authUser';
  private userNameSubject = new BehaviorSubject<string | null>(null);
  private userRoles: Role[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    console.log("Holaa entre en la función del login. ", username);
    return this.httpClient.post<any>(`${this.LOGIN_URL}`, { username, password }, { withCredentials: true }).pipe(
      tap(response => {
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
          this.setUser(username);
          this.setUserName(username);
          this.saveUserRoles(response.roles);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        if (error.status === 0) {
          console.error('Network error - server unreachable');
        } else if (error.status >= 400 && error.status < 500) {
          console.error('Client-side error:', error.error);
        } else if (error.status >= 500) {
          console.error('Server-side error:', error.error);
        }
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(this.REGISTER_URL, user).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(user.username);
      }),
      catchError(error => {
        console.error('Register failed', error);
        return throwError(() => new Error('Register failed'));
      })
    );
  }

  getUserProfile(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.USER_PROFILE_URL}/${username}`);
  }

  getUserRoles(): Role[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  private saveUserRoles(roles: Role[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  hasRole(roleName: Role): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.some(role => 
      {
        role.name === roleName.name
        return role.name === roleName.name;
      });
  }

  private setToken(token: string): void{
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      console.error('Attempted to set empty token');
    }
  }

  private getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      console.error('Token not found in localStorage');
    }
    return token;
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log(token);
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return decoded.userId || null;
    }
    return null;
  }

  private setUser(user: string): void {
    localStorage.setItem(this.userKey, user);
  }

  getUser(): string | null {
    return localStorage.getItem(this.userKey);
  }

  isAuthenticated(): boolean {

    const token = this.getToken();
    
    if(!token){
      console.error('No token found');
      return false;
    }


    try {
      const payload: any = jwtDecode(token); // Decodifica el token

      const exp = payload.exp * 1000; // Expiración en milisegundos

      // Verifica si el token ha expirado
      const isTokenValid = Date.now() < exp;

      return isTokenValid;

    } catch (error) {
      console.error('Token validation error', error);
      return false;
    }
  }


  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  setUserName(username: string): void {
    this.userNameSubject.next(username);
  }

  getUserName(): Observable<string | null> {
    return this.userNameSubject.asObservable();
  }

  getPistasPorCiudad(username: string | null): Observable<Court[]> {
    return this.httpClient.get<Court[]>(`${this.LIST_COURT_URL}/${username}`);
  }

  getTodasPistas() {
    return this.httpClient.get<Court[]>(`${this.LIST_COURT_URL}/all`);
  }

  deletePista(courtId: string){
    return this.httpClient.delete<void>(`${this.LIST_COURT_URL}/delete/${courtId}`);
  }

  searchCourts(query: string): Observable<any> {
    const encodedQuery = encodeURIComponent(query);
    return this.httpClient.get<any[]>(`${this.LIST_COURT_URL}/search/${encodedQuery}`);
  }

}
