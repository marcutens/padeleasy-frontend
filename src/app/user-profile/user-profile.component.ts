import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.authService.getUserProfile(username).subscribe({
        next: (response) => {
          console.log("Respuesta de busqueda de usuario: ", response);
          this.user = response;
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      });
    }
  }
}
