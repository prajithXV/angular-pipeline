import { TestBed, inject } from '@angular/core/testing';

import { CiscoCommsService } from './cisco-comms.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CiscoCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [CiscoCommsService]
    });
  });

  it('should be created', inject([CiscoCommsService], (service: CiscoCommsService) => {
    expect(service).toBeTruthy();
  }));
});
