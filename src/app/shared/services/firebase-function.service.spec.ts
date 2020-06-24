import { TestBed } from '@angular/core/testing';

import { FirebaseFunctionService } from './firebase-function.service';

describe('FirebaseFunctionService', () => {
  let service: FirebaseFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
