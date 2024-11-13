import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Court } from '../_models/Court';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourtService {


  private apiUrl = 'http://localhost:8080/api/court';

  constructor(private http: HttpClient) {}

  addPista(pistaform: FormData): Observable<Court> {
    return this.http.post<Court>(`${this.apiUrl}/courts`, pistaform);
  }

  getPistasPorCiudadDelUser(username: string | null): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.apiUrl}/listAllCourtsByUserCity/${username}`);
  }

  getMisPistas(username: string): Observable<Court[]> {
    return this.http.get<Court[]>(`${this.apiUrl}/listAllMyCourts?username=${username}`);
  }
  
  getPista(pistaId: string) {
    return this.http.get<Court>(this.apiUrl+'?id='+pistaId);
  }
}

