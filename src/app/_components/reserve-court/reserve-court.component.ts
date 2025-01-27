import { Component, OnInit } from '@angular/core';
import { Court } from '../../_models/Court';
import { AuthService } from '../../core/services/auth/auth.service';
import { Reserve } from '../../_models/Reserve';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReserveService } from '../../_services/reserve.service';
import { SetCourt } from '../../_models/SetCourts';
import { SetCourtService } from '../../_services/setcourt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reserve-court',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserve-court.component.html',
  styleUrl: './reserve-court.component.scss'
})
export class ReserveCourtComponent implements OnInit {
  ciudadUsuario: string = '';
  selectedSetPista: SetCourt | null = null;
  selectedPista: Court | null = null;
  pistasFiltradas: Court[] = [];
  reservaFecha: string = '';
  reservaHora: string = '';
  reservaDuracion: number = 0;
  precioTotal: number = 0;
  username: string | null = '';
  userId: number = 0;
  id: string | null = null;

  constructor(private reserveService: ReserveService, private router: Router, private route: ActivatedRoute, 
    private authService: AuthService, private setCourtService: SetCourtService) {}

  ngOnInit(): void {
    this.username = this.authService.getUser();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.username) {
      this.authService.getUserProfile(this.username).subscribe({
        next: (response) => {
          this.userId = response.id
          this.ciudadUsuario = response.city
                                                                                                      
          console.log("La id y la ciudad del usuario en el reserve normal son ", this.userId, this.ciudadUsuario);
        },
        error: (err) => {
          console.error('Failed to load user profile', err);
        }
      });
    }
    if (this.id) {
      this.obtenerPistas();
    }
  }

  obtenerPistas(): void {
    console.log("Entro a la función de obtener pistas");
    this.setCourtService.getMisConjuntosdePistasPorId(this.id).subscribe({
      next: (data: SetCourt) => {
        this.selectedSetPista = data;
      },
      error: (error) => {
        console.error('Error al obtener las pistas:', error);
      }
    });
  }

  seleccionarConjuntoPista(pista: SetCourt): void {
    this.selectedSetPista = pista;
    console.log("He seleccionado el conjunto de pista: ", this.selectedSetPista);
  }

  seleccionarPista(pista: Court): void {
    this.selectedPista = pista;
    console.log("He seleccionado la pista: ", this.selectedPista);
    this.reservarPista();
  }

  calcularPrecioTotal(): number {
    if (!this.selectedSetPista) return 0;
  
    const precioBase = this.selectedSetPista.precioDeReserva || 0;
    const precioConLuz = this.selectedSetPista.precioPorHoraConLuz || 0;
    const precioFinDeSemana = this.selectedSetPista.precioPorHoraFinDeSemana || 0;
    const horaEncendidoLuces = this.selectedSetPista.horaActivacionLuz || '18:00';
  
    // Usar valores predeterminados si no hay hora o duración
    const horadeInicioReserva = this.convertirHoraANumero(this.reservaHora);
  
    const duracion = this.reservaDuracion || 1;
  
    const horaEncendido = this.convertirHoraANumero(horaEncendidoLuces);

    const esFinDeSemana = this.reservaFecha
    ? this.comprobarSiEsFinDeSemana(this.reservaFecha)
    : false;

    let total = 0;

    for (let i = 0; i < duracion; i++) {
      const horaActual = horadeInicioReserva + i;
      let precioHora = parseFloat(precioBase.toFixed(2));
  
      // Agregar precio adicional por luz si aplica
      if (horaActual >= horaEncendido) {
        precioHora += precioConLuz; // Sumar al precio base
      }
  
      // Agregar precio adicional por fin de semana si aplica
      if (esFinDeSemana) {
        precioHora += precioFinDeSemana;
      }
  
      total += precioHora; // Sumar el precio total por hora
    }

    this.precioTotal = total;
    return total;
  }


  comprobarSiEsFinDeSemana(fecha: string): boolean {
    const dia = new Date(fecha).getDay();
    return dia === 0 || dia === 6;
  }

  formatearHora(hora: number): string {
    if (isNaN(hora)) {
      return 'Hora no válida';
    }
  
    const horas = Math.floor(hora);
    const minutos = Math.round((hora - horas) * 60);
    return `${horas}:${minutos.toString().padStart(2, '0')}`;
  }
    

  convertirHoraANumero(hora: string | [number, number] | number): number {
    if (Array.isArray(hora) && hora.length === 2) {
      console.log("Recibo un array");
      const horas = hora[0];
      const minutos = hora[1];
      return horas + minutos / 60;  // Convertimos minutos a horas
    }
  
    // Si la hora es un string en formato 'hh:mm', lo convertimos a número
    if (typeof hora === 'string') {
      const partes = hora.split(':');
      if (partes.length !== 2) {
        console.error('El formato de hora no es válido:', hora);
        return 0;
      }
  
      const horas = parseInt(partes[0], 10);
      const minutos = parseInt(partes[1], 10);
      return horas + minutos / 60;  // Convertimos minutos a horas
    }
  
    // Si la hora es un número ya en formato de horas decimales, lo retornamos tal cual
    if (typeof hora === 'number') {
      return hora;
    }
  
    // Si la entrada no es válida, devolvemos 0
    console.error('El formato de hora no es válido');
    return 0;
  }


  reservarPista(): void {
    if (this.selectedPista && this.reservaFecha && this.reservaHora && this.reservaDuracion) {
      console.log(this.selectedPista.id, this.reservaFecha, this.reservaHora, typeof this.reservaHora);

      const reservaFechaHora = `${this.reservaFecha}T${this.reservaHora}:00`;

      console.log(reservaFechaHora)

      const nuevaReserva: Reserve = {
        id: 0,
        courtId: this.selectedPista.id,
        userId: this.userId,
        date: reservaFechaHora,
        duration: this.reservaDuracion,
        status: 'pendiente',
        precio: this.precioTotal
      };

      this.reserveService.reservarPista(nuevaReserva).subscribe({
        next: () => {
          alert('Reserva realizada con éxito');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al reservar la pista', err);
          alert('No se pudo realizar la reserva. Intenta de nuevo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos');
    }
  }

  resetForm(): void {
    this.selectedSetPista = null;
    this.selectedPista = null;
    this.reservaFecha = '';
    this.reservaHora = '';
    this.reservaDuracion = 0;
  }

  actualizarPistas() {
    if (this.reservaFecha && this.reservaHora) {
      console.log("Reservaré a las ", this.reservaHora, "en ", this.selectedSetPista?.pistasDentroDelConjunto, "a fecha ", this.reservaFecha);
      if (this.selectedSetPista) {
        console.log("Vuelvo a la función de actualizar pistas");
        this.pistasFiltradas = this.selectedSetPista.pistasDentroDelConjunto.filter(
          (pista) => {
            const horaString = this.convertirHoraANumero(this.reservaHora);

            console.log('Estructura completa de pista:', pista);

            console.log('horadeInicio:', pista.horadeInicio, 'horadeFin:', pista.horadeFin);

            return horaString >= this.convertirHoraANumero(pista.horadeInicio) && horaString < this.convertirHoraANumero(pista.horadeFin);
          }
        );
      } else {
        this.pistasFiltradas = [];
      }
      this.calcularPrecioTotal();
    } else {
      this.pistasFiltradas = [];
    }
  }
}
