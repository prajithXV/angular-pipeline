import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import {BackendCommsService} from "./backend-comms.service";
import {UserFeedbackService} from "./user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "./cisco-comms.service";
import {BooleanToStringPipe} from "../pipes/boolean-to-string.pipe";
import {BooleanToStringOrderPipe, BooleanToStringDuePipe} from "../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../pipes/consent.pipe";
import {TelephonePipe} from "../pipes/telephone.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      providers: [ DataService, BackendCommsService, UserFeedbackService, DatePipe, CiscoCommsService,
                   BooleanToStringPipe, BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe, TelephonePipe ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
