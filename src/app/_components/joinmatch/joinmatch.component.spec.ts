import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinmatchComponent } from './joinmatch.component';

describe('JoinmatchComponent', () => {
  let component: JoinmatchComponent;
  let fixture: ComponentFixture<JoinmatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinmatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
