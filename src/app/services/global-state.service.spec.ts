import { TestBed, inject } from '@angular/core/testing';

import { GlobalStateService } from './global-state.service';
import {DataService} from "./data.service";
import {BackendCommsService} from "./backend-comms.service";
import {UserFeedbackService} from "./user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "./cisco-comms.service";
import {RouterTestingModule} from "@angular/router/testing";
import {BooleanToStringPipe} from "../pipes/boolean-to-string.pipe";
import {BooleanToStringOrderPipe, BooleanToStringDuePipe} from "../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../pipes/consent.pipe";
import {TelephonePipe} from "../pipes/telephone.pipe";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('GlobalStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot() ],
      providers: [ GlobalStateService, DataService, BackendCommsService, UserFeedbackService, DatePipe, CiscoCommsService,
                   BooleanToStringPipe, BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe, TelephonePipe ]
    });
  });

  it('should be created', inject([GlobalStateService], (service: GlobalStateService) => {
    expect(service).toBeTruthy();
  }));
});
