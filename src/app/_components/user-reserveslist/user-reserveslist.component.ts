import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { ReserveService } from '../../_services/reserve.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reserve } from '../../_models/Reserve';

@Component({
  selector: 'app-user-reserveslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-reserveslist.component.html',
  styleUrl: './user-reserveslist.component.scss'
})
export class UserReserveslistComponent {
  userReserves: Reserve[] = [];
  userId: number = 0;
  selectedReserveId: number = -1;
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  reserveToDelete: number = -1;


  constructor(
    private authService: AuthService,
    private reserveService: ReserveService,
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

  openDeleteModal(reserveId: number): void {
    console.log("ID de reserva para eliminar:", reserveId);
    this.reserveToDelete = reserveId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.reserveToDelete = -1;
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

  deleteReserve() {
    this.reserveService.deleteReserve(this.reserveToDelete).subscribe({
      next: () => {
        console.log('Reserva eliminada');
        this.closeDeleteModal();
        this.loadUserReservations();
      },
      error: (err) => {
        console.error('Error al eliminar la reserva', err);
      }
    });
  }
}
