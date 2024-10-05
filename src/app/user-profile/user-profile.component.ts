import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reserve } from '../_models/Reserve';
import { ReserveService } from '../core/services/reserve.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  userId: number = 0; 
  userReserves: Reserve[] = [];
  selectedReserveId: number = -1;
  isModalOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private reserveService: ReserveService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.authService.getUserProfile(username).subscribe({
        next: (response) => {
          console.log("Respuesta de busqueda de usuario en el perfil: ", response);
          this.user = response;
          this.userId = response.id;
          console.log("Guardo el id en el userId que es: ", this.userId);
          this.loadUserReservations();
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      }); 
    }
  }

  openConfirmationModal(reserveId: number): void {
    console.log("El id de la reserva es", reserveId);
    this.selectedReserveId = reserveId;
    console.log("El id de la reserva es", this.selectedReserveId);
    this.isModalOpen = true;
    console.log("Se muestra el pop up?", this.isModalOpen);
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedReserveId = -1;
  }


  loadUserReservations() {
    this.reserveService.getUserReserves(this.userId).subscribe((reserves) => {
      this.userReserves = reserves;
    });
  }

  confirmReserve(reserveId: number) {
    this.reserveService.confirmReserve(reserveId).subscribe({next: () => {
        console.log('Reserva confirmada');
        this.closeModal();
        this.loadUserReservations();
      },
      error: (err) => {
        console.error('Error al confirmar la reserva', err);
        console.log('No se pudo confirmar la reserva. Intenta de nuevo.');
      }
    });
  }

}
