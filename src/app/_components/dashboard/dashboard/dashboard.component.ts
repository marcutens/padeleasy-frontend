import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Role } from '../../../_models/Role';
import { CourtComponent } from "../../court/court.component";
import { Router, RouterLink } from '@angular/router';
import { Court } from '../../../_models/Court';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { CourtsearchService } from '../../../_services/courtsearch.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, CourtComponent, ToolbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  roles: Role[] = [];
  showUserInfo = false;
  showCourtAdminInfo = false;
  showAdminInfo = false;
  searchResults: Court[] = [];
  showSearchResults: boolean = false;

  constructor(private authService: AuthService, private router: Router, private courtSearchService: CourtsearchService) { }

  ngOnInit(): void {
    this.userName = this.authService.getUser();
    this.roles = this.authService.getUserRoles();
    
    this.showUserInfo = this.roles.some(role => role.name === 'ROLE_USER');

    this.showCourtAdminInfo = this.roles.some(role => role.name === 'ROLE_COURT_ADMIN');

    this.showAdminInfo = this.roles.some(role => role.name === 'ROLE_ADMIN');

    this.courtSearchService.searchResults$.subscribe((results) => {
      this.searchResults = results;
      this.showSearchResults = results.length > 0;
    });

  }


  goToAddCourt(): void {
    this.router.navigate(['/add-court']);
  }

  goToDeleteCourt(): void {
    this.router.navigate(['/delete-court']);
  }

  goToListCourts(): void {
    this.router.navigate(['/list-courts']);
  }

  goToListSetCourts(): void {
    this.router.navigate(['/list-setcourts']);
  }

  goToDeleteSetCourt(): void {
    this.router.navigate(['/delete-setcourt']);
  }

  onSearchResults(courts: Court[]) {
      this.searchResults = courts;
      this.showSearchResults = courts.length > 0;
  }

  showOriginalCourts() {
      this.showSearchResults = false;
      this.searchResults = [];
  }

  handleSearchResults(results: any[]) {
    this.searchResults = results;
    this.showSearchResults = results.length > 0;
  }

}
