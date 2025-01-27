import { TestBed } from '@angular/core/testing';

import { SetCourtService } from './setcourt.service';

describe('SetcourtService', () => {
  let service: SetCourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetCourtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
