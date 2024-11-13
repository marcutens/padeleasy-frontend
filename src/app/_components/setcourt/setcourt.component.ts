import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { SetCourtService } from '../../_services/setcourt.service';
import { SetCourt } from '../../_models/SetCourts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setcourt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './setcourt.component.html',
  styleUrl: './setcourt.component.scss'
})
export class SetcourtComponent {
  conjunto_pistas: SetCourt[] = [];
  ciudadUsuario: string = '';
  username: string | null = '';

  constructor(
    private authService: AuthService,
    private setcourtService: SetCourtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUser();
    if (this.username) {
      this.obtenerPistas(this.username);
    }
  }

  obtenerPistas(userName: string): void {
      this.setcourtService.getMisConjuntosdePistas(userName).subscribe({
        next: (data: SetCourt[]) => {
          console.log("Estas son las pistas: ", data);
          this.conjunto_pistas = data;
        },
        error: (error) => {
          console.log("Hola estoy en error");
          console.error('Error al obtener las pistas:', error);
        }
      });
  }

  editarPista(pistaId: number): void {
    console.log("Hola");
    this.router.navigate(['add-court/'+pistaId]);
  }

}
