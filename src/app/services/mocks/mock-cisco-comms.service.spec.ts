import { TestBed, inject } from '@angular/core/testing';

import { MockCiscoCommsService } from './mock-cisco-comms.service';
import {HttpModule} from "@angular/http";

describe('MockCiscoCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ MockCiscoCommsService ]
    });
  });

  it('should be created', inject([MockCiscoCommsService], (service: MockCiscoCommsService) => {
    expect(service).toBeTruthy();
  }));
});
