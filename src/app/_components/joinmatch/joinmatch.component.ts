import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Match } from '../../_models/Match';
import { MatchService } from '../../_services/match.service';
import { User } from '../../_models/User';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-joinmatch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joinmatch.component.html',
  styleUrl: './joinmatch.component.scss'
})
export class JoinmatchComponent {
  partidosDisponibles: Match[] = [];
  user: any = {};

  constructor(private authService: AuthService, private matchService: MatchService) { }

  ngOnInit(): void {
    const username = this.authService.getUser();
    if (username) {
      this.authService.getUserProfile(username).subscribe({
        next: (response) => {
          console.log("Respuesta de busqueda de usuario en el perfil: ", response);
          this.user = response;
          this.cargarPartidosDisponibles();
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      }); 
    }
  }

  cargarPartidosDisponibles(): void {
    this.matchService.getAllMatches().subscribe((matches: Match[]) => {
      this.partidosDisponibles = matches;
      console.log("Las pistas son ", this.partidosDisponibles);
    });
  }

  getNombresJugadores(jugadores: User[]): string {
    return jugadores.map(jugador => jugador.username).join(', ');
  }

  unirseAlPartido(idMatch: number | undefined): void {
    this.matchService.joinMatch(idMatch, this.user).subscribe({
      next: (response) => {
        console.log('Te has unido al partido correctamente');
        this.cargarPartidosDisponibles();
      },
      error: (error) => {
        console.error('Error al unirse al partido:', error);
      }
    });
  }

  borrarseDelPartido(idMatch: number | undefined): void {
    this.matchService.leaveMatch(idMatch, this.user).subscribe({
      next: (response) => {
        console.log('Te has borrado al partido correctamente');
        this.cargarPartidosDisponibles();
      },
      error: (error) => {
        console.error('Error al unirse al partido:', error);
      }
    });
  }

}
