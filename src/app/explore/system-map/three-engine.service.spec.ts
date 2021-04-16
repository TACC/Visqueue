import { TestBed } from '@angular/core/testing';

import { ThreeEngineService } from './three-engine.service';

describe('ThreeEngineService', () => {
  let service: ThreeEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreeEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
