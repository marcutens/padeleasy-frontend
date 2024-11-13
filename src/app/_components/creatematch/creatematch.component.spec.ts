import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatematchComponent } from './creatematch.component';

describe('CreatematchComponent', () => {
  let component: CreatematchComponent;
  let fixture: ComponentFixture<CreatematchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatematchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatematchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
