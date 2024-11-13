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

  deletePista(setcourtId: string){
    return this.http.delete<void>(`${this.apiUrl}/delete/${setcourtId}`);
  }

  
}

