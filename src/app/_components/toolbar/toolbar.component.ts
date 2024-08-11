import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit{
  url_app = "localhost:4200"
  username: string | null = null;

  constructor(public authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.getUserName().subscribe(name => {
      this.username = name;
    });
  }
  search() {
    //console.log(this.searchTerm)
  }

  logout() {
    this.username = null; // Limpiar el nombre de usuario al cerrar sesión
    this.authService.logout(); 
  }
}
