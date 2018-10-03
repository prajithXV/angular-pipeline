import { TestBed, inject } from '@angular/core/testing';

import { MockBackendCommsService } from './mock-backend-comms.service';
import {HttpModule} from "@angular/http";

describe('MockBackendCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ MockBackendCommsService ]
    });
  });

  it('should be created', inject([MockBackendCommsService], (service: MockBackendCommsService) => {
    expect(service).toBeTruthy();
  }));
});
