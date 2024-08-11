import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Role } from '../../../_models/Role';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  roles: Role[] = [];
  showUserInfo = false;
  showCourtAdminInfo = false;
  showAdminInfo = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUser();
    this.roles = this.authService.getUserRoles();

    console.log("Estos son los roles del usuario: ", this.roles);
    
    this.showUserInfo = this.roles.some(role => role.name === 'ROLE_USER');
    console.log("Info del usuario", this.showUserInfo);

    this.showCourtAdminInfo = this.roles.some(role => role.name === 'ROLE_COURT_ADMIN');
    console.log("Info del admin. de pistas", this.showCourtAdminInfo);

    this.showAdminInfo = this.roles.some(role => role.name === 'ROLE_ADMIN');
    console.log("Info del admin", this.showAdminInfo);


  }

}
