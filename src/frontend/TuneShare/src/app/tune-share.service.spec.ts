import { TestBed } from '@angular/core/testing';

import { TuneShareService } from './tune-share.service';

describe('TuneShareService', () => {
  let service: TuneShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuneShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
