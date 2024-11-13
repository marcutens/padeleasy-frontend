import { TestBed } from '@angular/core/testing';

import { SetcourtService } from './setcourt.service';

describe('SetcourtService', () => {
  let service: SetcourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetcourtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
