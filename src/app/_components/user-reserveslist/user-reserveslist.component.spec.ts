import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReserveslistComponent } from './user-reserveslist.component';

describe('UserReserveslistComponent', () => {
  let component: UserReserveslistComponent;
  let fixture: ComponentFixture<UserReserveslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserReserveslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReserveslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
