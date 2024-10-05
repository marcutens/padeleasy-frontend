import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./_components/toolbar/toolbar.component";
import { DashboardComponent } from './_components/dashboard/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('dashboard') dashboard!: DashboardComponent;

  handleSearchResults(event: Event, results: any[]): void {
    event.preventDefault();

    // Aquí puedes hacer lo que necesites con los resultados
    console.log('Resultados de la búsqueda:', results);
    this.dashboard.handleSearchResults(results);
  }
  
}
