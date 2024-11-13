import { TestBed } from '@angular/core/testing';

import { CourtsearchService } from './courtsearch.service';

describe('CourtsearchService', () => {
  let service: CourtsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
