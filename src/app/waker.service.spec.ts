import { TestBed, inject } from '@angular/core/testing';

import { WakerService } from './waker.service';

describe('WakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WakerService]
    });
  });

  it('should be created', inject([WakerService], (service: WakerService) => {
    expect(service).toBeTruthy();
  }));
});
