import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Court } from '../_models/Court';
import { HttpClient } from '@angular/common/http';
import { SetCourt } from '../_models/SetCourts';

@Injectable({
  providedIn: 'root'
})
export class SetCourtService {


  private apiUrl = 'http://localhost:8080/api/set-court';

  constructor(private http: HttpClient) {}

  getMisConjuntosdePistas(username: string | null): Observable<SetCourt[]> {
    return this.http.get<SetCourt[]>(`${this.apiUrl}/listAllMySetCourts?username=${username}`);
  }

  getMisConjuntosdePistasPorId(id: string | null): Observable<SetCourt> {
    return this.http.get<SetCourt>(`${this.apiUrl}/id/${id}`);
  }

  deletePista(setcourtId: string){
    return this.http.delete<void>(`${this.apiUrl}/delete/${setcourtId}`);
  }


  getConjuntosPistasPorCiudad(username: string | null): Observable<SetCourt[]> {
    console.log("El usuario es ", username);
    return this.http.get<SetCourt[]>(`${this.apiUrl}/${username}`);
  }

  searchCourts(query: string): Observable<any> {
    const encodedQuery = encodeURIComponent(query);
    return this.http.get<any[]>(`${this.apiUrl}/search/${encodedQuery}`);
  }

  
}

