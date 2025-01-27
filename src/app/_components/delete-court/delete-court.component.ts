import { Component } from '@angular/core';
import { Court } from '../../_models/Court';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-court',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-court.component.html',
  styleUrl: './delete-court.component.scss'
})
export class DeleteCourtComponent {
  pistas: Court[] = [];
  pistaSeleccionada: string | null = null;
  message: string | null = null;

  constructor(private pistaService: AuthService) {}

  ngOnInit(): void {
    this.loadPistas();
  }

  // Cargar las pistas disponibles desde el servicio
  loadPistas(): void {
    this.pistaService.getTodasPistas().subscribe({
      next: (data) => {
        this.pistas = data;
        console.log(this.pistas);
      },
      error: (err) => {
        console.error('Error al cargar las pistas', err);
      }
    });
  }

  // Manejar la eliminación de una pista
  onDelete(): void {
    if (this.pistaSeleccionada) {
      this.pistaService.deletePista(this.pistaSeleccionada).subscribe({
        next: () => {
          this.message = 'Pista eliminada correctamente';
          this.loadPistas(); // Recargar la lista de pistas
        },
        error: (error) => {
          this.message = 'Error al eliminar la pista';
          console.error('Error al eliminar la pista', error);
        }
      });
    }
  }
}
