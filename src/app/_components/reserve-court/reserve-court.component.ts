import { Component, OnInit } from '@angular/core';
import { Court } from '../../_models/Court';
import { AuthService } from '../../core/services/auth/auth.service';
import { Reserve } from '../../_models/Reserve';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReserveService } from '../../_services/reserve.service';
import { SetCourt } from '../../_models/SetCourts';

@Component({
  selector: 'app-reserve-court',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve-court.component.html',
  styleUrl: './reserve-court.component.scss'
})
export class ReserveCourtComponent implements OnInit {
  pistas: SetCourt[] = [];
  ciudadUsuario: string = '';
  selectedPista: SetCourt | null = null;
  reservaFecha: string = '';
  reservaHora: string = '';
  username: string | null = '';
  userId: number = 0;

  constructor(private reserveService: ReserveService, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUser();
    if (this.username) {
      this.authService.getUserProfile(this.username).subscribe({
        next: (response) => {
          this.userId = response.id
          this.ciudadUsuario = response.city;
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
    this.authService.getPistasPorCiudad(this.username).subscribe({
      next: (data: Court[]) => {
        this.pistas = data.map(court => court.setCourt).filter(setCourt => setCourt !== undefined) as SetCourt[];
      },
      error: (error) => {
        console.error('Error al obtener las pistas:', error);
      }
    });
  }

  seleccionarPista(pista: SetCourt): void {
    this.selectedPista = pista;
    console.log("He seleccionado la pista: ", this.selectedPista);
  }

  reservarPista(): void {
    if (this.selectedPista && this.reservaFecha && this.reservaHora) {
      const nuevaReserva: Reserve = {
        id: 0,
        courtId: this.selectedPista.id,
        userId: this.userId,
        date: this.reservaFecha,
        duration: this.reservaHora,
        status: 'pendiente'
      };

      this.reserveService.reservarPista(nuevaReserva).subscribe({
        next: () => {
          alert('Reserva realizada con éxito');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al reservar la pista', err);
          alert('No se pudo realizar la reserva. Intenta de nuevo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

  resetForm(): void {
    this.selectedPista = null;
    this.reservaFecha = '';
    this.reservaHora = '';
  }
}
