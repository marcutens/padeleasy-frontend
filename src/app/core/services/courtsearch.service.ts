import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourtsearchService {
  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  // Método para actualizar los resultados de la búsqueda
  setSearchResults(results: any[]): void {
    this.searchResultsSubject.next(results);
  }
}
