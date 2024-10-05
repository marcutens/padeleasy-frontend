import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserve } from '../../_models/Reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  private apiUrl = 'http://localhost:8080/api/reserves';

  constructor(private http: HttpClient) {}

  getUserReserves(userId: number): Observable<Reserve[]> {
    return this.http.get<Reserve[]>(`${this.apiUrl}/user/${userId}`);
  }

  confirmReserve(reserveId: number): Observable<Reserve> {
    return this.http.put<Reserve>(`${this.apiUrl}/${reserveId}/confirm`, null);
  }
}
