import { TestBed, inject } from '@angular/core/testing';

import { CiscoCommsService } from './cisco-comms.service';
import {HttpModule} from "@angular/http";

describe('CiscoCommsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [CiscoCommsService]
    });
  });

  it('should be created', inject([CiscoCommsService], (service: CiscoCommsService) => {
    expect(service).toBeTruthy();
  }));
});
