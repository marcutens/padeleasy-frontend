import { Component } from '@angular/core';
import { Match } from '../../_models/Match';
import { CommonModule } from '@angular/common';
import { MatchService } from '../../_services/match.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-matcheslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-matcheslist.component.html',
  styleUrl: './user-matcheslist.component.scss'
})
export class UserMatcheslistComponent {

  userMatches: Match[] = [];
  userId: number = 0;


  constructor(
    private authService: AuthService,
    private matchService: MatchService,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit(): void {
    const username = this.authService.getUser();
    if (username) {
      this.authService.getUserProfile(username).subscribe({
        next: (response) => {
          console.log("Respuesta de busqueda de usuario en el perfil: ", response);
          this.userId = response.id;
          console.log("Guardo el id en el userId que es: ", this.userId);
          this.loadUserMatches();
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      }); 
    }
  }

  loadUserMatches() {
    console.log("Aqui en loadMatches la id vale", this.userId);
    this.matchService.getMatchesByUserId(this.userId).subscribe({
        next: (matches: Match[]) => {
          console.log("Estos son los partidos: ", matches);
          this.userMatches = matches;
        },
        error: (err) => {
          console.error('Error al cargar los partidos', err);
        }
    });
  }

  getNombresJugadores(jugadores: any[]): string {
    return jugadores.map(jugador => jugador.username).join(', ');
  }

}
