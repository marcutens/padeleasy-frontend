import { Component } from '@angular/core';
import { SetCourt } from '../../_models/SetCourts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReserveService } from '../../_services/reserve.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { SetCourtService } from '../../_services/setcourt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve-list-set-court',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve-list-set-court.component.html',
  styleUrl: './reserve-list-set-court.component.scss'
})
export class ReserveListSetCourtComponent {

  pistas: SetCourt[] = [];
  ciudadUsuario: string = '';
  selectedSetPista: SetCourt | null = null;
  reservaFecha: string = '';
  reservaHora: string = '';
  reservaDuracion: number = 0;
  username: string | null = '';
  userId: number = 0;


  constructor(private reserveService: ReserveService, private router: Router, private authService: AuthService, private setCourtService: SetCourtService) {}

  ngOnInit(): void {
    this.username = this.authService.getUser();
    if (this.username) {
      this.authService.getUserProfile(this.username).subscribe({
        next: (response) => {
          this.userId = response.id
          this.ciudadUsuario = response.city
                                                                                                      
          console.log("La id y la ciudad del usuario son ", this.userId, this.ciudadUsuario);
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      });
    }
    this.obtenerPistas();
  }

  obtenerPistas(): void {
    console.log("Entro a la función de obtener las pistas");
    this.setCourtService.getConjuntosPistasPorCiudad(this.username).subscribe({
      next: (data: SetCourt[]) => {
        this.pistas = data;
      },
      error: (error) => {
        console.error('Error al obtener las pistas:', error);
      }
    });
  }

  seleccionarConjuntoPista(pista: SetCourt): void {
    this.selectedSetPista = pista;
    console.log("He seleccionado el conjunto de pista: ", this.selectedSetPista.id);
    this.goToReserveListSetCourt(this.selectedSetPista.id)
  }

  goToReserveListSetCourt(id: number): void {
    this.router.navigate(['/reserve-court', id]);
  }

}
