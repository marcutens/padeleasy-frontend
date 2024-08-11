import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log('User:', this.user);
    console.log('Password:', this.password);
  
    if (this.user.trim() === '' || this.password.trim() === '') {
      console.error('Por favor, ingrese el nombre de usuario y la contraseña.');
      return;
    }
  
    this.authService.login(this.user, this.password).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => console.error('Login failed', err)
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
