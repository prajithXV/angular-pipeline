import { TestBed, inject } from '@angular/core/testing';

import { GlobalStateService } from './global-state.service';
import {DataService} from "./data.service";
import {BackendCommsService} from "./backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "./user-feedback.service";
import {ToastOptions, ToastsManager} from "ng2-toastr";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "./cisco-comms.service";
import {RouterTestingModule} from "@angular/router/testing";
import {BooleanToStringPipe} from "../pipes/boolean-to-string.pipe";
import {BooleanToStringOrderPipe, BooleanToStringDuePipe} from "../pipes/boolean-to-string-order.pipe";
import {ConsentPipeCorrectConversion} from "../pipes/consent.pipe";
import {TelephonePipe} from "../pipes/telephone.pipe";

describe('GlobalStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      providers: [ GlobalStateService, DataService, BackendCommsService, UserFeedbackService, ToastsManager, ToastOptions, DatePipe, CiscoCommsService,
                   BooleanToStringPipe, BooleanToStringOrderPipe, ConsentPipeCorrectConversion, BooleanToStringDuePipe, TelephonePipe ]
    });
  });

  it('should be created', inject([GlobalStateService], (service: GlobalStateService) => {
    expect(service).toBeTruthy();
  }));
});
