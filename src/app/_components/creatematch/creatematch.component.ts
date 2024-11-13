import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Match } from '../../_models/Match';
import { CourtService } from '../../_services/court.service';
import { Court } from '../../_models/Court';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatchService } from '../../_services/match.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creatematch',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './creatematch.component.html',
  styleUrl: './creatematch.component.scss'
})
export class CreatematchComponent implements OnInit {
  partidoForm: FormGroup;
  courtsCloseToUser: Court[] = [];
  userId: number = 0;
  username: string | null = '';
  name: string = '';
  selectedPista: Court | undefined;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private courtService: CourtService,
    private authService: AuthService,
    private matchService: MatchService,
    private router: Router
  ) {
    this.partidoForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      pista: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.username = this.authService.getUser();

    if (this.username) {
      
      this.authService.getUserProfile(this.username).subscribe({
        next: (response: any) => {
          this.user = response
          console.log("El usuario es ", this.user);
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      });
    }
    
    this.obtenerPistas();
  }

  obtenerPistas(): void {
    this.courtService.getPistasPorCiudadDelUser(this.username).subscribe({
      next: (data: Court[]) => {
        this.courtsCloseToUser = data;
        console.log("Las pistas son ", this.courtsCloseToUser);
      },
      error: (error) => {
        console.error('Error al obtener las pistas:', error);
      }
    });
  }

  seleccionarPista(target: EventTarget | null): void {
    const input = target as HTMLInputElement;
    const selectedId = +(input.value);
    console.log("El id selecccionado es ", input.value)
    this.selectedPista = this.courtsCloseToUser.find(pista => pista.id === selectedId);
    console.log("He seleccionado la pista: ", this.selectedPista);
  }

  crearMatch(): void {
    if (this.partidoForm.valid && this.selectedPista) {

      const nuevoMatch: Match = {
        fecha: this.partidoForm.value.fecha,
        hora: this.partidoForm.value.hora,
        pista: this.selectedPista,
        creador: this.user.id,
        jugadores: [this.user]
      };

      console.log(nuevoMatch);


      this.matchService.createMatch(nuevoMatch).subscribe({
        next: (response: any) => {
          console.log('Partido creado correctamente:', response);
          this.router.navigate(['/matches']);
        },
        error: (error: any) => {
          console.error('Error al crear el partido:', error);
        }
      });

      this.partidoForm.reset();
    } else {
      console.log('Formulario no válido');
    }
  }
}
