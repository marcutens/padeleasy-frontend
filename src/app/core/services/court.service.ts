import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserve } from '../../_models/Reserve';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourtService {

  private apiUrl = 'http://localhost:8080/api/reserves';

  constructor(private http: HttpClient) {}

  reservarPista(reserva: Reserve): Observable<any> {
    return this.http.post<Reserve>(this.apiUrl, reserva);
  }
}
