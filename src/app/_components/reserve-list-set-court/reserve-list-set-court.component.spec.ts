import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveListSetCourtComponent } from './reserve-list-set-court.component';

describe('ReserveListSetCourtComponent', () => {
  let component: ReserveListSetCourtComponent;
  let fixture: ComponentFixture<ReserveListSetCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveListSetCourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveListSetCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
