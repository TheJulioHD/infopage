import { TestBed } from '@angular/core/testing';

import FribaseService from './fribase.service';

describe('FribaseService', () => {
  let service: FribaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FribaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
