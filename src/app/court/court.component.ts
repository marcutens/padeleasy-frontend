import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { Court } from '../_models/Court'
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.username = this.authService.getUser();
      if (this.username) {
        this.authService.getUserProfile(this.username).subscribe({
          next: (response) => {
            this.ciudadUsuario = response.city;
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
          this.pistas = data;
        },
        error: (error) => {
          console.error('Error al obtener las pistas:', error);
        }
      });
  }

}
