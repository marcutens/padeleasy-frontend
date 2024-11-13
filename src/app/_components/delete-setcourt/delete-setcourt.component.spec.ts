import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSetcourtComponent } from './delete-setcourt.component';

describe('DeleteSetcourtComponent', () => {
  let component: DeleteSetcourtComponent;
  let fixture: ComponentFixture<DeleteSetcourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSetcourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSetcourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
