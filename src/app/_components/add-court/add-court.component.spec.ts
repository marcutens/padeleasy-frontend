import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddCourtComponent } from './add-court.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { CourtService } from '../../_services/court.service';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AddCourtComponent', () => {
  let component: AddCourtComponent;
  let fixture: ComponentFixture<AddCourtComponent>;
  let mockAuthService: any;
  let mockCourtService: any;

  beforeEach(async () => {
    mockAuthService = {
      getUserIdFromToken: jasmine.createSpy('getUserIdFromToken').and.returnValue(1)
    };

    mockCourtService = {
      addPista: jasmine.createSpy('addPista').and.returnValue(of({})),
      getPista: jasmine.createSpy('getPista').and.returnValue(of({ setCourt: {} }))
    };

    await TestBed.configureTestingModule({
      declarations: [AddCourtComponent],
      imports: [FormsModule],
      providers: [
        provideRouter([]), // Configuración de rutas vacías o las que uses
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: CourtService, useValue: mockCourtService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in editing mode if pistaId exists', () => {
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue('1'); // Mock parameter
    component.ngOnInit();
    expect(component.isEditing).toBeTrue();
    expect(mockCourtService.getPista).toHaveBeenCalledWith('1');
  });

  it('should initialize in non-editing mode if pistaId does not exist', () => {
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue(null); // No ID in route
    component.ngOnInit();
    expect(component.isEditing).toBeFalse();
  });

  it('should call addPista with the correct form data', () => {
    // Simular valores del formulario
    component.conjunto_pista = {
      id: 0,
      nombre: 'Court Name',
      ciudad: 'City',
      direccion: 'Address',
      img: '',
      pistasDentroDelConjunto: [],
      precioDeReserva: 100,
      precioPorHoraConLuz: 20,
      precioPorHoraSinLuz: 15,
      precioPorHoraFinDeSemana: 25,
      horaActivacionLuz: '18:00'
    };
    component.numberCourts = 3;
    component.horadeInicio = 8;
    component.horadeFin = 22;

    // Llamar al método
    component.addPista();

    // Verificar que addPista fue llamado con los datos correctos
    expect(mockCourtService.addPista).toHaveBeenCalled();
  });

  it('should handle file selection and preview correctly', () => {
    const mockFile = new File([''], 'test-image.png', { type: 'image/png' });
    const mockEvent = {
      target: {
        files: [mockFile]
      }
    } as unknown as Event;

    component.onFileSelected(mockEvent);

    expect(component.selectedFile).toEqual(mockFile);
    const reader = new FileReader();
    reader.onload = () => {
      expect(component.previewUrl).toBeTruthy();
    };
  });

  it('should handle loadPista correctly', () => {
    component.loadPista('1');
    expect(mockCourtService.getPista).toHaveBeenCalledWith('1');
  });

  it('should log an error if loadPista fails', () => {
    spyOn(console, 'error');
    mockCourtService.getPista.and.returnValue(throwError(() => new Error('Error loading court')));
    component.loadPista('1');
    expect(console.error).toHaveBeenCalledWith('Error al cargar la pista:', jasmine.any(Error));
  });

  it('should update pistasDentroDelConjunto correctly', () => {
    component.numberCourts = 5;
    component.updatePistasDentroDelConjunto();
    expect(component.conjunto_pista.pistasDentroDelConjunto.length).toBe(5);
  });
});