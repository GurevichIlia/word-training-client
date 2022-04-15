import { TestBed } from '@angular/core/testing';

import { ConjugationsApiService } from './conjugations-api.service';

describe('ConjugationsApiService', () => {
  let service: ConjugationsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConjugationsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
