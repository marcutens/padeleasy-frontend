import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourtComponent } from './delete-court.component';

describe('DeleteCourtComponent', () => {
  let component: DeleteCourtComponent;
  let fixture: ComponentFixture<DeleteCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
