import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Court } from '../../_models/Court';
import { FormsModule } from '@angular/forms';
import { CourtsearchService } from '../../_services/courtsearch.service';

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

  constructor(public authService: AuthService, private courtSearchService: CourtsearchService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getUserName().subscribe(name => {
      this.username = name;
    });
  }

  search(event: Event) {
    this.router.navigate(['/search-results'], { queryParams: { query: this.searchQuery}});
  }

  logout() {
    this.username = null; // Limpiar el nombre de usuario al cerrar sesión
    this.authService.logout(); 
  }

  redirectToDashboard() {
    // Verificamos si no estamos en el login ni el register
    const currentRoute = this.router.url;

    if (!currentRoute.includes('login') && !currentRoute.includes('register')) {
      this.router.navigate(['/dashboard']);  // Redirige a dashboard
    }
  }

}
