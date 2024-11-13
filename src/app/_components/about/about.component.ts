import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const images = document.querySelectorAll('.about-image');
    images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const imgElement = image as HTMLElement;
      if (rect.top < window.innerHeight) {
        imgElement.style.opacity = '1'; // Hacer visible la imagen
      } else {
        imgElement.style.opacity = '0'; // Opcional: ocultar la imagen si está fuera de vista
      }
    });
  }


}
