import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchResultComponent } from './global-search-result.component';

describe('GlobalSearchResultComponent', () => {
  let component: GlobalSearchResultComponent;
  let fixture: ComponentFixture<GlobalSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSearchResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
