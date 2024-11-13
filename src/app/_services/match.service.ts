import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../_models/Match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private baseUrl = 'http://localhost:8080/api/matches';
  constructor(private http: HttpClient) {}

  // Crear un partido
  createMatch(match: Match): Observable<Match> {
    console.log("Voy a llamar al backend");
    return this.http.post<Match>(this.baseUrl, match);
  }

  // Obtener todos los partidos
  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.baseUrl}/all`);
  }

  // Obtener un partido por su ID
  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.baseUrl}/${id}`);
  }

  getMatchesByUserId(id: number): Observable<Match[]> {
    return this.http.get<Match[]>(this.baseUrl+"?userId="+id);
  }

  // Actualizar un partido
  updateMatch(id: number, match: Match): Observable<Match> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Match>(`${this.baseUrl}/update/${id}`, match, { headers });
  }

  joinMatch(idMatch: number | undefined, usuario: any): Observable<any> {
    const body = { idMatch, usuario };
    return this.http.post<any>(`${this.baseUrl}/joinMatch`, body);
  }

  leaveMatch(idMatch: number | undefined, usuario: any): Observable<any> {
    const body = { idMatch, usuario };
    return this.http.post<any>(`${this.baseUrl}/leaveMatch`, body);
  }

  // Eliminar un partido
  deleteMatch(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  searchMatches(query: string): Observable<any> {
    const encodedQuery = encodeURIComponent(query);
    console.log(encodedQuery);
    return this.http.get<any[]>(`${this.baseUrl}/search/${encodedQuery}`);
  }
}
