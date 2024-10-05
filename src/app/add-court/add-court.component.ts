import { Component, OnInit } from '@angular/core';
import { Court } from '../_models/Court';
import { AuthService } from '../core/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-court',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-court.component.html',
  styleUrl: './add-court.component.scss'
})
export class AddCourtComponent{
  nuevaPista: Court = {
    id: 0,
    nombre: '',
    ciudad: '',
    lat: 0,
    lng: 0,
    img: ''
  };
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private authService: AuthService,  private router: Router) {}

  addPista(): void {

    enum CourtFields {
      Nombre = 'nombre',
      Ciudad = 'ciudad',
      Lat = 'lat',
      Lng = 'lng'
    }
  
    const formData = new FormData();
    
    Object.values(CourtFields).forEach(field => {
        formData.append(field, this.nuevaPista[field as keyof Court].toString());
    });
    

    if (this.selectedFile) {
        formData.append('img', this.selectedFile, this.selectedFile.name);
    }
    
    this.authService.addPista(formData).subscribe({
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

  // onUpload(): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('image', this.selectedFile, this.selectedFile.name);
 
  //     // Hacer la solicitud POST para cargar el archivo
  //     this.http.post('TU_URL_DE_SERVIDOR', formData).subscribe(response => {
  //       console.log('Imagen subida correctamente', response);
  //     });
  //   }
  // }
}
