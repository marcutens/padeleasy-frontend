import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetcourtComponent } from './setcourt.component';

describe('SetcourtComponent', () => {
  let component: SetcourtComponent;
  let fixture: ComponentFixture<SetcourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetcourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetcourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
