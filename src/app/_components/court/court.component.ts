import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Court } from '../../_models/Court'
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourtService } from '../../_services/court.service';

@Component({
  selector: 'app-court',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './court.component.html',
  styleUrl: './court.component.scss'
})
export class CourtComponent implements OnInit{
  pistas: Court[] = [];
  ciudadUsuario: string = '';
  username: string | null = '';

  constructor(
    private authService: AuthService,
    private courtService: CourtService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.username = this.authService.getUser();
      if (this.username) {
        this.obtenerPistas(this.username);
      }
      
  }

  obtenerPistas(userName: string): void {
      this.courtService.getMisPistas(userName).subscribe({
        next: (data: Court[]) => {
          console.log("Estas son las pistas: ", data);
          this.pistas = data;
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
