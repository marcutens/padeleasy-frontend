import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reserve } from '../../_models/Reserve';
import { ReserveService } from '../../_services/reserve.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  userId: number = 0; 
  userReserves: Reserve[] = [];
  selectedReserveId: number = -1;
  isModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  reserveToDelete: number = -1;

  constructor(
    private authService: AuthService,
    private reserveService: ReserveService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.authService.getUserProfile(username).subscribe({
        next: (response) => {
          console.log("Respuesta de busqueda de usuario en el perfil: ", response);
          this.user = response;
          this.userId = response.id;
          console.log("Guardo el id en el userId que es: ", this.userId);
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      }); 
    }
  }

}
