import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendURL = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient, private router: Router) { }

  
  searchUsers(query: string): Observable<any> {
    const encodedQuery = encodeURIComponent(query);
    console.log(encodedQuery);
    return this.httpClient.get<any[]>(`${this.backendURL}/search/${encodedQuery}`);
  }
}
