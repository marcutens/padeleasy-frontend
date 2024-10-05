import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { Court } from '../../_models/Court';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit{
  url_app = "localhost:4200"
  username: string | null = null;
  searchQuery: string = '';
  courts: any[] = [];
  @Output() searchResultsEmitter = new EventEmitter<{ event: Event, results: any[] }>();

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserName().subscribe(name => {
      this.username = name;
    });
  }

  search(event: Event) {
    console.log("Llego al search del toolbar: ", this.searchQuery);
    this.authService.searchCourts(this.searchQuery).subscribe({
      next: (data: any[]) => {
        this.courts = data;
        console.log("Estas son las pistas de la búsqueda ", this.courts);
        this.searchResultsEmitter.emit({ event, results: this.courts});
      },
      error: (err) => {
        console.error('Error en la búsqueda', err);
      }
    })
  }

  logout() {
    this.username = null; // Limpiar el nombre de usuario al cerrar sesión
    this.authService.logout(); 
  }
}
