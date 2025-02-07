import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../_models/User';
import { Role } from '../../_models/Role';
import { RoleService } from '../../_services/role.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  user: User = {
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
  registerForm: FormGroup;
  roles: Role[] = [];
  message: string = '';

  constructor(private authService: AuthService, private roleService: RoleService, 
    private router: Router, private fb: FormBuilder) {

      this.registerForm = this.fb.group({
        password: ['', [
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
        ]]
      });
      
  }
  
  ngOnInit(): void {
    this.roleService.getRoles().subscribe({
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

  get password() {
    return this.registerForm.get('password');
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.message = 'Por favor, rellena los campos correctamente.';
      return;
    }

    const userToRegister: User = { 
      ...this.user, 
      roles: Array.from(this.user.roles) 
    };

    this.authService.register(userToRegister).subscribe({
      next: (response: string) => {
        // Manejo del mensaje de éxito
        if (response === 'User registered successfully') {
          this.message = 'Registration successful! Redirecting to login page...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.message = response;
        }
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.message = 'An error occurred. Please try again.';
      }
    });
  }
}
