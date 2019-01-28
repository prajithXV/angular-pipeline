import { TestBed, inject } from '@angular/core/testing';

import { MockCiscoCommsService } from './mock-cisco-comms.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MockCiscoCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [ MockCiscoCommsService ]
    });
  });

  it('should be created', inject([MockCiscoCommsService], (service: MockCiscoCommsService) => {
    expect(service).toBeTruthy();
  }));
});
