import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatcheslistComponent } from './user-matcheslist.component';

describe('UserMatcheslistComponent', () => {
  let component: UserMatcheslistComponent;
  let fixture: ComponentFixture<UserMatcheslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMatcheslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMatcheslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
