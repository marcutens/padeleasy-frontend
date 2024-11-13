import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtService } from '../../_services/court.service';
import { SetCourt } from '../../_models/SetCourts';
import { Court } from '../../_models/Court';

@Component({
  selector: 'app-add-court',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-court.component.html',
  styleUrls: ['./add-court.component.scss']
})
export class AddCourtComponent implements OnInit {
  conjunto_pista: SetCourt = { id: 0, nombre: '', ciudad: '', direccion: '', img: '', pistasDentroDelConjunto: []}; // Asegúrate de ajustar según el modelo
  numberCourts: number = 0;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isEditing: boolean = false;
  pistaId: string | null = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private courtService: CourtService) {}

  ngOnInit() {
    this.pistaId = this.route.snapshot.paramMap.get('id');
    if (this.pistaId) {
      // Modo edición
      console.log("Modo edicion");
      this.isEditing = true;
      this.loadPista(this.pistaId);
    }
  }

  updatePistasDentroDelConjunto() {
    this.conjunto_pista.pistasDentroDelConjunto = Array(this.numberCourts).fill({});  // Rellenamos el array con objetos vacíos
  }

  addPista(): void {
    const formData = new FormData();

    // Añadiendo propiedades de SetCourt
    formData.append('nombre', this.conjunto_pista.nombre);
    formData.append('ciudad', this.conjunto_pista.ciudad);
    formData.append('direccion', this.conjunto_pista.direccion);
    formData.append('numberCourts', this.numberCourts.toString());

    console.log("Le he enviado ", this.numberCourts, " pistas.");

    const userId = this.authService.getUserIdFromToken();

    formData.append('userId', userId + "");

    if (this.selectedFile) {
      formData.append('img', this.selectedFile, this.selectedFile.name);
    }


    this.courtService.addPista(formData).subscribe({
      next: (response) => {
        console.log('Pista añadida con éxito:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al añadir la pista:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  loadPista(pistaId: string) {
    this.courtService.getPista(pistaId).subscribe({
      next: (response: Court) => {
        this.conjunto_pista = response.setCourt;
      },
      error: (error) => {
        console.error('Error al cargar la pista:', error);
      }
    });
  }
}
