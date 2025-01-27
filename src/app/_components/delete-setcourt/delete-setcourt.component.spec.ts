import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSetCourtComponent } from './delete-setcourt.component';

describe('DeleteSetcourtComponent', () => {
  let component: DeleteSetCourtComponent;
  let fixture: ComponentFixture<DeleteSetCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSetCourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSetCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
