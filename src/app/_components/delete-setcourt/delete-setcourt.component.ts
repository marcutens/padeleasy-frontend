import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SetCourt } from '../../_models/SetCourts';
import { SetCourtService } from '../../_services/setcourt.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-delete-court',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-setcourt.component.html',
  styleUrl: './delete-setcourt.component.scss'
})


export class DeleteSetCourtComponent {
  pistas: SetCourt[] = [];
  pistaSeleccionada: string | null = null;
  message: string | null = null;
  username: string | null = '';

  constructor(private authService: AuthService, private setCourtService: SetCourtService) {}

  ngOnInit(): void {
    this.username = this.authService.getUser();
    if (this.username) {
      this.loadConjuntoPistas();
    }
  }

  // Cargar las pistas disponibles desde el servicio
  loadConjuntoPistas(): void {
    this.setCourtService.getMisConjuntosdePistas(this.username).subscribe({
      next: (data) => {
        this.pistas = data;
      },
      error: (err) => {
        console.error('Error al cargar las pistas', err);
      }
    });
  }

  // Manejar la eliminación de una pista
  onDelete(): void {
    if (this.pistaSeleccionada) {
      this.setCourtService.deletePista(this.pistaSeleccionada).subscribe({
        next: () => {
          this.message = 'Pista eliminada correctamente';
          this.loadConjuntoPistas();
        },
        error: (error) => {
          this.message = 'Error al eliminar la pista';
          console.error('Error al eliminar la pista', error);
        }
      });
    }
  }
}
