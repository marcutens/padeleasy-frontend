import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Court } from '../../_models/Court';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { MatchService } from '../../_services/match.service';
import { Match } from '../../_models/Match';
import { SetCourt } from '../../_models/SetCourts';
import { SetCourtService } from '../../_services/setcourt.service';

@Component({
  selector: 'app-global-search-result',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './global-search-result.component.scss',
  template: `
    <h2>Resultados de la búsqueda: "{{ query }}"</h2>
    <div *ngIf="resultsCourts.length>0">
      <h3>Pistas</h3>
      <ul>
        <li *ngFor="let result of resultsCourts"> Nombre Pista: {{ result.nombre }} Ciudad de la pista: {{ result.ciudad }} </li>
      </ul>
    </div>
    <div *ngIf="resultsUsers.length>0">
      <h3>Usuarios</h3>
      <ul>
        <li *ngFor="let result of resultsUsers"> Nombre User: {{ result.username }}</li>
      </ul>
    </div>
    <div *ngIf="resultMatches.length>0">
      <h3>Partidos</h3>
      <ul>
        <li *ngFor="let result of resultMatches"> <strong>Fecha</strong>: {{ result.fecha }}  <strong>Hora</strong>: {{ result.hora }}  <strong>Pista</strong>: {{ result.pista.setCourtName }} </li>
      </ul>
    </div>
  `
})
export class GlobalSearchResultComponent {
  query: string = '';
  resultsCourts: SetCourt[] = [];
  resultsUsers: User[] = [];
  resultMatches: Match[] = [];


  constructor(private route: ActivatedRoute, 
              private authService: AuthService, 
              private userService: UserService,
              private setCourtService: SetCourtService, 
              private matchService: MatchService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      this.performSearch();
    });
  }

  performSearch() {
    if (this.query) {
      this.setCourtService.searchCourts(this.query).subscribe({
        next: (data: SetCourt[]) => {
          this.resultsCourts = data;
        },
        error: (err) => {
          console.error('Error en la búsqueda', err);
        }
      })
      this.userService.searchUsers(this.query).subscribe({
        next: (data: User[]) => {
          this.resultsUsers = data;
        },
        error: (err) => {
          console.error('Error en la búsqueda', err);
        } 
      })
      this.matchService.searchMatches(this.query).subscribe({
        next: (data: Match[]) => {
          this.resultMatches = data;
        },
        error: (err) => {
          console.error('Error en la búsqueda', err);
        } 
      })
      //Usuarios
      //Partidos
      //Reservas
    }
  }

}
