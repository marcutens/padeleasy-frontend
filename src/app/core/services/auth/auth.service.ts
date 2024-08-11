import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../_models/Role';
import { UserRegisterObject } from '../../../_models/UserRegisterObject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private backendURL = 'http://localhost:8080/api';
  //LOGIN_URL = this.backendURL + '/auth/login';


  private LOGIN_URL = 'http://localhost:8080/api/auth';
  private REGISTER_URL = 'http://localhost:8080/api/auth/register';
  private USER_PROFILE_URL = 'http://localhost:8080/api/auth/user';
  private ROLES_URL = 'http://localhost:8080/api/auth/roles'
  private tokenKey = 'authToken';
  private userKey = 'authUser';
  private userNameSubject = new BehaviorSubject<string | null>(null);
  private userRoles: Role[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    console.log("Holaa entre en la función del login. ", username);
    return this.httpClient.post<any>(`${this.LOGIN_URL}/login`, { username, password }, { withCredentials: true }).pipe(
      tap(response => {
        console.log('Login response:', response); // Print the response
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
          this.setUser(username);
          this.setUserName(username);
          this.saveUserRoles(response.roles);
        } else {
          console.error('Token not found in response', response, response.accessToken);
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

  register(user: UserRegisterObject): Observable<any> {
    console.log(user);
    return this.httpClient.post<any>(this.REGISTER_URL, user).pipe(
      tap(response => {
        console.log("Esta es la respuesta del back-end: ", response);
        console.log("Y este es el token: ", response.token);
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

  private setUser(user: string): void {
    localStorage.setItem(this.userKey, user);
  }

  getUser(): string | null {
    return localStorage.getItem(this.userKey);
  }

  private saveUserRoles(roles: Role[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  isAuthenticated(): boolean {

    const token = this.getToken();
    
    if(!token){
      console.error('No token found');
      return false;
    }

    console.log("Token:", token);

    try {
      const payload: any = jwtDecode(token); // Decodifica el token
      console.log("Payload:", payload);

      const exp = payload.exp * 1000; // Expiración en milisegundos
      console.log("Token expiration:", exp);

      // Verifica si el token ha expirado
      const isTokenValid = Date.now() < exp;
      console.log("Is token valid?", isTokenValid);

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

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.ROLES_URL);
  }

}
