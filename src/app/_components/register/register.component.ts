import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRegisterObject } from '../../_models/UserRegisterObject';
import { Role } from '../../_models/Role';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  user: UserRegisterObject = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    roles: [],
    padelLevel: 0
  };
  roles: Role[] = [];
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (err) => {
        console.error('Failed to load roles', err);
      }
    });
  }

  onRoleChange(role: Role, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    
    if (isChecked) {
      this.user.roles.push(role.id);
    } else {
      this.user.roles = this.user.roles.filter(id => id !== role.id)
    }
  }

  register(): void {
    const userToRegister: UserRegisterObject = { 
      ...this.user, 
      roles: Array.from(this.user.roles) 
    };

    this.authService.register(userToRegister).subscribe({
      next: (response: string) => {
        // Manejo del mensaje de éxito
        if (response === 'User registered successfully') {
          this.message = 'Registration successful! Redirecting to login page...';
          // Redirige al usuario a la página de inicio de sesión
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); // Tiempo de espera de 2 segundos para mostrar el mensaje de éxito
        } else {
          this.message = response; // Muestra el mensaje de error si lo hubiera
        }
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.message = 'An error occurred. Please try again.';
      }
    });
  }
}
